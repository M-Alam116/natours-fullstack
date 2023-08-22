import axios from 'axios';
import { showAlert } from './alerts';
// import { Stripe } from 'stripe';
// import { Stripe } from '@stripe/stripe-js/';

// Stripe.js will not be loaded until `loadStripe` is called

// Public key for frontend
// let stripe;
// (async function () {
//   stripe = await loadStripe(
//     'pk_test_51NhAWASDFEKkRlUUjjyVw7UQBh4ivf49pQlLeTkfuC9BynkG1vqow1D9Uzfw5LMTNsJuogsOMIuM5RwAhr1cAwME00saiyPH3y',
//   );
// })();

//  AS THIS IS NOT WORKING
const stripe = Stripe(
  'pk_test_51Nhz9zEgdjji6HRiCHYTTfhCD6Eztg9xhEVHGh0DiYkL20tccBft5WrVIo8BSlpsKHbc2uCe3zbEXg0zEXn11hAC00ESU8lJGn',
);

// 3 steps to checkout
//     1)  Create checkout session in backend (in this project in tour router)
//     2)  Call from frontend side
//     3)  On success  Checkout it will post data to webhooks end point which ( in this project in app.js)

export const bookTour = async (tourId) => {
  // Get the sessioon from api
  try {
    const session = await axios(
      //   this will be same as relative as appi and website is hosted on same platform
      `/api/v1/tours/bookings/checkout-session/${tourId}`,
    );
    // console.log(session.data.session.id);
    // console.log(stripe.redirectToCheckout);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    // console.log('completed Checkout!');
  } catch (err) {
    showAlert('error', err);
    // console.log('error' + err);
  }
};
