const { Movie, User, MovieLike, Comment } = require('../models');

exports.findAllMovies = async () => {
  const movies = await Movie.findAll({
    include: [{ model: MovieLike }, { model: Comment }],
    order: [['updatedAt', 'DESC']]
  });
  return movies;
};

exports.updateMovie = async (input, id) => {
  const movie = await Movie.update(input, { where: { id } });
  return movie;
};
