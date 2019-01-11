//Data layer(Redux) control
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
//1st : single dummy reducer,
//2nd arg(initial state of application): server side rendering
//We created redux store at the top level of application & hook it up to
//react side of application by placing <Provider> tag.
const store = createStore( () => [], {}, applyMiddleware());
//2nd arg : reference to existing DOM node inside HTML document
//so, reference to <div id="root"></div> in index.html,
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
