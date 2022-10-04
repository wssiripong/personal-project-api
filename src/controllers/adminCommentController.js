const adminCommentService = require('../services/adminCommentService');

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminCommentService.deleteComment(id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
