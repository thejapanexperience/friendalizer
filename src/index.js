import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './components/Layout';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Landing from './components/Landing';
import Results from './components/Results';

import './stores/FriendStore';

render(
  <div>
    <div id='background'></div>
    <div id='content'>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/search' component={Search} />
          <Route path='/results' component={Results} />
          <Route path='/favorites' component={Favorites} />
        </Route>
      </Router>
    </div>
  </div>,
  document.getElementById('root')
);
