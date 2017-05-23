import React, { Component } from 'react';
import uuid from 'uuid';
import { browserHistory } from 'react-router';
import { Progress, Label, Icon } from 'semantic-ui-react';

import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: FriendStore.getFavorites()
    };
    this._onChange = this._onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }

  componentWillMount () {
    FriendStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    FriendStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      favorites: FriendStore.getFavorites()
    });
  }

  sendMail(id, data){
    console.log('sending email')
    console.log('id: ', id)
    let address = this.refs[id].value
    console.log('address: ', address)
    FriendActions.sendMail(address, data)
  }

  delete (id) {
    console.log('DELETEING: ', id);
    FriendActions.deleteFavorite(id);
  }

  render () {
    console.log('FAVORITES DISPLAY: ', this.state.favorites);
    const {favorites} = this.state;

    return (
      <div>
        <div className="row">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="col-md-4">
              <br />
              <div className="ui fluid card">
                <div className='image favorite-album'>

                  <div onClick={() => this.delete(favorite.id)} className="ui red ribbon label delete">
                    <i className="trash icon"></i>Delete
                  </div>
                  <img className='favorites-img' src={favorite.pics[0]}/>
                </div>
                <div className="content">
                  <span className="header">{favorite.name}</span>
                  <div className="description">
                    <h6>Happiness</h6>
                    <div>
                      <Progress percent={favorite.totals[3][1]/favorite.counts.query*100} indicating color='yellow'/>
                    </div>
                    <h6>Surprise</h6>
                    <div>
                      <Progress percent={favorite.totals[5][1]/(favorite.counts.pics ? favorite.counts.pics : 1) * 100} indicating color='pink'/>
                    </div>
                    <h6>Anger</h6>
                    <div>
                      <Progress percent={favorite.totals[0][1]/favorite.counts.query*100} indicating color='red'/>
                    </div>
                    <h6>Fear</h6>
                    <div>
                      <Progress percent={favorite.totals[2][1]/favorite.counts.query*100} indicating color='purple'/>
                    </div>
                    <h6>Disgust</h6>
                    <div>
                      <Progress percent={favorite.totals[1][1]/favorite.counts.query*100} indicating color='olive'/>
                    </div>
                    <h6>Sadness</h6>
                    <div>
                      <Progress percent={favorite.totals[4][1]/favorite.counts.query*100} indicating color='blue'/>
                    </div>
                    {/* <div className="ui action fluid input">
                      <input type="text" ref={favorite.id} defaultValue="friend@email.com"/>
                      <button className="ui teal right labeled icon button" onClick={() => this.sendMail(favorite.id, favorite)}>
                        <i className="mail icon"></i>
                        Mail
                      </button>
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
