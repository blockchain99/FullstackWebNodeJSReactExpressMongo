import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
/**
 * Payments
 */
class Payments extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // debugger;

    return (
      <StripeCheckout
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
       />
    );
  }
}

export default Payments;
