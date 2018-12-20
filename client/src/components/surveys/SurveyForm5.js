//SurveyForm shows a form for a user to add input
//_.map- iterate over array & return new array
//consistitute of different records of it
import _ from 'lodash';

import React, { Component } from 'react';
//{..}:specific exported value(obj), reduxForm from redux-form lib
//Like connect in react-redux, allow component(class SurveyForm)
//to communicate redux store
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {label: "Survey Title", name: 'title'},
  {label: "Subject Line", name: 'subject'},
  {label: "Email body", name: 'body'},
  {label: "Recipient List", name: 'emails'}
];

export class SurveyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  renderFields() {
    // return _.map(FIELDS, field => {
    //   return <Field component={SurveyField} type="text" label={field.label} name={field.name} />
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => console.log(values))}
        >
         {this.renderFields()}
         <button type="submit" className="teal btn-flat right white-text">
           Submit
           <i className="material-icons right">done</i>
         </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //if no email entered,provide empty string
  errors.emails = validateEmails(values.emails || '');

  // _.each(FIELDS, (field)=> {
  _.each(FIELDS, ({ name })=> {
    if (!values[name]) { //refrence a property name on running time.
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
}

//like connnect in react-redux
export default reduxForm({
  // validate : validate
  validate,
  form: 'SurveyForm'
})(SurveyForm);
