//SurveyFormReview shows users their form input for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
//sc
//SurveyFormReview receive formValues as props from mapStateToProps & Destructuring
const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = _.map(formFields, field => {
    return(
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );

  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  );
};
//Taking out redux state,tranforming them into props,
//send down to component
function mapStateToProps(state) {
  // console.log(state);
  return{ formValues: state.form.SurveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
