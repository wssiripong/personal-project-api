const { Movie, User, MovieLike, Comment } = require('../models');

exports.findAllMovies = async () => {
  const movies = await Movie.findAll({
    include: [{ model: MovieLike }, { model: Comment }],
    order: [['updatedAt', 'DESC']]
  });
  return movies;
};
