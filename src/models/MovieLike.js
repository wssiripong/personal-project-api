module.exports = (sequelize, DataTypes) => {
  const MovieLike = sequelize.define('MovieLike', {}, { underscored: true });

  MovieLike.associate = (db) => {
    MovieLike.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    MovieLike.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return MovieLike;
};
