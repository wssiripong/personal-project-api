module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Comment.associate = (db) => {
    Comment.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Comment.belongsTo(db.Movie, {
      foreignKey: {
        name: 'movieId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });

    Comment.hasMany(db.CommentLike, {
      foreignKey: {
        name: 'commentId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });
  };

  return Comment;
};
