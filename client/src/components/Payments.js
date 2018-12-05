//make Pay with Card icon cuttier with child component of StripeCheckout
//use materialize css, <a clannName="btn"></a> or <button className="btn"></button>
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux'
import * as actions from '../actions';
/**
 * Payments
 */
class Payments extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // debugger;

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 survey credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

//wire up connect helper(1st arg: no mapStateToProps, 2nd :action creator )
export default connect(null, actions)(Payments);
