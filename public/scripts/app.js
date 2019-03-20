/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
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
}

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


$(document).ready(function() {
  var $tweet = createTweetElement(tweetData);


  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});