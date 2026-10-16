import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_local_password',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Enables SSL encryption required by cloud providers like TiDB
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : false
});

export default pool.promise();