const express = require('express');

const commentLikeController = require('../controllers/commentLikeController');

const router = express.Router();

router.get('/', commentLikeController.getAllCommentLikes);

module.exports = router;
