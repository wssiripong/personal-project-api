const { CommentLike } = require('../models');

exports.findAllCommentLikes = async () => {
  const commentLikes = await CommentLike.findAll();
  return commentLikes;
};
