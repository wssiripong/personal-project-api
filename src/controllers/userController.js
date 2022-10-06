const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const { User } = require('../models');

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const data = {};
    if (firstName) {
      data.firstName = firstName;
    }
    if (lastName) {
      data.lastName = lastName;
    }
    if (email) {
      data.email = email;
    }
    if (req.file) {
      if (req.user.profileImage) {
        const publicId = await cloudinary.getPublicId(req.user.profileImage);
        const url = await cloudinary.upload(req.file.path, publicId);
        data.profileImage = url;
      } else {
        const url = await cloudinary.upload(req.file.path);
        data.profileImage = url;
      }
    }

    await User.update(data, { where: { id: req.user.id } });
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: 'password' }
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
