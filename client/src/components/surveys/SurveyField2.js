//SruveyField contains logic to render a single label and text input
import React from 'react';
//whole bunch of props passed
// export default props => {  //1
export default ({ input }) => {  //2

  // console.log(props);
  // console.log(props.input);  //1
  // console.log(input);  //2

  return (
    <div>
      <input {...input} />
    </div>
  );
};
