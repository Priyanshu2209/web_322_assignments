const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the "public" directory
app.use(express.static('public'));

const setData = require('./data/setData.json'); 
const themeData = require('./data/themeData.json');  


// Routes

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/home.html'));
});

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/about.html'));
});

// Route to return all Lego sets or filter by theme
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;
  
  // If a theme is specified in the query string, filter sets by theme
  if (theme) {
    const filteredSets = setData.filter(set => {
      const themeObj = themeData.find(t => t.name.toLowerCase() === theme.toLowerCase());
      return themeObj && set.theme_id === themeObj.id;
    });
    
    if (filteredSets.length > 0) {
      res.json(filteredSets);
    } else {
      res.status(404).json({ error: "No sets found for the specified theme" });
    }
  } else {
    // If no theme is specified, return all sets with their respective theme names
    const setsWithThemes = setData.map(set => {
      const themeObj = themeData.find(t => t.id === set.theme_id);
      return {
        ...set,
        theme_name: themeObj ? themeObj.name : 'Unknown'
      };
    });
    res.json(setsWithThemes);
  }
});


app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  const set = setData.find(s => s.set_num === setNum);

  if (set) {
    const themeObj = themeData.find(t => t.id === set.theme_id);
    res.json({
      ...set,
      theme_name: themeObj ? themeObj.name : 'Unknown'
    });
  } else {
    res.status(404).json({ error: "Set not found" });
  }
});

// 404 page route for any unknown route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/views/404.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
