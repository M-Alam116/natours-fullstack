const Tour = require('./../Model/tourModel');
const User = require('./../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const Booking = require('../Model/bookModel');
const AppError = require('../utils/appError');

// get All tours
exports.getAllTours = catchAsync(async (req, res) => {
  // 1) GET THE TOUR DATA FROM COLLECTIOn
  const tours = await Tour.find();
  // automatically detect base

  // 2) Build the template
  // 3) Render the template
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the Data

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    //   which 3 fields I want
    fields: 'review rating user ',
  });
  if (!tour) {
    return next(new AppError('Tour not found!', 404));
  }
  // console.log(tour);

  // automatically detect base
  // 2) Build the template
  // 3) Render the template
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
  });
});

// Login
exports.logIn = (req, res) => {
  res.status(200).render('login');
};

exports.getAccount = (req, res) => {
  res.status(200).render('account');
};

exports.signUp = (req, res) => {
  res.status(200).render('signup');
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

// When Booking create show alert
exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (!alert) next();
  if (alert === 'booking') res.locals.alert = 'Booking created Successfully!';
  next();
};
