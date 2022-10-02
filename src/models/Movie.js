const {
  CATEGORY_ANIME,
  CATEGORY_CRIME,
  CATEGORY_DRAMA,
  CATEGORY_THRILLER,
  CATEGORY_HORROR,
  CATEGORY_FAMILY,
  CATEGORY_TV_SHOWS,
  CATEGORY_ROMANCE,
  CATEGORY_COMEDY,
  CATEGORY_FANTASY,
  CATEGORY_ACTION,
  CATEGORY_DOCUMENTARY
} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      category: {
        type: DataTypes.ENUM(
          CATEGORY_ANIME,
          CATEGORY_CRIME,
          CATEGORY_DRAMA,
          CATEGORY_THRILLER,
          CATEGORY_HORROR,
          CATEGORY_FAMILY,
          CATEGORY_TV_SHOWS,
          CATEGORY_ROMANCE,
          CATEGORY_COMEDY,
          CATEGORY_FANTASY,
          CATEGORY_ACTION,
          CATEGORY_DOCUMENTARY
        ),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true
    }
  );

  Movie.associate = (db) => {
    Movie.hasMany(db.Watchlist, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });

    Movie.hasMany(db.Comment, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });

    Movie.hasMany(db.MovieLike, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });
  };

  return Movie;
};
