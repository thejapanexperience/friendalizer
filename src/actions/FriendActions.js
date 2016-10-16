import API from '../API';
import AppDispatcher from '../AppDispatcher';

const FriendActions = {
  search (pics, msgs) {
    AppDispatcher.dispatch({
      type: 'PICS',
      payload: {pics}
    });
    API.search(pics,msgs)
  },
  name (name) {
    AppDispatcher.dispatch({
      type: 'NAME',
      payload: {name}
    })
  },
  clearStore () {
    AppDispatcher.dispatch({
      type: 'CLEAR_STORE'
    });
  },
  postFavorite: API.postFavorite,
  deleteFavorite: API.deleteFavorite,
  initializeFavorites: API.initializeFavorites,
  getBusiness: API.getBusiness,
  startStream: API.startStream,
  openSocket: API.openSocket,
  closeSocket: API.closeSocket,
  sendMail:API.sendMail
};

export default FriendActions;
