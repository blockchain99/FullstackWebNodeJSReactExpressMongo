//responsible initial view layer setup,
//whereas top level index.js responsible for redux(data) setup of application.
import React from 'react';
//BrowserRouter: brain of routing, Route: routing rule
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

//BrowserRouter has just one child component.
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
         <Route exact={true} path="/" component={Landing} />
         <Route path="/surveys" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
