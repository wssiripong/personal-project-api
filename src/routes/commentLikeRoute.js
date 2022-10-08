const express = require('express');

const commentLikeController = require('../controllers/commentLikeController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', commentLikeController.getAllCommentLikes);

router.post('/create', authenticate, commentLikeController.createCommentLikes);

router.delete(
  '/delete/:id',
  authenticate,
  commentLikeController.deleteCommentLikes
);

module.exports = router;
