const commentLikeService = require('../services/commentLikeService');

exports.getAllCommentLikes = async (req, res, next) => {
  try {
    const commentLikes = await commentLikeService.findAllCommentLikes();
    res.status(200).json({ commentLikes });
  } catch (err) {
    next(err);
  }
};

exports.createCommentLikes = async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;
  try {
    const commentLike = await commentLikeService.createCommentLikes(
      id,
      user.id
    );
    res.status(200).json({ commentLike });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentLikes = async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params.id);
  const user = req.user;
  try {
    await commentLikeService.deleteCommentLikes(id, user.id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
