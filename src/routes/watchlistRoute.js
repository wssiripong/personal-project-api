const express = require('express');
const watchlistController = require('../controllers/watchlistController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', watchlistController.getAllWatchlists);

router.post('/create', authenticate, watchlistController.createWatchlist);

router.delete('/delete/:id', authenticate, watchlistController.deleteWatchlist);

module.exports = router;
