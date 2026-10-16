import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Portfolio API server is up and running!');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'API healthy' });
});

// GET all projects from MySQL
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST contact message directly to MySQL
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const query = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    await pool.query(query, [name, email, message]);
    res.status(201).json({ success: true, message: 'Message stored in database' });
  } catch (err) {
    console.error('Error inserting message:', err);
    res.status(500).json({ error: 'Failed to write to database' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});