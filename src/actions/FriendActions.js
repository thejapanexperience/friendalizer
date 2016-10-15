import API from '../API';
import AppDispatcher from '../AppDispatcher';

const FriendActions = {
  search: API.search,
  addFavorite: API.postFavorite,
  deleteFavorite: API.deleteFavorite,
  initializeFavorites: API.initializeFavorites,
  getBusiness: API.getBusiness,
  startStream: API.startStream
};

export default FriendActions;
