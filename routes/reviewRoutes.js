const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authContoller = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authContoller.protect,
    authContoller.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReviews,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
