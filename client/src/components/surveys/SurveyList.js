import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
/**
 * SurveyList
 */
export class SurveyList extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card  deep-purple lighten-5" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>YES: {survey.yes}</a>
            <a>NO: {survey.no}</a>
          </div>
        </div>
      );
    });

  }
  render() {
    return (
      <div>
       {this.renderSurveys()}
      </div>
    );
  }
}

// function mapStateToProps(state) {
// //surveys: surveysReducer in reducers/index.js
//   return { surveys: state.surveys };
// }
function mapStateToProps({ surveys }) {
  return{ surveys };
}
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
