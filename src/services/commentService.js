const { Comment } = require('../models');

exports.getAllComments = async () => {
  const comments = await Comment.findAll();
  return comments;
};

exports.createComment = async (input) => {
  const comment = await Comment.create(input);
  return comment;
};

exports.deleteComment = async (id) => {
  await Comment.destroy({ where: { id } });
};
