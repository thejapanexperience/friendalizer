import ServerActions from './actions/ServerActions';
import axios from 'axios';
const io = require('socket.io-client')
let socket;

const API = {
  initializeFavorites () {
    axios.get('http://localhost:8000/managefavorites')
      .then((res) => {
        console.log('API INITIALIZE:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('INITIALIZE FAVORITES:', err);
      });
  },

  openSocket () {
    socket = io.connect('http://localhost:8000');
    socket.on('watson', function (data) {
      // console.log('WATSON:', data);
      ServerActions.receiveMsgAnalysis(data);
    });

    socket.on('microsoft', function(data) {
      // console.log('MICROSOFT:', data);
      ServerActions.receivePicAnalysis(data);
    });
  },

  closeSocket () {
    socket.disconnect();
  },

  search (pics, msgs) {
    axios.post(`http://localhost:8000/api/search`,{pics, msgs})
      .then((res) => {
        console.log('API SEARCH:', res.data);
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  postFavorite (business) {
    axios.post('http://localhost:8000/managefavorites', business)
      .then((res) => {
        console.log('API POST:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('POST FAVORITE:', err);
      });
  },

  deleteFavorite (id) {
    axios.delete(`http://localhost:8000/managefavorites?id=${encodeURI(id)}`)
      .then((res) => {
        console.log('API DELETE:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('DELETE FAVORITE:', err);
      });
  },

  getBusiness (id) {
    axios.get(`http://localhost:8000/business?id=${id}`)
      .then((res) => {
        console.log('API BUSINESS:', res.data);
        ServerActions.recieveBusiness(res.data);
      })
      .catch((err) => {
        console.error('GET BUSINESS:', err);
      });
  },

  startStream (term, count, radius) {
    axios.get(`http://localhost:8000/search/live?term=${encodeURI(term)}&count=${count}&radius=${radius}`);
  }
};

export default API;
