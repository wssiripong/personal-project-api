const commentLikeService = require('../services/commentLikeService');

exports.getAllCommentLikes = async (req, res, next) => {
  try {
    const commentLikes = await commentLikeService.findAllCommentLikes();
    res.status(200).json({ commentLikes });
  } catch (err) {
    next(err);
  }
};
