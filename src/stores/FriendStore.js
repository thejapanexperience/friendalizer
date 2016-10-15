import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

let _tweets = [];
let _favorites = [];
let _business = null;
let _stream = [];
let _entities = [];
let _msgs = []
let _pictures = []
let _totals =[['anger',0], ['disgust',0], ['fear',0], ['happiness',0], ['sadness',0], ['surprise',0]]

class FriendStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'MESSAGE_ANALYSIS':
          console.log('STORE MESSAGE_ANALYSIS', action.payload.data);
          _msgs.push(action.payload.data)
          _msgs.forEach((msg,i) => {
            _totals[0][1]+= Number(msg.docEmotions.anger)
            _totals[1][1]+= Number(msg.docEmotions.disgust)
            _totals[2][1]+= Number(msg.docEmotions.fear)
            _totals[3][1]+= Number(msg.docEmotions.joy)
            _totals[4][1]+= Number(msg.docEmotions.sadness)
          })
          console.log('_totals: ', _totals)
          this.emit('CHANGE');
          break;
        case 'PICTURE_ANALYSIS':
          console.log('STORE PICTURE_ANALYSIS: ', action.payload.data);
          _pictures.push(action.payload.data)
          _pictures.forEach((pic,i) => {
            _totals[0][1] += Number(pic[0].scores.anger)
            _totals[0][1] += Number(pic[0].scores.contempt)
            _totals[1][1] += Number(pic[0].scores.disgust)
            _totals[2][1]+= Number(pic[0].scores.fear)
            _totals[3][1]+= Number(pic[0].scores.happiness)
            // _totals.neutral += Number(pic[0].scores.neutral)
            _totals[4][1]+= Number(pic[0].scores.sadness)
            _totals[5][1]+= Number(pic[0].scores.surprise)
          })
          console.log('_totals: ', _totals)
          this.emit('CHANGE');
          break;
        case 'RECEIVE_TWEETS':
          _tweets = action.payload.tweets;
          this.emit('CHANGE');
          break;
        case 'UPDATE_FAVORITES':
          _favorites = action.payload.favorites;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_BUSINESS':
          _business = action.payload.business;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_STREAM':
          if (_stream.length > 100) {
            _stream.pop();
          }
          _stream.unshift(action.payload.data);
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ENTITIES':
          const relevant = action.payload.data.filter((entity) =>
            entity.count > 1 || parseFloat(entity.relevance) >= 0.5
          );

          if (relevant.length > 0) {
            _entities.unshift({
              relevant,
              timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
            });
          }
          this.emit('CHANGE');
          break;
        default:
          console.log('INVALID_ACTION_TYPE');
          break;
      }
    });
  }

  startListening (callback) {
    this.on('CHANGE', callback);
  }

  stopListening (callback) {
    this.removeListener('CHANGE', callback);
  }

  getBusinesses () {
    return _tweets;
  }

  getBusiness () {
    return _business;
  }

  getFavorites () {
    return _favorites;
  }

  getStream () {
    return _stream;
  }
  getEntities () {
    return _entities;
  }
}

export default new FriendStore();
