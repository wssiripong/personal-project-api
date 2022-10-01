const express = require('express');

const movieController = require('../controllers/movieController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('coverImage'), movieController.createMovie);

router.get('/', movieController.getAllMovies);

module.exports = router;
