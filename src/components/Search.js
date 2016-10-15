import React, { Component } from 'react';
import uuid from 'uuid';

import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pics: [true],
      msgs: [true]
    }

    this.addPic = this.addPic.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    this.repopulate = this.repopulate.bind(this);
  }

  componentWillMount () {
    FriendActions.openSocket();
  }

  componentWillUnmount () {
    FriendActions.closeSocket();
  }

  repopulate () {
    let pics = [];
    let msgs = [];

    this.state.pics.forEach((e, index) => {
      pics.push(this.refs[`pic${index}`].value);
    });

    this.state.msgs.forEach((e, index) => {
      msgs.push(this.refs[`msg${index}`].value);
    });

    setTimeout(() => {
      msgs.forEach((element, index) => {
        this.refs[`msg${index}`].value = element;
      });
    }, 1);

    setTimeout(() => {
      pics.forEach((element, index) => {
        this.refs[`pic${index}`].value = element;
      });
    }, 1);
  }

  addPic () {
    this.repopulate();

    this.setState({
      pics: [...this.state.pics,true]
    });
  }

  addMsg () {
    this.repopulate();

    this.setState({
      msgs: [...this.state.msgs,true]
    });
  }

  clear () {
    let {pic0, msg0} = this.refs;

    pic0.value = '';
    msg0.value = '';

    this.setState({
      pics: [true],
      msgs: [true]
    });
  }

  submit () {
    let pics = [];
    let msgs = [];

    this.state.pics.forEach((e, index) => {
      pics.push(this.refs[`pic${index}`].value);
    });

    this.state.msgs.forEach((e, index) => {
      msgs.push(this.refs[`msg${index}`].value);
    });

    FriendActions.search(pics, msgs)

  }

  render () {
    const {pics, msgs} = this.state;

    return (
      <div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <h1>Enter Search Items</h1>
          </div>
          <div className="col-md-5">
            <div className="ui huge fluid buttons">
              <button onClick={this.clear} className="ui orange button">Cancel</button>
              <div className="or"></div>
              <button onClick={this.submit} className="ui positive button">Save</button>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <br />
        <div className="row">
          <div className='col-md-4'>
            <h3>Add Pictures</h3>
            {pics.map((e, index) => (
              <div key={uuid()}>
                <div className="ui fluid left action input">
                  <button onClick={this.addPic} className="ui teal labled icon button">
                    <i className="plus icon"/>
                  </button>
                  <input type="text" ref={`pic${index}`} defaultValue="http://inthesetimes.com/images/articles/trump_flicker_face_yess.jpg"/>
                </div>
                <br />
              </div>
            ))}
          </div>
          <div className="col-md-8">
            <h3>Add Messages From Target</h3>

            {msgs.map((e, index) => (
              <div key={uuid()}>
                <div className="ui fluid left action input">
                  <button onClick={this.addMsg} className="ui teal labled icon button">
                    <i className="plus icon"/>
                  </button>
                  <input type="text" ref={`msg${index}`} defaultValue="Trump’s talk of a rigged election already has some of his supporters publicly saying they won’t accept the result of Clinton wins the presidential election. If she’s in office, I hope we can start a coup. She should be in prison or shot. That’s how I feel about it, Dan Bowman, a Trump supporter, told The Boston Globe last week. We’re going to have a revolution and take them out of office if that’s what it takes. There’s going to be a lot of bloodshed. But that’s what it’s going to take. . . . I would do whatever I can for my country. Trump also claimed that the Republican primary process was rigged in April, when it looked like Sen. Ted Cruz (R-Texas) could gather enough primary delegates to challenge his nomination at the Republican National Convention. The brash businessman’s chances of winning the White House are dwindling. He trails Clinton by more than 7 points nationally, according to HuffPost Pollster, which aggregates publicly available polling data. HuffPost Pollster’s presidential forecast model gives him a meager 7.9 percent chance of winning the presidency. Editor’s note: Donald Trump regularly incites political violence and is a serial liar, rampant xenophobe, racist, misogynist and birther who has repeatedly pledged to ban all Muslims — 1.6 billion members of an entire religion — from entering the U.S."/>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <div className="row">

        </div>
      </div>
    );
  }
}
