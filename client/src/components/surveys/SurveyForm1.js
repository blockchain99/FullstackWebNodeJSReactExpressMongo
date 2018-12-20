//SurveyForm shows a form for a user to add input

import React, { Component } from 'react';
//{..}:specific exported value(obj), reduxForm from redux-form lib
//Like connect in react-redux, allow component(class SurveyForm)
//to communicate redux store
import { reduxForm, Field } from 'redux-form';

export class SurveyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => console.log(values))}
        >
         <Field type="text" name="surveyTitle" component="input" />
         <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

//like connnect in react-redux
export default reduxForm({
  form: 'SurveyForm'
})(SurveyForm);
