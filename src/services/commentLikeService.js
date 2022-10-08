const { CommentLike } = require('../models');

exports.findAllCommentLikes = async () => {
  const commentLikes = await CommentLike.findAll();
  return commentLikes;
};

exports.createCommentLikes = async (id, userId) => {
  const commentLike = await CommentLike.create({ userId, commentId: id });
  return commentLike;
};

exports.deleteCommentLikes = async (id, userId) => {
  await CommentLike.destroy({ where: { commentId: id, userId } });
};
