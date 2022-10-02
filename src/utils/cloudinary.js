const cloudinary = require('../config/cloudinary');

exports.uploadMovie = async (path, publicId) => {
  const option = {
    user_filename: true,
    overwrite: false,
    unique_filename: true
  };

  if (publicId) {
    option.public_id = publicId;
  }

  const res = await cloudinary.uploader.upload(path, option);
  return res.secure_url;
};

exports.deleteUploadMovie = async (name) => {
  cloudinary.uploader.destroy(name);
};

exports.getPublicId = (url) => {
  const splitSlash = url.split('/');
  return splitSlash[splitSlash.length - 1].split('.')[0];
};
