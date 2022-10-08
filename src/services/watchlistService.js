const { Watchlist } = require('../models');

exports.findAllWatchlists = async () => {
  const watchlists = await Watchlist.findAll({});
  return watchlists;
};

exports.createWatchlist = async (id, userId) => {
  const watchlist = await Watchlist.create({ movieId: id, userId });
  return watchlist;
};

exports.deleteWatchlist = async (id, userId) => {
  await Watchlist.destroy({ where: { movieId: id, userId } });
};
