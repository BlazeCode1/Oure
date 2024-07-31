const express = require('express');
const filmRoutes = require('./routes/filmRoutes');
const cors = require('cors')
const app = express();
const port = 2030;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/films', filmRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});