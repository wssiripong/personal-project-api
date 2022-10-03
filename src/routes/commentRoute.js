const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

router.get('/', commentController.getAllComments);

router.post('/', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;
