const express = require('express');

const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', commentController.getAllComments);

router.post('/', authenticate, commentController.updateComment);

router.delete('/:id/:userId', authenticate, commentController.deleteComment);

module.exports = router;
