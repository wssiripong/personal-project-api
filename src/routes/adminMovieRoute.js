const express = require('express');

const movieController = require('../controllers/movieController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('coverImage'), movieController.createMovie);

router.patch('/:id', upload.single('coverImage'), movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
