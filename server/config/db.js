import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load .env from several possible locations (cwd and script dir, searching upward)
function findEnv(startDirs = [process.cwd(), __dirname]) {
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
  for (const d of startDirs) {
    const p = findUp('.env', d);
    if (p) return p;
  }
  return null;
}

const envPath = findEnv();
if (envPath) {
  dotenv.config({ path: envPath });
  console.log(`Loaded environment from ${envPath}`);
} else {
  dotenv.config();
}

// Helper to mask sensitive parts of a URI for logging
function maskUri(uri) {
  if (!uri) return null;
  try {
    const u = new URL(uri);
    if (u.password) u.password = '****';
    return u.toString();
  } catch (e) {
    // fallback: mask between :// and @ if present
    return uri.replace(/:\/\/([^@]+)@/, '://****@');
  }
}

// If PG_URI is missing, log and allow the app to continue (connectDB will return false)
if (!process.env.PG_URI) {
  console.error('PG_URI environment variable is not set. DB connection will be skipped until PG_URI is provided.');
} else {
  console.log('PG_URI:', maskUri(process.env.PG_URI));
}

const sequelize = process.env.PG_URI
  ? new Sequelize(process.env.PG_URI, {
      dialect: 'postgres',
      logging: false,
    })
  : null;

// Add retry logic to handle transient DB startup ordering.
// IMPORTANT: This function no longer calls process.exit; it returns true/false so the caller can decide.
const connectDB = async ({ retries = 5, delayMs = 1000 } = {}) => {
  if (!sequelize) {
    console.error('Sequelize not initialized because PG_URI is missing.');
    return false;
  }

  let attempt = 0;
  while (attempt < retries) {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL Connected');
      return true;
    } catch (err) {
      attempt += 1;
      console.error(`Unable to connect to PostgreSQL (attempt ${attempt}/${retries}):`, err.message);
      if (attempt >= retries) {
        console.error('Exceeded maximum connection attempts. Not exiting; returning failure to caller.');
        return false;
      }
      // wait before retrying
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
};

// Small helper for quick manual testing from a node REPL or script
const testConnection = async () => {
  const ok = await connectDB({ retries: 1, delayMs: 200 });
  if (ok) console.log('testConnection: OK');
  else console.log('testConnection: FAILED');
  return ok;
};

// Add a diagnostic helper that runs a simple query and prints actionable suggestions
async function runDiagnostics() {
  if (!sequelize) {
    console.error('Diagnostics: PG_URI not set — update server/.env (PG_URI) or set process.env.PG_URI and retry.');
    console.error('Example PG_URI: postgres://user:pass@localhost:5432/your_database');
    return false;
  }

  try {
    console.log('Diagnostics: attempting to authenticate and run a simple query...');
    await sequelize.authenticate();
    await sequelize.query('SELECT 1 AS ok;');
    console.log('Diagnostics: OK — connected to PostgreSQL and simple query succeeded.');
    return true;
  } catch (err) {
    console.error('Diagnostics: connection failed:', err.message);

    const msg = (err && err.message) ? err.message.toLowerCase() : '';

    if (msg.includes('econrefused') || msg.includes('connect') || msg.includes('could not connect')) {
      console.error('- Suggestion: PostgreSQL is not reachable at host/port in PG_URI.');
      console.error('  * Check the host and port in server/.env PG_URI (example: localhost:5432 or localhost:5433).');
      console.error('  * Ensure Postgres is running and listening on that port (systemctl / pg_ctl / Docker).');
      console.error('  * Example check: psql -h <host> -p <port> -U <user> -d <db>');
    } else if (msg.includes('password') || msg.includes('authentication') || msg.includes('auth')) {
      console.error('- Suggestion: authentication failed. Check username/password in PG_URI.');
      console.error('  * Verify user exists and password is correct.');
      console.error('  * Example: psql "postgres://user:pass@host:port/dbname"');
    } else if (msg.includes('does not exist') || (msg.includes('database') && msg.includes('does not'))) {
      console.error('- Suggestion: target database does not exist. Create it:');
      console.error('  * createdb -h <host> -p <port> -U <user> <database>');
      console.error('  * or use psql to create: CREATE DATABASE your_database;');
    } else {
      console.error('- Suggestion: inspect the error above. Common fixes: start Postgres, fix PG_URI, ensure network access, check credentials.');
    }

    return false;
  }
}

export { sequelize, testConnection, runDiagnostics };
export default connectDB;