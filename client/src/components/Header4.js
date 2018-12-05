import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 *https://materializecss.com/navbar.html
 */
export class Header extends Component { // eslint-disable-line react/prefer-stateless-function
 renderContent() {
   switch (this.props.auth) {
     case null:
      return;
     case false:
      return (
        <li><a href="/auth/google">Login With Google</a></li>
      );
     default:
      return <li><a href="/api/logout">Logout</a></li>;
   }
 }

  render() {
    return (
     <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// function mapStateToProps(state) {
// //object, pass to the Header as props
// //property,auth for authReducer in /reducers/index.js
//   return{ auth: state.auth}; //auth property is generated by state.auth
// }
function mapStateToProps({ auth }) {
//return object, pass the object to the Header as props
//property,auth for authReducer in /reducers/index.js
  return{ auth }; //auth property is generated by state.auth
}
export default connect(mapStateToProps)(Header);
