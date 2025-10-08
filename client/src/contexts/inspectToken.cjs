#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function findToken(text) {
	// match three base64/base64url segments separated by dots
	// allow A-Z a-z 0-9 _ - + /
	const m = text.match(/([A-Za-z0-9_+\-\/]+)\.([A-Za-z0-9_+\-\/]+)\.([A-Za-z0-9_+\-\/]+)/);
	return m ? m[0] : null;
}

function base64urlDecode(str) {
	let s = str.replace(/-/g, '+').replace(/_/g, '/');
	while (s.length % 4) s += '=';
	return Buffer.from(s, 'base64').toString('utf8');
}

function base64urlToBuffer(str) {
	let s = str.replace(/-/g, '+').replace(/_/g, '/');
	while (s.length % 4) s += '=';
	return Buffer.from(s, 'base64');
}

function loadEnvSecret() {
	// prefer process.env
	if (process.env.JWT_SECRET) return { secret: process.env.JWT_SECRET, envPath: null };

	// search upward from cwd and script dir for a .env file
	const startDirs = [process.cwd(), __dirname];
	const seen = new Set();

	function findUp(name, from) {
		let dir = path.resolve(from);
		while (dir && !seen.has(dir)) {
			seen.add(dir);
			const candidate = path.join(dir, name);
			if (fs.existsSync(candidate)) return candidate;
			const parent = path.dirname(dir);
			if (parent === dir) break;
			dir = parent;
		}
		return null;
	}

	let envPath = null;
	for (const d of startDirs) {
		envPath = findUp('.env', d);
		if (envPath) break;
	}

	if (!envPath) return { secret: null, envPath: null };

	try {
		const content = fs.readFileSync(envPath, 'utf8');
		const m = content.match(/^JWT_SECRET=(.+)$/m);
		if (m) return { secret: m[1].trim(), envPath };
	} catch (e) {
		// ignore
	}
	return { secret: null, envPath };
}

function verifyHS(tokenParts, alg, secret) {
	const [h64, p64, sig64] = tokenParts;
	const signingInput = `${h64}.${p64}`;
	let sig;
	try {
		sig = base64urlToBuffer(sig64);
	} catch (e) {
		return { ok: false, reason: 'Failed to decode signature' };
	}
	let hashAlg = null;
	if (alg === 'HS256') hashAlg = 'sha256';
	else if (alg === 'HS384') hashAlg = 'sha384';
	else if (alg === 'HS512') hashAlg = 'sha512';
	if (!hashAlg) return { ok: false, reason: `Unsupported HMAC alg: ${alg}` };
	const h = crypto.createHmac(hashAlg, secret).update(signingInput).digest();
	// Ensure lengths match to avoid timingSafeEqual throwing
	if (!Buffer.isBuffer(sig) || sig.length !== h.length) {
		return { ok: false, reason: 'Signature length mismatch' };
	}
	const match = crypto.timingSafeEqual(h, sig);
	return { ok: match };
}

(function main() {
	const raw = (process.argv.slice(2).join(' ') || '').trim();
	const scriptRel = path.relative(process.cwd(), __filename) || __filename;
	if (!raw) {
		console.error(`Usage: node ${scriptRel} "<token or text containing token>"`);
		process.exit(1);
	}
	const token = findToken(raw);
	if (!token) {
		console.error('No JWT-like token found in input.');
		process.exit(2);
	}
	console.log('Found token:', token);
	const parts = token.split('.');
	if (parts.length !== 3) {
		console.error('Token does not have 3 parts.');
		process.exit(3);
	}
	const [h64, p64] = parts;
	let header, payload;
	try {
		header = JSON.parse(base64urlDecode(h64));
		payload = JSON.parse(base64urlDecode(p64));
	} catch (e) {
		console.error('Failed to decode header/payload:', e.message);
		process.exit(4);
	}
	console.log('\nHeader:');
	console.log(JSON.stringify(header, null, 2));
	console.log('\nPayload:');
	console.log(JSON.stringify(payload, null, 2));

	const alg = header.alg || 'unknown';
	const { secret, envPath } = loadEnvSecret();
	if (!secret) {
		console.warn('\nNo JWT_SECRET found in process.env or a nearby .env — skipping signature verification.');
		console.warn('If you want verification, set JWT_SECRET in env or add JWT_SECRET=... to a .env file.');
	} else {
		if (envPath) console.log(`\nUsing JWT_SECRET from: ${envPath}`);
		console.log(`\nAttempting signature verification using alg=${alg}`);
		const res = verifyHS(parts, alg, secret);
		if (res.ok) console.log('Signature verification: OK (HMAC match)');
		else console.log('Signature verification: FAILED', res.reason ? `(${res.reason})` : '');
		if (alg.startsWith('RS')) {
			console.log('Note: RS* tokens require the public key for verification (not supported by this HMAC check).');
		}
	}
	console.log('\nSecurity note: Do not share the full token publicly — it can grant access.');
})();
