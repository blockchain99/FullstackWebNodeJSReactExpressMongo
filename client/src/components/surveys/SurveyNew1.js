//After this file goto App.js & import this one.
//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

export class SurveyNew extends Component { // eslint-disable-line react/prefer-stateless-function
// //option 1: component level state
//   constructor(props) {
//     super(props);
//     this.state = { showFormReview: false };
//   }

//option2 : component level state
  state = { showFormReview: false };

  renderContent() {
    // if (this.state.showFromReview === true ) {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
      return ( //onSurveySubmit, callback f used in handleSubmit(), SurveyForm.js
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      );

    // }else {
    //   return <SurveyForm />
    // }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default SurveyNew;
