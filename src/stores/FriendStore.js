import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';
import FriendActions from '../actions/FriendActions';

FriendActions.initializeFavorites();
let _queryCount = 0;
let _imgCount = 0;
let _favorites = [];
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
            _totals[1][1] += Number(msg.docEmotions.disgust)
            _totals[2][1] += Number(msg.docEmotions.fear)
            _totals[3][1] += Number(msg.docEmotions.joy)
            _totals[4][1] += Number(msg.docEmotions.sadness)
          console.log('_totals: ', _totals)
          _queryCount++;
          this.emit('CHANGE');
          break;
        case 'PICTURE_ANALYSIS':
          console.log('STORE PICTURE_ANALYSIS: ', action.payload.data);
          let picture = (action.payload.data)

          if(!picture.length)
            break;

            _totals[0][1] += Number(picture[0].scores.anger)
            _totals[0][1] += Number(picture[0].scores.contempt)
            _totals[1][1] += Number(picture[0].scores.disgust)
            _totals[2][1] += Number(picture[0].scores.fear)
            _totals[3][1] += Number(picture[0].scores.happiness)
            // _totals.neutral += Number(picture[0].scores.neutral)
            _totals[4][1] += Number(picture[0].scores.sadness)
            _totals[5][1] += Number(picture[0].scores.surprise)
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
        case 'UPDATE_FAVORITES':
          _favorites = action.payload.favorites;
          this.emit('CHANGE');
          break;
        case 'CLEAR_STORE':
          _queryCount = 0;
          _imgCount = 0;
          _name = ''
          _totals =[['anger',0], ['disgust',0], ['fear',0], ['happiness',0], ['sadness',0], ['surprise',0]]
          _pics = []
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

  getFavorites () {
    return _favorites;
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
