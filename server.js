const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/lego/sets', (req, res) => {
  // Handle dynamic routes based on query parameters
  const theme = req.query.theme;
  if (theme) {
    // Return theme-specific sets
    res.send(`Displaying sets for theme: ${theme}`);
  } else {
    // Return all sets
    res.send('Displaying all sets');
  }
});

app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  res.send(`Displaying set with number: ${setNum}`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
