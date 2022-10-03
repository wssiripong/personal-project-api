const commentService = require('../services/commentService');

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { userId, movieId, title } = req.body;
    const comment = await commentService.createComment({
      userId,
      movieId,
      title
    });
    res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
