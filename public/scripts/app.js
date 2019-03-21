/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(data) {
    let tweet = data.content.text;
    let img = data.user.avatars.small;
    let handle = data.user.handle;
    let time = data.created_at;
    let name = data.user.name;
    let $new_tweet = $("<article>").addClass("tweet");
    let template = `
            <header>
              <img src="${escape(img)}" />
              <h2>${escape(name)}</h2>
              <span class="user-handle">${escape(handle)}</span>
            </header>
            <div class="body">${escape(tweet)}</div>
            <footer>${escape(time)}</footer>`
    $($new_tweet).append(template);
    return $new_tweet;
  }

  function renderTweets(data) {
    $("#tweets-container").empty();
    for (i = 0; i < data.length; i++) {
      $('#tweets-container').prepend(createTweetElement(data[i]));
    }
  }

  function loadTweets() {
    return $.get("/tweets", function(data) {
      renderTweets(data);
    });
  }

  $("#new-form").submit(function(event) {
    event.preventDefault();
    $(".new-tweet .counter").text("140");
    let tweet = $(this).serialize();
    let tweet_length = $(this).find("textarea").val().length;
    if (tweet_length === 0) {
      $(".new-tweet .error-msg").text("YOU DIDN'T ENTER ANYTHING, ARE YOU BLIND?!!");
      return;
    }
    else if (tweet_length > 140) {
      $(".new-tweet .error-msg").text("THE COUNTER IS THERE, ARE YOU BLIND?!!!");
      return;
    }
    $(".new-tweet .error-msg").text("");
    $.post("/tweets", tweet).then(() => {
      loadTweets();
      $(this).find("textarea").val("");
    });
  });

  loadTweets();

});