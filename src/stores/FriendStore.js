import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

let _tweets = [];
let _queryCount = 0;
let _imgCount = 0;
let _favorites = [];
let _business = null;
let _stream = [];
let _entities = [];
let _name = ''
let _totals =[['anger',0], ['disgust',0], ['fear',0], ['happiness',0], ['sadness',0], ['surprise',0]]
let _pics = []

class FriendStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'MESSAGE_ANALYSIS':
          console.log('STORE MESSAGE_ANALYSIS', action.payload.data);
          let msg = action.payload.data
            _totals[0][1] += Number(msg.docEmotions.anger)
            console.log('_totals[0][1]:1 ',_totals[0][1] )
            _totals[1][1] += Number(msg.docEmotions.disgust)
            console.log('_totals[0][1]:2 ',_totals[0][1] )
            _totals[2][1] += Number(msg.docEmotions.fear)
            console.log('_totals[0][1]:3 ',_totals[0][1] )
            _totals[3][1] += Number(msg.docEmotions.joy)
            console.log('_totals[0][1]:4 ',_totals[0][1] )
            _totals[4][1] += Number(msg.docEmotions.sadness)
            console.log('_totals[0][1]:5 ',_totals[0][1] )
          console.log('_totals: ', _totals)
          _queryCount++;
          this.emit('CHANGE');
          break;
        case 'PICTURE_ANALYSIS':
          console.log('STORE PICTURE_ANALYSIS: ', action.payload.data);
          let picture = (action.payload.data)
            _totals[0][1] += Number(picture[0].scores.anger)
            console.log('_totals[0][1]:6 ',_totals[0][1] )
            _totals[0][1] += Number(picture[0].scores.contempt)
            console.log('_totals[0][1]:7 ',_totals[0][1] )
            _totals[1][1] += Number(picture[0].scores.disgust)
            console.log('_totals[0][1]:8 ',_totals[0][1] )
            _totals[2][1] += Number(picture[0].scores.fear)
            console.log('_totals[0][1]:9 ',_totals[0][1] )
            _totals[3][1] += Number(picture[0].scores.happiness)
            console.log('_totals[0][1]:10 ',_totals[0][1] )
            // _totals.neutral += Number(picture[0].scores.neutral)
            _totals[4][1] += Number(picture[0].scores.sadness)
            console.log('_totals[0][1]:11 ',_totals[0][1] )
            _totals[5][1] += Number(picture[0].scores.surprise)
            console.log('_totals[0][1]:12 ',_totals[0][1] )
          console.log('_totals: ', _totals)
          _queryCount++;
          _imgCount++;
          this.emit('CHANGE');
          break;
        case 'PICS':
          _pics = action.payload.pics;
          this.emit('CHANGE');
          break;
        case 'NAME':
          _name = action.payload.name
          this.emit('CHANGE')
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

  getCounts () {
    return {
      query: _queryCount,
      pics: _imgCount
    };
  }

  getPics () {
    return _pics;
  }

  getTotals () {
    return _totals;
  }

  getName () {
    return _name;
  }
}

export default new FriendStore();
