import ServerActions from './actions/ServerActions';
import axios from 'axios';
const io = require('socket.io-client')
let socket;
let untilClose;
const PORT = 'https://xxxx.herokuapp.com';
// const PORT = process.env.PORT || 8009;
// const PORT = process.env.PORT;

const API = {
  initializeFavorites () {
    axios.get(`http://localhost:${PORT}/managefavorites`)
    // axios.get('http://localhost:8000/managefavorites')
      .then((res) => {
        console.log('API INITIALIZE:', res.data);
        ServerActions.updateFavorites(parseFavorites(res.data));
      })
      .catch((err) => {
        console.error('INITIALIZE FAVORITES:', err);
      });
  },

  openSocket () {
    socket = io.connect(`http://localhost:${PORT}`);
    // socket = io.connect('http://localhost:8000');
    socket.on('watson', function (data) {
      // console.log('WATSON:', data);
      ServerActions.receiveMsgAnalysis(data);
      untilClose--;
      if (untilClose < 1) {
        socket.disconnect();
        console.log('SOCKET CLOSED');
      }
    });

    socket.on('microsoft', function(data) {
      // console.log('MICROSOFT:', data);
      ServerActions.receivePicAnalysis(data);
      untilClose--;
      if (untilClose < 1) {
        socket.disconnect();
        console.log('SOCKET CLOSED');
      }
    });
  },

  search (pics, msgs) {
    untilClose = pics.length + msgs.length;

    axios.post(`http://localhost:${PORT}/api/search`,{pics, msgs})
    // axios.post(`http://localhost:8000/api/search`,{pics, msgs})
      .then((res) => {
        console.log('API SEARCH:', res.data);
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  postFavorite (favorite) {
    axios.post(`http://localhost:${PORT}/managefavorites`, favorite)
    // axios.post(`http://localhost:8000/managefavorites`, favorite)
      .then((res) => {
        console.log('API POST:', res.data);
        ServerActions.updateFavorites(parseFavorites(res.data));
      })
      .catch((err) => {
        console.error('POST FAVORITE:', err);
      });
  },

  deleteFavorite (id) {
    axios.delete(`http://localhost:${PORT}/managefavorites?id=${encodeURI(id)}`)
    // axios.delete(`http://localhost:8000/managefavorites?id=${encodeURI(id)}`)
      .then((res) => {
        console.log('API DELETE:', res.data);
        ServerActions.updateFavorites(parseFavorites(res.data));
      })
      .catch((err) => {
        console.error('DELETE FAVORITE:', err);
      });
  },

  sendMail(address, data) {
    console.log('address: ', address)
    axios.post('http://localhost:8000/mail',{
      to: address,
      data: data,
    })
  },

  getBusiness (id) {
    axios.get(`http://localhost:${PORT}/business?id=${id}`)
    // axios.get(`http://localhost:8000/business?id=${id}`)
      .then((res) => {
        console.log('API BUSINESS:', res.data);
        ServerActions.recieveBusiness(res.data);
      })
      .catch((err) => {
        console.error('GET BUSINESS:', err);
      });
  },

  startStream (term, count, radius) {
    axios.get(`http://localhost:${PORT}/search/live?term=${encodeURI(term)}&count=${count}&radius=${radius}`);
    // axios.get(`http://localhost:8000/search/live?term=${encodeURI(term)}&count=${count}&radius=${radius}`);
  }
};

function parseFavorites(favorites) {
  return favorites.map(favorite => {
    let obj = null;
    try{
      obj = JSON.parse(favorite.obj);
    } catch (err) {
      console.log('JSON PARSE FAVORITES ERROR: ', err);
    }
    return obj;
  });
}

export default API;
