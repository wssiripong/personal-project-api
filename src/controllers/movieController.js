const Joi = require('joi');
const fs = require('fs');

const { Movie, Comment, CommentLike, MovieLike } = require('../models');
const cloudinary = require('../utils/cloudinary');
const movieService = require('../services/movieService');

const {
  CATEGORY_ANIME,
  CATEGORY_ACTION,
  CATEGORY_COMEDY,
  CATEGORY_CRIME,
  CATEGORY_DOCUMENTARY,
  CATEGORY_DRAMA,
  CATEGORY_FAMILY,
  CATEGORY_FANTASY,
  CATEGORY_HORROR,
  CATEGORY_ROMANCE,
  CATEGORY_THRILLER,
  CATEGORY_TV_SHOWS
} = require('../config/constants');
const AppError = require('../utils/appError');

exports.createMovie = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    const schema = Joi.object({
      title: Joi.string().required(),
      category: Joi.string()
        .valid(
          CATEGORY_ANIME,
          CATEGORY_ACTION,
          CATEGORY_COMEDY,
          CATEGORY_CRIME,
          CATEGORY_DOCUMENTARY,
          CATEGORY_DRAMA,
          CATEGORY_FAMILY,
          CATEGORY_FANTASY,
          CATEGORY_HORROR,
          CATEGORY_ROMANCE,
          CATEGORY_THRILLER,
          CATEGORY_TV_SHOWS
        )
        .required(),
      description: Joi.string().required()
    });

    const { error } = schema.validate({
      title,
      category,
      description
    });

    if (error) {
      throw new AppError(
        'title, category, description or coverImage is invalid',
        400
      );
    }

    const data = { title, category, description };

    if (req.file) {
      data.coverImage = await cloudinary.upload(req.file.path);
    }

    const movie = await Movie.create(data);

    res.status(201).json({ movie });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id } });
    const picName = await cloudinary.getPublicId(movie.coverImage);
    await Movie.destroy({ where: { id } });
    await cloudinary.deleteUploadMovie(picName);
    res.status(200).json({ message: 'movie deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieService.findAllMovies();
    res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const { title, category, description, coverImage } = req.body;
    const { id } = req.params;
    const obj = {};
    if (title) obj.title = title;
    if (category) obj.category = category;
    if (description) obj.description = description;
    if (coverImage) obj.coverImage = coverImage;
    const movie = await movieService.updateMovie(obj, id);
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

exports.searchMovie = async (req, res, next) => {
  try {
    const movie = await movieService.searchMovie(req.params.title);
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};
