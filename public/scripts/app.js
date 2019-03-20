/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function createTweetElement(data) {
    let tweet = data.content.text;
    let img = data.user.avatars.small;
    let handle = data.user.handle;
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

  function renderTweets(data) {
    for (i = 0; i < data.length; i++) {
      $('#tweets-container').prepend(createTweetElement(data[i]));
    }
  }

  function loadTweets() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  }

  $("#new-form").submit(function(event) {
    event.preventDefault();
    let tweet = $(this).serialize();
    let tweet_length = $(this).find("textarea").val().length;
    if (tweet_length === 0) {
      alert("YOU DIDN'T ENTER ANYTHING (though I didn't check to see if you entered a bunch of newlines ;)");
      return;
    }
    else if (tweet_length > 140) {
      alert("YOUR TWEET IS TOO LONG!!!!!!!")
      return;
    }
    $.post("/tweets", tweet);
  });

  loadTweets();

});