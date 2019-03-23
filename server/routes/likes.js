"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const likesRoutes  = express.Router();

module.exports = function(DataHelpers) {

  likesRoutes.post("/", function(req, res) {
    if (!req.body.id) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    // const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    // const tweet = {
    //   user: user,
    //   content: {
    //     text: req.body.text
    //   },
    //   created_at: Date.now(),
    //   liked: 0
    // };

    //ASK ABOUT HOW THESE CALLBACK ERROR FUNCTIONS WORK!!!!!!!!!!!!!!
    //WHY DOES THE ONE ABOVE HAVE A REQ AND RES, AND THIS ONE ONLY AN ERR
    DataHelpers.likeTweet(req.body.id, (err, counter) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send({likes: counter});
      }
    });
  });

  return likesRoutes;

}
