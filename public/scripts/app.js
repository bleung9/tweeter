/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = data = [
    {
      "user": {
          "name": "Pikachu",
          "avatars": {
            "small":   "/images/2rIMflI.png",
            "regular": "/images/2rIMflI.png",
            "large":   "/images/2rIMflI.png"
          },
          "handle": "@ashs_pikachu"
        },
        "content": {
          "text": "Pika pika!"
        },
        "created_at": 1461116232227
      },
      {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(data) {
    let img = data.user.avatars.small;
    let handle = data.user.handle;
    let tweet = data.content.text;
    let time = data.created_at;
    let name = data.user.name;
    let $new_tweet = $("<article>").addClass("tweet");
    let template = `
            <header>
              <img src="${img}" />
              <h2>${name}</h2>
              <span class="user-handle">${handle}</span>
            </header>
            <div class="body">${tweet}</div>
            <footer>${time}</footer>`
    $($new_tweet).append(template);
    return $new_tweet;
  }

  function renderTweets(tweets) {
    for (i = 0; i < tweets.length; i++) {
      $('#tweets-container').append(createTweetElement(tweets[i]));
    }
  }
  renderTweets(data);
});