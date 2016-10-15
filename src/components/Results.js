import React, { Component } from 'react';
import uuid from 'uuid';
import { browserHistory, Link } from 'react-router';
import { Progress, Label, Icon } from 'semantic-ui-react';

import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: FriendStore.getTotals(),
      counts: {query: 1, pics: 1}
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    FriendStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    FriendStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      totals: FriendStore.getTotals(),
      counts: FriendStore.getCounts()
    });
  }

  render () {
    let {totals, counts} = this.state;
    console.log('counts:', counts);
    console.log('totals: ', totals)

    return (
      <div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <h1>Victim Analysis</h1>
          </div>
          <div className="col-md-5">
            <div className="ui huge fluid buttons">
              <button className="ui orange button">Close</button>
              <div className="or"></div>
              <Link className='ui positive button'>Save Analysis</Link>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <hr />
          <div className="col-md-6">
            <div className="ui fluid card">
              <div>

              </div>
              <div className="content">
                <a className="header">Kristy</a>
                <div className="meta">
                  <span className="date">Joined in 2013</span>
                </div>
                <div className="description">
                  Kristy is an art director living in New York.
                </div>
              </div>
              <div className="extra content">
                <a>
                  <i className="user icon"></i>
                  22 Friends
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h1>Happiness</h1>
            <div>
              <Progress percent={totals[3][1]/counts.query*100} indicating color='yellow'/>
            </div>
            <h1>Surprise</h1>
            <div>
              <Progress percent={totals[5][1]/counts.pics*100} indicating color='pink'/>
            </div>
            <h1>Anger</h1>
            <div>
              <Progress percent={totals[0][1]/counts.query*100} indicating color='red'/>
            </div>
            <h1>Fear</h1>
            <div>
              <Progress percent={totals[2][1]/counts.query*100} indicating color='purple'/>
            </div>
            <h1>Disgust</h1>
            <div>
              <Progress percent={totals[1][1]/counts.query*100} indicating color='olive'/>
            </div>
            <h1>Sadness</h1>
            <div>
              <Progress percent={totals[4][1]/counts.query*100} indicating color='blue'/>
            </div>
          </div>
        </div>
      </div>
            );
          }
          }
