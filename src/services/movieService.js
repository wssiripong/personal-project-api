const { Movie, MovieLike, Comment, Watchlist } = require('../models');

exports.findAllMovies = async () => {
  const movies = await Movie.findAll({
    include: [{ model: MovieLike }, { model: Comment }, { model: Watchlist }],
    order: [['updatedAt', 'DESC']]
  });
  return movies;
};

exports.updateMovie = async (input, id) => {
  const movie = await Movie.update(input, { where: { id } });
  return movie;
};
