import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306, // Add this line
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Optional: Test DB connection on startup
try {
  const connection = await pool.getConnection();
  console.log('Connected to MySQL database!');
  connection.release();
} catch (err) {
  console.error('Failed to connect to MySQL:', err.message);
  process.exit(1);
}

// Add a new contact
export async function addContact(full_name, phone_number, email_address, yoursubject, message) {
  try {
    await pool.query(
      'INSERT INTO contactme (full_name, phone_number, email_address, yoursubject, message) VALUES (?, ?, ?, ?, ?)',
      [full_name, phone_number, email_address, yoursubject, message]
    );
  } catch (err) {
    console.error('Error inserting contact:', err.message);
    throw err;
  }
}

// Fetch all messages
export async function getAllMessages() {
  try {
    const [rows] = await pool.query('SELECT * FROM contactme ORDER BY id DESC');
    return rows;
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    return [];
  }
}