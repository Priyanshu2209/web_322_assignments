const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/home.html'));
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/about.html'));
});

// Dynamic route for LEGO sets based on theme query
app.get('/lego/sets', (req, res) => {
    // Fetch sets from setData.json
    fs.readFile(path.join(__dirname, 'data/setData.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const sets = JSON.parse(data);
        const theme = req.query.theme;

        // Filter sets by theme if provided
        const filteredSets = theme ? sets.filter(set => set.theme === theme) : sets;

        res.json(filteredSets); // Send the filtered sets as a JSON response
    });
});

// Dynamic route for individual LEGO set
app.get('/lego/sets/:setNum', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/setData.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const sets = JSON.parse(data);
        const setNum = req.params.setNum;
        const set = sets.find(s => s.setNum === setNum);

        if (!set) {
            return res.status(404).sendFile(path.join(__dirname, '/public/views/404.html'));
        }

        res.json(set); // Send the individual set as a JSON response
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/views/404.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
