const express = require('express');

const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);
router.get('/:id', authController.getUser);

router.patch(
  '/update',
  authenticate,
  upload.single('profileImage'),
  userController.updateUser
);

module.exports = router;
