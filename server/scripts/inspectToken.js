#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function findToken(text) {
	// match three base64url segments separated by dots
	const m = text.match(/([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)/);
	return m ? m[0] : null;
}

function base64urlDecode(str) {
	// convert from base64url to base64
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
	// prefer process.env, otherwise try server/.env next to this script
	if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
	const envPath = path.join(__dirname, '..', '.env');
	try {
		const content = fs.readFileSync(envPath, 'utf8');
		const m = content.match(/^JWT_SECRET=(.+)$/m);
		if (m) return m[1].trim();
	} catch (e) {
		// ignore
	}
	return null;
}

function verifyHS(tokenParts, alg, secret) {
	// tokenParts: [header64, payload64, signature64]
	const [h64, p64, sig64] = tokenParts;
	const signingInput = `${h64}.${p64}`;
	const sig = base64urlToBuffer(sig64);
	let hashAlg = null;
	if (alg === 'HS256') hashAlg = 'sha256';
	else if (alg === 'HS384') hashAlg = 'sha384';
	else if (alg === 'HS512') hashAlg = 'sha512';
	if (!hashAlg) return { ok: false, reason: `Unsupported HMAC alg: ${alg}` };
	const h = crypto.createHmac(hashAlg, secret).update(signingInput).digest();
	const match = crypto.timingSafeEqual(h, sig);
	return { ok: match };
}

(async function main() {
	const raw = (process.argv.slice(2).join(' ') || '').trim();
	if (!raw) {
		console.error('Usage: node server/scripts/inspectToken.js "<token or text containing token>"');
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

	// Attempt verification if secret available and alg is HMAC
	const alg = header.alg || 'unknown';
	const secret = loadEnvSecret();
	if (!secret) {
		console.warn('\nNo JWT_SECRET found in process.env or server/.env — skipping signature verification.');
		console.warn('If you want verification, set JWT_SECRET in env or in server/.env.');
		return;
	}
	console.log(`\nAttempting signature verification using alg=${alg} and secret from server/.env or process.env`);
	const res = verifyHS(parts, alg, secret);
	if (res.ok) console.log('Signature verification: OK (HMAC match)');
	else console.log('Signature verification: FAILED', res.reason ? `(${res.reason})` : '');
	console.log('\nSecurity note: Do not share the full token publicly — it can grant access.');
})();
