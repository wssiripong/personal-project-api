const { Op } = require('sequelize');
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

exports.searchMovie = async (title) => {
  const movie = await Movie.findAll({
    where: { title: { [Op.like]: `%${title}%` } }
  });
  return movie;
};
