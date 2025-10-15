import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

if (!PG_URI) {
  console.error('❌ PG_URI environment variable is not set. DB connection will be skipped.');
}

// ✅ Supabase requires SSL but does NOT require custom certificate files.
//    So we just set "require: true" and "rejectUnauthorized: false"
const sequelize = PG_URI
  ? new Sequelize(PG_URI, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : null;

// ✅ Connect DB with retry logic (safe & clean)
const connectDB = async ({ retries = 5, delayMs = 1000 } = {}) => {
  if (!sequelize) return false;

  let attempt = 0;
  while (attempt < retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ PostgreSQL Connected (Supabase SSL enabled)');
      return true;
    } catch (err) {
      attempt += 1;
      console.error(`⚠️  Unable to connect to PostgreSQL (attempt ${attempt}/${retries}):`, err.message);
      if (attempt >= retries) return false;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
};

// ✅ Helper for testing connection manually
const testConnection = async () => {
  const ok = await connectDB({ retries: 1, delayMs: 200 });
  console.log(ok ? '🟢 testConnection: OK' : '🔴 testConnection: FAILED');
  return ok;
};

export { sequelize, testConnection };
export default connectDB;
