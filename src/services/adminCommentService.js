const { Comment } = require('../models');

exports.deleteComment = async (id) => {
  await Comment.destroy({ where: { id } });
};
