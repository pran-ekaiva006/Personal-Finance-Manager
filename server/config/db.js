import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

if (!PG_URI) {
  console.error('PG_URI environment variable is not set. DB connection will be skipped.');
}

const sequelize = PG_URI
  ? new Sequelize(PG_URI, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Required for some cloud environments
        },
      },
    })
  : null;

// Connect DB with retry logic
const connectDB = async ({ retries = 5, delayMs = 1000 } = {}) => {
  if (!sequelize) return false;

  let attempt = 0;
  while (attempt < retries) {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL Connected');
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

// Optional helper
const testConnection = async () => {
  const ok = await connectDB({ retries: 1, delayMs: 200 });
  console.log(ok ? 'testConnection: OK' : 'testConnection: FAILED');
  return ok;
};

export { sequelize, testConnection };
export default connectDB;
