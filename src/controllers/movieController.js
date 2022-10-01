const Joi = require('joi');
const fs = require('fs');

const { Movie } = require('../models');
const cloudinary = require('../utils/cloudinary');

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
      data.coverImage = await cloudinary.uploadMovie(req.file.path);
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
