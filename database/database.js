var mysql = require('mysql');
var tables = require('./tables.js');
var db_config = require('../server/utilities').dbConfig;
var async = require('async');
var _ = require('underscore');

var createConnection = function createConnection() {
    connection = mysql.createConnection(db_config);

    connection.connect(function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
        }
    });

    connection.on('error',function(err){
        console.error(err);
        createConnection();
    });
};

createConnection();

tables.create();

module.exports = {
  findUser: function (email, callback) {
    var sql = 'SELECT * FROM Users WHERE email = ?;'
    var values = email;

    connection.query(sql, values, function (err, data) {
      if (err) {
        console.error("error in db findUser: ", err);
      }
      callback(data);
    });
  },

  addUser: function (email, username, password, city, callback) {
    var sql = 'INSERT into Users (email, username, password, city) values(?, ?, ?, ?);';
    var values = [email, username, password, city];

    connection.query(sql, values, function(err){
      if(err) {
        console.error('error in db addUser: ', err);
      }
    });

    connection.query('SELECT id FROM Users WHERE email = ?;', email, function(err, data) {
      if(err) {
        console.error("error in db addUser: ", err);
      }
      callback(data);
    });
  },

  addUserProfile: function (userid, phone, street, city, state, zip, geoloc, profilepic) {
    var sql = "UPDATE Users SET phone = ?, street = ?, city = ?, state = ?, zip = ?, geoloc = ?, profilepic = ? WHERE id = '" + userid + "';"
    var values = [phone, street, city, state, zip, geoloc, profilepic];

    connection.query(sql, values, function(err){
      if (err) {
        console.error('error in db addUserProfile: ', err);
      }
    });
  },

  addGame: function (title, platform, rating, description, thumbnail, gbid, callback) {
    var check = 'SELECT * FROM Games WHERE gbid = ?;'
    var checkValues = gbid;
    var insert = 'INSERT IGNORE into Games (title, platform, rating, description, thumbnail, gbid) values(?, ?, ?, ?, ?, ?);';
    var insertValues = [title, platform, rating, description, thumbnail, gbid];

    connection.query(check, checkValues, function(err, data) {
      if (err) {
        console.error('error 1 in db addGame: ', err);
        callback(false);
      }

      if (data.length === 0) {
        connection.query(insert, insertValues, function(err, insertedData) {
          if (err)  {
            console.error('error 2 in db addGame: ', err);
            callback(false);
          } else {
            console.log("+++ 86 database.js FIRST TIME INSERT INTO DB's BUTT")
            callback(true);
          }
        });
      } else {
        console.log("+++ 91 database.js ALREADY IN DB BUTT")
        callback(true);
      }
    });
  },

  addOffering: function (userid, title, platform, condition, gbid, callback) {
    var insert = 'INSERT into Offering (userid, game_condition, gameid) values(?, ?, ?);';
    var insertValues = [userid, condition, gbid];

    connection.query(insert, insertValues, function(err, data) {
      if (err) {
        console.error('error 2 in db addOffering: ', err);
        callback(false); //send back 406
      } else {
        callback(true); //send back 201
      }
    });
  },

  addSeeking: function (userid, title, platform, gbid, callback) {
    var insert = 'INSERT into Seeking (userid, gameid) values( ?, ?);';
    var insertValues = [userid, gbid];

    connection.query(insert, insertValues, function(err, data) {
      if (err) {
        console.error('error 2 in db addSeeking: ', err);
        callback(false); //send back 406
      } else {
        callback(true); //send back 201
      }
    });
  },

  searchOffering: function (title, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.game_condition, Offering.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Offering, Users WHERE Games.title = '" + title + "' AND Games.id = Offering.gameid AND Offering.userid = Users.id;";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db searchOffering: ', err);
      }
      callback(data);
    })
  },

  searchSeeking: function (title, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat, Users.username, Users.id, Users.city, Users.state, Users.zip, Users.geoloc FROM Games, Seeking, Users WHERE Games.title = '" + title + "' AND Games.id = Seeking.gameid AND Seeking.userid = Users.id;";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db searchSeeking: ', err);
      }
      callback(data);
    });
  },

  allOfferingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Offering.createdat FROM Games, Offering WHERE Games.id = Offering.gameid AND Offering.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db allSeeking: ', err);
      }
      callback(data);
    });
  },

  allSeekingByUser: function (userid, callback) {
    var sql = "SELECT Games.title, Games.rating, Games.description, Games.platform, Games.thumbnail, Seeking.createdat FROM Games, Seeking WHERE Games.id = Seeking.gameid AND Seeking.userid = '" + userid + "';";

    connection.query(sql, function (err, data) {
      if (err) {
        console.error('error in db allSeeking: ', err);
      }
      callback(data);
    });
  },

  addMessage: function (useridfrom, useridto, text) {
    var sql = "INSERT into Messages (userto, userfrom, message) values (?, ?, ?);";
    var values = [useridto, useridfrom, text];

    connection.query(sql, values, function (err) {
      if (err) {
        console.error('error in db addMessage: ', err);
      }
    });
  },

  allMessages: function (userid, callback) {
    var sql = "SELECT Messages.message, Messages.createdat, Users.username, Users.id, Users.email FROM Users, Messages WHERE Messages.userto = ? AND Messages.userfrom = Users.id;";

    connection.query(sql, userid, function (err, data) {
      if (err) console.error('error in db allMessages: ', err);
      callback(data);
    });
  },

  allOfferings: function(callback) {
    var sql = "SELECT Games.* from Games, Offering WHERE Games.id = Offering.gameid;";
    connection.query(sql, function(err, games) {
      if (err) console.log('errror in db allOfferingsByGame: ', err);
      async.map(games, function(game, callback){
        var sql = "SELECT Users.username, Users.id FROM Offering, Users WHERE Users.id = Offering.userid AND Offering.gameid = ?;";
        var values = game.id;
        connection.query(sql, values, function(err, users) {
          if (err) console.log('errror in db allOfferingsByGame: ', err);
          game.users = users;
          callback(err, game)
        });
      }, function(err, results) {
        callback(results)
      });
    });
  },

  allOfferingsByGame: function(gameid, callback) {
    var sql = "SELECT Users.username FROM Offering, Users WHERE Users.id = Offering.userid AND Offering.gameid = ?;";
    var values = gameid;

    connection.query(sql, values, function(err, data) {
      if (err) console.log('errror in db allOfferingsByGame: ', err);
      callback(data);
    });
  }

}
