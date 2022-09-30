module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    'Watchlist',
    {},
    {
      underscored: true
    }
  );

  Watchlist.associate = (db) => {
    Watchlist.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Watchlist.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return Watchlist;
};
