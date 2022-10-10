const movieLikeService = require('../services/movieLikeService');

exports.createMovieLike = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.body;
    const movieLike = await movieLikeService.createMovieLike(id, user.id);
    res.status(200).json({ movieLike });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovieLike = async (req, res, next) => {
  try {
    const user = req.user;
    const id = +req.params.id;
    await movieLikeService.deleteMovieLike(id, user.id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
