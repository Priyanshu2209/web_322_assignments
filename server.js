const express = require('express');
const app = express();
const path = require('path');

// Static content (CSS, images, etc.)
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

// About route
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Lego sets route with optional theme query
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;
  let legoSets = require('./data/setData');

  if (theme) {
    legoSets = legoSets.filter(set => set.theme === theme);
  }

  if (legoSets.length > 0) {
    res.status(200).json(legoSets);
  } else {
    res.status(404).send('No Lego sets found for the specified theme.');
  }
});

// Lego set by set_num route
app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  const legoSets = require('./data/setData');
  const legoSet = legoSets.find(set => set.set_num === setNum);

  if (legoSet) {
    res.status(200).json(legoSet);
  } else {
    res.status(404).send('Lego set not found.');
  }
});

// 404 Error page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
