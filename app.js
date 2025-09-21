import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { addContact, getAllMessages } from './database.js';
// Import CORS for cross-origin requests
// import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes : allow cross-origin requests from anywhere.
// const cors = require('cors');
// app.use(cors());
// Enable CORS for GitHub Pages or any other domain
// app.use(cors({
//   origin: 'https://yourusername.github.io'
// }));

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', async (req, res) => {
  try {
    const messages = await getAllMessages();
    const success = req.query.success === 'true';

    res.render('index', {
      messages,
      success,
      title: "Portfolio for Jeff"
    });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Server error');
  }
});

app.post('/add', async (req, res) => {
  const { full_name, phone_number, email_address, yoursubject, message } = req.body;

  try {
    await addContact(full_name, phone_number, email_address, yoursubject, message);
    res.redirect('/?success=true');
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Server error saving your message');
  }
});

// Password-protected CV download route
app.get('/download-cv', (req, res) => {
  const userPassword = req.query.password;
  const correctPassword = process.env.CV_PASSWORD;

  if (!userPassword || userPassword !== correctPassword) {
    return res.status(401).send('Unauthorized');
  }

  const cvPath = path.join(__dirname, 'public', 'CV_Jeff.pdf');
  res.download(cvPath, 'CV_Jeff.pdf', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error downloading the file');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

