"use strict";
const ObjectID = require("mongodb").ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the mongo database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db` (a mongo db)
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, (err, results) => {
          if (err) throw err;
          callback(null, true);
        });
    },

    // Get all tweets in `db` (a mongo db), sorted by newest first
    getTweets: function(callback) {
        db.collection("tweets").find().toArray((err, results) => {
          if (err) throw err;
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, results.sort(sortNewestFirst));
        });
    },

    // Get all tweets in `db` (a mongo db), sorted by newest first
    likeTweet: function(id, callback) {
      // let arr = db.collection("tweets").find({"_id": [id]}).then();
      db.collection("tweets").updateOne({ _id: new ObjectID(id) }, { $inc: { liked: 1 } }, (err, res) => {
        console.log('res: ', res);
        callback(err);
      });
      db.collection("tweets").findOne({_id: new ObjectID(id)}, (err, res) => {
        console.log("res: ", res.liked);
        callback(err);
      })

      // let a = db.collection("tweets").find({}, { "liked": id });
      // console.log(db.collection("tweets").find({ _id: ObjectId("5c9593bda0868a1959560825") }));



      // arr.id++;
      // console.log(arr);
      // callback(null, arr.id);

        // toArray((err, results) => {
        //   if (err) throw err;
        //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        //   callback(null, results.sort(sortNewestFirst));
        // });
    }

  };
}
