import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Landing extends Component {

  render () {

    return (
      <div>
        <div className="row">
          <br />
          <h3 className='text-center'>Are your friends really your friends?</h3>
          <h2 className='text-center'>Are you sure you want friends like yours?</h2>
          <h1 className='text-center'>Are your friends worth keeping?</h1>
        </div>
        <br />
        <div className="row text-center">
          <Link to='/search' className='btn btn-info'>Begin Analysis</Link>
        </div>
      </div>
    );
  }
}
