const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const squel = require('squel').useFlavour('mysql');
const connection = require('../config/db');
const tablename = 'favorites';

connection.query(`CREATE TABLE IF NOT EXISTS favorites (
  id INT NOT NULL AUTO_INCREMENT,
  obj VARCHAR(16000),
  uuid VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)`, (err) => {
  // if (err) throw err;
  if (err) console.log('error');;
});

const filename = path.join(__dirname, '../data/favorites.json');

exports.get = function (callback) {
  let get = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, favorites) => {
      if (err) return reject(err);
      resolve(favorites);
    });
  });

  get.then((favorites) => callback(null, favorites))
     .catch((err) => callback(err));
};

exports.post = function (callback, newFavorite) {
  let post = new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename)
      .setFields({
        obj: JSON.stringify(newFavorite),
        uuid: newFavorite.id
      })
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  post.then((result) => exports.get(callback))
      .catch((err) => callback(err));
};

exports.delete = function (callback, id) {
  let del = new Promise((resolve, reject) => {
    let sql = squel.delete()
      .from(tablename)
      .where(`uuid = '${id}'`)
      .limit(1)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  del.then((result) => exports.get(callback))
      .catch((err) => callback(err));

};
