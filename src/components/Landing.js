import React, { Component } from 'react';
import {Link} from 'react-router';
import FriendActions from '../actions/FriendActions';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.addName = this.addName.bind(this);
  }

  addName (){
    let { name } = this.refs
    console.log('name: ', name.value)
    FriendActions.name(name.value)
  }

  render () {

    return (
      <div>
        <div className="row">
          <br />
          <h2 className='introText text-center'>Are you sure you want friends like yours?</h2>
          <h3 className='introText text-center'>Are your friends really your friends?</h3>
          <h1 className='introText text-center'>Are your friends worth keeping?</h1>
          <h1 className='introText text-center'>Scared to find out?</h1>
        </div>
        <br />
        <div className="row text-right">
          <div className="ui action huge input">
            <input type="text" ref="name" placeholder="Donald"/>
            <Link id="beginAnalysis" to='/search' onClick={this.addName} className="ui red right labeled icon button">
              <i className="smile icon"></i>
              Begin Analysis
            </Link>
            <br/>
          </div>
        </div>
        <br/><br/><img src="http://embassie.com/wp-content/themes/embassie_hostel/images/silhouettes.png" alt=""/>
      </div>
    );
  }
}
