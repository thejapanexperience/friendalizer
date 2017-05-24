import React, { Component } from 'react';
import uuid from 'uuid';
import { browserHistory, Link } from 'react-router';
import { Progress, Label, Icon } from 'semantic-ui-react';
import {ApAlbum, ApAlbumStyle} from 'apeman-react-album'
import { ApSpinnerStyle } from 'apeman-react-spinner'
import { ApImageStyle } from 'apeman-react-image'


import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: FriendStore.getTotals(),
      counts: {query: 1, pics: 1},
      pics: FriendStore.getPics(),
      name: FriendStore.getName()
    };
    this._onChange = this._onChange.bind(this);
    this.close = this.close.bind(this);
    this.postFavorite = this.postFavorite.bind(this);
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
      counts: FriendStore.getCounts(),
      pics: FriendStore.getPics(),
      name: FriendStore.getName()
    });
  }

  close () {
    FriendActions.clearStore()
  }

  postFavorite () {
    let {totals, counts, pics, name} = this.state;
    FriendActions.postFavorite({totals, counts, pics, name, id: uuid()});
    FriendActions.clearStore();
  }

  // capture () {
  //   console.log('CAPTURE');
  //   printscreen('http://localhost:8000/results', {}, (err, data) => {
  //
  //     require('fs').stat(data.file, (err, stats) =>
  //     console.log(`
  //       - There are ${data.output.divs} divs in this page.
  //       - Your screenshot is available at ${data.file} and is ${stats.size} bytes.
  //     `));
  //   });
  // }

  render () {
    let {totals, counts, pics, name} = this.state;
    if (!name) {
      name = 'John/Jane Doe'
    }
    // console.log('counts:', counts);
    // console.log('totals: ', totals)
    // console.log('name: ', name)
    // console.log('totals[0][1]/counts.query*100: ', totals[0][1]/counts.query*100)
    // console.log('totals[0][1]: ', totals[0][1])
    // console.log('counts.query: ', counts.query)

    return (
      <div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <h1>Friend Analysis</h1>
          </div>
          <div className="col-md-5">
            <div className="ui huge fluid buttons">
              <Link to='/' onClick={this.close} className="ui orange button">Close</Link>
              <div className="or"></div>
              <Link to='/favorites' onClick={this.postFavorite} className='ui positive button'>Save Analysis</Link>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <hr />
          <div className="col-md-6">
            <div className="ui fluid card">
              <div>
                <div id='album'>
                  <ApSpinnerStyle />
                  <ApImageStyle />
                  <ApAlbumStyle />
                  <ApAlbum
                    width='555px'
                    height='400px'
                    // scale='fill'
                    images={pics}/>
                </div>
              </div>
              <div className="ui inverted content">
                <h1 className="ui huge white inverted header" >{name}</h1>


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
