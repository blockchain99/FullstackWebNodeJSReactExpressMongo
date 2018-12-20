//responsible initial view layer setup,
//whereas top level index.js responsible for redux(data) setup of application.
import React, { Component } from 'react';
//BrowserRouter: brain of routing, Route: routing rule
import { BrowserRouter, Route } from 'react-router-dom';
//give a component ability to call action creator
import { connect } from 'react-redux';
import * as actions from '../actions';
// const Header = () => <h2>Header</h2>;
import Header from './Header';
import Landing from './Landing';
// const Dashboard = () => <h2>Dashboard</h2>;
import Dashboard from './Dashboard';
// const SurveyNew = () => <h2>SurveyNew</h2>;
import SurveyNew from './surveys/SurveyNew';
// const Landing = () => <h2>Landing</h2>;


//BrowserRouter has just one child component.
// const App = () => {
class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); //call action creator,/actions/index.js
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
           <Header />
           <Route exact path="/" component={Landing} />
           <Route exact path="/surveys" component={Dashboard} />
           <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// export default App;
export default connect(null, actions)(App);//mapStateToProps, action creator
