import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

if (!PG_URI) {
  console.error('❌ PG_URI environment variable is not set. DB connection will be skipped.');
}

// ✅ Use Supabase's connection pooler (port 6543) instead of direct connection
const sequelize = PG_URI
  ? new Sequelize(PG_URI, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        // ✅ Add statement timeout to prevent hanging
        statement_timeout: 30000, // 30 seconds
      },
      pool: {
        max: 3,              // Reduced from 5 (free tier has low limits)
        min: 0,
        acquire: 90000,      // Increased to 90 seconds (time to wait for wake-up)
        idle: 10000,
        evict: 1000,         // Check for idle connections every 1 second
      },
      retry: {
        max: 5,              // Increased retries
        backoffBase: 1000,   // Start with 1 second delay
        backoffExponent: 1.5,// Exponential backoff
      },
    })
  : null;

// ✅ Enhanced connection with exponential backoff
const connectDB = async ({ retries = 15, initialDelayMs = 2000 } = {}) => {
  if (!sequelize) return false;

  let attempt = 0;
  let delayMs = initialDelayMs;

  while (attempt < retries) {
    try {
      console.log(`🔄 Connecting to database (attempt ${attempt + 1}/${retries})...`);
      
      await sequelize.authenticate();
      
      console.log('✅ PostgreSQL Connected (Supabase SSL enabled)');
      return true;
      
    } catch (err) {
      attempt += 1;
      
      const errorMsg = err.message.toLowerCase();
      
      // ✅ Detect if database is sleeping/paused
      if (errorMsg.includes('sleep') || 
          errorMsg.includes('pause') || 
          errorMsg.includes('inactive') ||
          errorMsg.includes('timeout') ||
          errorMsg.includes('econnrefused')) {
        
        console.log(`💤 Database appears to be sleeping. Waiting ${delayMs / 1000}s before retry...`);
        
      } else {
        console.error(`⚠️  Connection error (attempt ${attempt}/${retries}):`, err.message);
      }
      
      // ✅ Stop retrying if we've exhausted attempts
      if (attempt >= retries) {
        console.error('❌ Max retries reached. Database connection failed.');
        console.error('💡 Tip: Try manually waking up your Supabase project from the dashboard.');
        return false;
      }
      
      // ✅ Wait before retrying (exponential backoff)
      await new Promise((res) => setTimeout(res, delayMs));
      
      // Increase delay for next attempt (exponential backoff)
      delayMs = Math.min(delayMs * 1.5, 30000); // Cap at 30 seconds
    }
  }
  
  return false;
};

// ✅ Keep connection alive by pinging periodically
const keepAlive = () => {
  setInterval(async () => {
    try {
      await sequelize.query('SELECT 1');
      console.log('🔔 Database connection keepalive ping successful');
    } catch (err) {
      console.error('⚠️  Keepalive ping failed:', err.message);
    }
  }, 5 * 60 * 1000); // Ping every 5 minutes
};

// ✅ Helper for testing connection manually
const testConnection = async () => {
  const ok = await connectDB({ retries: 1, initialDelayMs: 200 });
  console.log(ok ? '🟢 testConnection: OK' : '🔴 testConnection: FAILED');
  return ok;
};

export { sequelize, testConnection, keepAlive };
export default connectDB;
