
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //simple version
export default emails => {
  // const emailsArray = emails.split(',').trim()
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  //re.test(email) is valid return true, invalid false
  .filter(email => re.test(email) === false)

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  // return null; //same as below
  return;
};
