//SurveyForm shows a form for a user to add input

import React, { Component } from 'react';
//{..}:specific exported value(obj), reduxForm from redux-form lib
//Like connect in react-redux, allow component(class SurveyForm)
//to communicate redux store
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

export class SurveyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  renderFields() {
    return (
      <div>
        <Field
        label="Survey Title"
        type="text"
        name="title"
        component={SurveyField}
        />
        <Field
        label="Subject Line"
        type="text"
        name="subject"
        component={SurveyField}
        />
        <Field
        label="Email Body"
        type="text"
        name="body"
        component={SurveyField}
        />
        <Field
        label="Recipient List"
        type="text"
        name="emails"
        component={SurveyField}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => console.log(values))}
        >
         {this.renderFields()}
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
