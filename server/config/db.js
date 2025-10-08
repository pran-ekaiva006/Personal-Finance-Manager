import { Sequelize } from 'sequelize';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;
const PG_SSL_CERT = process.env.PG_SSL_CERT;

if (!PG_URI) {
  console.error('PG_URI environment variable is not set. DB connection will be skipped.');
}

const sequelize = PG_URI
  ? new Sequelize(PG_URI, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: PG_SSL_CERT
        ? {
            ssl: {
              require: true,
              ca: fs.readFileSync(PG_SSL_CERT).toString(),
            },
          }
        : {},
    })
  : null;

// Connect DB with retry logic
const connectDB = async ({ retries = 5, delayMs = 1000 } = {}) => {
  if (!sequelize) return false;

  let attempt = 0;
  while (attempt < retries) {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL Connected with SSL');
      return true;
    } catch (err) {
      attempt += 1;
      console.error(`Unable to connect to PostgreSQL (attempt ${attempt}/${retries}):`, err.message);
      if (attempt >= retries) return false;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
};

// Optional helpers
const testConnection = async () => {
  const ok = await connectDB({ retries: 1, delayMs: 200 });
  console.log(ok ? 'testConnection: OK' : 'testConnection: FAILED');
  return ok;
};

export { sequelize, testConnection };
export default connectDB;
