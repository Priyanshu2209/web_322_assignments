const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Load Lego sets and themes data from the data folder
const legoSets = require('./legoSets');

// Routes

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'home.html')); // Adjusted path to home.html
});

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'about.html')); // Adjusted path to about.html
});

// Route to return all Lego sets or filter by theme
app.get('/lego/sets', (req, res) => {
  const themeQuery = req.query.theme;
  
  if (themeQuery) {
    const filteredSets = legoSets.getSetsByTheme(themeQuery);
    
    if (filteredSets.length > 0) {
      res.json(filteredSets);
    } else {
      res.status(404).json({ error: "No sets found for the specified theme" });
    }
  } else {
    // If no theme is specified, return all sets
    const allSets = legoSets.getAllSets();
    res.json(allSets);
  }
});

// Route to return a specific Lego set by its set number
app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  const set = legoSets.getSetBySetNumber(setNum);

  if (set) {
    res.json(set);
  } else {
    res.status(404).json({ error: "Set not found" });
  }
});

// 404 page route for any unknown route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'views', '404.html')); // Adjusted path to 404.html
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
