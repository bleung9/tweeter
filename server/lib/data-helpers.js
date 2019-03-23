"use strict";
const ObjectID = require("mongodb").ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the mongo database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db` (a mongodb)
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, (err, results) => {
          if (err) throw err;
          callback(null, true);
        });
    },

    // Get all tweets in `db` (a mongodb), sorted by newest first
    getTweets: function(callback) {
        db.collection("tweets").find().toArray((err, results) => {
          if (err) throw err;
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, results.sort(sortNewestFirst));
        });
    },

    // like a tweet in mongodb
    likeTweet: function(id, callback) {
      db.collection("tweets").updateOne({ _id: new ObjectID(id) }, { $inc: { liked: 1 } }, (err, res) => {
        console.log('res: ', res);
        db.collection("tweets").findOne({_id: new ObjectID(id)}, (err, res) => {
          console.log("res: ", res.liked);
          callback(err, res.liked);
        })
      });
    }
  };
}
