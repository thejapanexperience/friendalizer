import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receivePicAnalysis (data) {
    AppDispatcher.dispatch({
      type: 'PICTURE_ANALYSIS',
      payload: {data}
    });
  },

  receiveMsgAnalysis (data) {
    AppDispatcher.dispatch({
      type: 'MESSAGE_ANALYSIS',
      payload: {data}
    });
  },

  updateFavorites (favorites) {
    AppDispatcher.dispatch({
      type: 'UPDATE_FAVORITES',
      payload: {favorites}
    });
  }
};

export default ServerActions;
