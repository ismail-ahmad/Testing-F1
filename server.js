const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // 👈 Use dynamic port

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Enable CORS for your frontend domain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.designsgravitas.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/form', (req, res) => {
  fetch(process.env.Web_Script, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    res.json({status: 'success'});
  })
  .catch(err => console.log(err))
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});