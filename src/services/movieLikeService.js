const { MovieLike } = require('../models');

exports.createMovieLike = async (movieId, userId) => {
  const movieLike = await MovieLike.create({ movieId, userId });
  return movieLike;
};

exports.deleteMovieLike = async (movieId, userId) => {
  await MovieLike.destroy({ where: { movieId, userId } });
};
