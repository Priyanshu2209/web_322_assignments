const express = require('express');
const app = express();
const path = require('path');
const legoSets = require('./legoSets');

app.use(express.static('public')); // Serve static files (CSS)

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

// About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Dynamic LEGO sets route
app.get('/lego/sets', async (req, res) => {
  try {
    await legoSets.initialize();
    if (req.query.theme) {
      const setsByTheme = await legoSets.getSetsByTheme(req.query.theme);
      res.json(setsByTheme);
    } else {
      const allSets = await legoSets.getAllSets();
      res.json(allSets);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

// Set by set_num route
app.get('/lego/sets/:setNum', async (req, res) => {
  try {
    await legoSets.initialize();
    const set = await legoSets.getSetByNum(req.params.setNum);
    res.json(set);
  } catch (err) {
    res.status(404).send(err);
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
