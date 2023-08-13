const express = require('express');
const tourController = require('./../controllers/tourController');
const authContoller = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/2h3h4k/reviews
// GET /tour/2h3h4k/reviews

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authContoller.protect,
    authContoller.restrictTo('admin lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour).delete(
    authContoller.protect,
    authContoller.restrictTo('admin, lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
