const express = require('express');

const movieLikeController = require('../controllers/movieLikeController');

const router = express.Router();

router.post('/create', movieLikeController.createMovieLike);

router.delete('/delete/:id', movieLikeController.deleteMovieLike);

module.exports = router;
