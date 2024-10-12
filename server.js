const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" folder
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Route for Lego sets (with optional theme query)
app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        // Return Lego sets based on theme
        // Replace with actual data fetching logic
        res.json({ theme });
    } else {
        // Return all Lego sets
        // Replace with actual data fetching logic
        res.json({ sets: [] });
    }
});

// Route for individual Lego set
app.get('/lego/sets/:id', (req, res) => {
    const setId = req.params.id;
    // Replace with actual data fetching logic
    res.json({ set_num: setId });
});

// 404 error handling
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
