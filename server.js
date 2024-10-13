const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Lego sets dynamic route
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;
  // Logic to filter sets by theme and send response
  if (theme) {
    res.json({ message: `Lego sets for theme: ${theme}` });
  } else {
    res.json({ message: 'All Lego sets' });
  }
});

// Route for specific set number
app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  res.json({ message: `Lego set details for: ${setNum}` });
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});