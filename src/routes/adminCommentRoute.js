const adminCommentController = require('../controllers/adminCommentController');

const express = require('express');

const router = express.Router();

router.delete('/:id', adminCommentController.deleteComment);

module.exports = router;
