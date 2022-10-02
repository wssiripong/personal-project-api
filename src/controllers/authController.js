const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
};

exports.register = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password, confirmPassword } =
      req.body;

    const schema = Joi.object({
      username: Joi.string().alphanum().min(5).max(20).required(),
      password: Joi.string().min(6).max(20).required(),
      confirmPassword: Joi.ref('password'),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } })
    }).with('password', 'confirmPassword');

    const { error } = schema.validate({
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email
    });

    if (error) {
      throw new AppError(error, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword
    });

    const token = genToken({ id: user.id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const schema = Joi.object({
      username: Joi.string().alphanum().min(5).max(20).required(),
      password: Joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate({
      username,
      password
    });

    if (error) {
      throw new AppError(error, 400);
    }

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      throw new AppError('username or password is invalid', 400);
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      throw new AppError('username or password is invalid', 400);
    }

    const token = genToken({ id: user.id, role: user.role });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: 'password' }
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
