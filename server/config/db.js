import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

if (!PG_URI) {
  console.error('❌ PG_URI environment variable is not set. DB connection will be skipped.');
}

// ✅ Enhanced Supabase connection with better error handling
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
      pool: {
        max: 5,
        min: 0,
        acquire: 60000, // 60 seconds
        idle: 10000,    // 10 seconds
      },
      retry: {
        max: 3,
      },
    })
  : null;

// ✅ Enhanced connection with better retry logic
const connectDB = async ({ retries = 10, delayMs = 5000 } = {}) => {
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
      
      if (err.message.includes('sleep') || err.message.includes('inactive')) {
        console.log('💤 Database is sleeping. Waiting 10 seconds before retry...');
        await new Promise((res) => setTimeout(res, 10000));
      } else if (attempt >= retries) {
        console.error('❌ Max retries reached. Database connection failed.');
        return false;
      } else {
        await new Promise((res) => setTimeout(res, delayMs));
      }
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
