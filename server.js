const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/home.html');
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/views/about.html');
});

// Dynamic route for LEGO sets based on theme query
app.get('/lego/sets', (req, res) => {
    // Fetch sets based on theme query
});

// Dynamic route for individual LEGO set
app.get('/lego/sets/:setNum', (req, res) => {
    // Fetch individual LEGO set based on setNum
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/views/404.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
