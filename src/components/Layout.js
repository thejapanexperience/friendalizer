import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Layout extends Component {
  render () {
    return (
      <div className='container'>
        <div id='page-title'>
          <img src="http://i.imgur.com/EjBXX1e.png" />
        </div>
        <div className='row'>
          <ul className='nav nav-tabs'>
            <li role='presentation'>
              <Link to='/' className={this.props.location.pathname === '/' ? 'btn btn-default' : null}>Home</Link>
            </li>
            <li role='presentation'>
              <Link to='/favorites' activeClassName='btn btn-default'>Favorites</Link>
            </li>
          </ul>
        </div>
        <div id='main'>{this.props.children}</div>
      </div>
    );
  }
}
