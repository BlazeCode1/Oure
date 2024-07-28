const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmcontroller');

// Search films by title, genre, type, and rating
router.get('/search', filmController.searchFilms);

module.exports = router;
