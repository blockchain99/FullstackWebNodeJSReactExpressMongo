//SurveyFormReview shows users their form input for review
import React from 'react';
import { connect } from 'react-redux';
//sc
//SurveyFormReview receive formValues as props from mapStateToProps & Destructuring
const SurveyFormReview = ({ onCancel, formValues }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <div>
          <label>Survey Title</label>
          <div>{formValues.title}</div>
        </div>
        <div>
          <label>Survey Line</label>
          <div>{formValues.subject}</div>
        </div>
        <div>
          <label>Email body</label>
          <div>{formValues.body}</div>
        </div>
        <div>
          <label>Recipient List</label>
          <div>{formValues.emails}</div>
        </div>
      </div>
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
