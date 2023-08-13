const express = require('express');
const userContoller = require('./../controllers/userController');
const authContoller = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authContoller.signup);
router.post('/login', authContoller.login);
router.post('/forgotPassword', authContoller.forgotPassword);
router.patch('/resetPassword/:token', authContoller.resetPassword);

router.use(authContoller.protect); // All the below routes are protected

router.patch('/updateMyPassword', authContoller.updatePassword);
router.get('/me', userContoller.getMe, userContoller.getUser);
router.patch('/updateMe', userContoller.updateMe);
router.delete('/deleteMe', userContoller.deleteMe);

router.use(authContoller.restrictTo('admin'));

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);
router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;
