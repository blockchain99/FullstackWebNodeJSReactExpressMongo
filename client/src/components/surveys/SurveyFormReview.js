//SurveyFormReview shows users their form input for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions';
//sc
//SurveyFormReview receive formValues as props from mapStateToProps & Destructuring
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { //receive as props
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return(
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}//action creator
        className="green btn-flat right white-text"
        >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
//Taking out redux state,tranforming them into props,
//send down to component
function mapStateToProps(state) {
  // console.log(state);
  // return{ formValues: state.form.SurveyForm.values };
  return{ formValues: state.form.surveyForm.values };
}

// export default connect(mapStateToProps, actions)(SurveyFormReview);
//withRouter knows about history obj provided by react-router
//history obj is passed to action creator.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
