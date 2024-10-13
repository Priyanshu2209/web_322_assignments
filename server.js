const express = require('express');
const app = express();
const path = require('path');

const setData = require("./data/setData");
const themeData = require("./data/themeData");
const legoSets = require('./legoSets'); // Assuming legoSets.js is in the root folder

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Initialize sets
legoSets.initialize()
    .then(() => {
        console.log("LEGO sets initialized.");
    })
    .catch((error) => {
        console.error("Initialization error:", error);
    });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Handle sets and theme filtering
app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoSets.getSetsByTheme(theme)
            .then((sets) => res.json(sets))
            .catch((error) => res.status(404).send(error));
    } else {
        legoSets.getAllSets()
            .then((sets) => res.json(sets))
            .catch((error) => res.status(404).send(error));
    }
});

// Handle individual set request
app.get('/lego/sets/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    legoSets.getSetByNum(setNum)
        .then((set) => res.json(set))
        .catch((error) => res.status(404).send(error));
});

// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
