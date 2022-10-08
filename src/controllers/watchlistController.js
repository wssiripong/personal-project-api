const watchlistService = require('../services/watchlistService');

exports.getAllWatchlists = async (req, res, next) => {
  try {
    const watchlists = await watchlistService.findAllWatchlists();
    res.status(200).json({ watchlists });
  } catch (err) {
    next(err);
  }
};

exports.createWatchlist = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = req.user;
    const watchlist = await watchlistService.createWatchlist(id, user.id);
    res.status(200).json({ watchlist });
  } catch (err) {
    next(err);
  }
};

exports.deleteWatchlist = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = req.user;
    await watchlistService.deleteWatchlist(id, user.id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
