import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

//2nd arg : reference to existing DOM node inside HTML document
//so, reference to <div id="root"></div> in index.html,
ReactDOM.render(<App />, document.querySelector('#root'));
