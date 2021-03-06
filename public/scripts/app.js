/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

//prevent XSS by an escape function.  provided by LHL.
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

//create a tweet in HTML format by auto-generating an avatar (img), handle, name for an entered tweet
//apply escape function to prevent XSS
  function createTweetElement(data) {
    let tweet = data.content.text;
    let img = data.user.avatars.small;
    let handle = data.user.handle;
    let time = new Date(Number(data.created_at));
    let name = data.user.name;
    let $new_tweet = $("<article>").addClass("tweet");
    $new_tweet.data("tweet-id", data._id);
    let template = `
            <header>
              <img src="${escape(img)}" />
              <h2>${escape(name)}</h2>
              <span class="user-handle">${escape(handle)}</span>
            </header>
            <div class="body">${escape(tweet)}</div>
            <footer>${escape(time)} <i class="far fa-heart" id="like"></i> ${data.liked}</footer>`
    $($new_tweet).append(template);
    return $new_tweet;
  }

//render tweets by going through the database and prepending tweets to the #tweets-container
//most recently posted tweet appears at the top
  function renderTweets(data) {
    $("#tweets-container").empty();
    for (i = 0; i < data.length; i++) {
      $('#tweets-container').prepend(createTweetElement(data[i]));
    }
  }

//load tweets upon a GET request to /tweets, calls renderTweets.
// include a function to allow liking of tweets and refresh like counter w/o refreshing the page
  function loadTweets() {
    return $.get("/tweets", function(data) {
      renderTweets(data);
      $(".far").click(function(event) {
        let id = $(this).parent().parent().data("tweet-id");
        $.post("/likes", { id: id }).then( (counter) => {
          let curHTML = $(this).parent().html().substring(0, 97);
          $(this).parent().html(curHTML + String(counter.likes));
        });
      });
    });
  }

//#new-form jQuery function.  Validates tweets (>140 or 0 char).  If valid tweet, issues POST request
//which saves the tweet (along w/ some autogenerated paramaters) into mongoDB database; followed by .then
// which calls loadTweets() and clears the input form.  loadTweets() refreshes the page
// w/o the user having to refresh (I could also use .load() in jQuery)
  $("#new-form").submit(function(event) {
    event.preventDefault();
    $(".new-tweet .counter").text("140");
    let tweet = $(this).serialize();
    let tweet_length = $(this).find("textarea").val().length;
    if (tweet_length === 0) {
      $(".new-tweet .error-msg").text("Please enter a tweet :( Don't leave me empty!");
      return;
    }
    else if (tweet_length > 140) {
      $(".new-tweet .error-msg").text("You are over the character limit :( ");
      return;
    }
    else {
      $(".new-tweet .error-msg").text("");
      $.post("/tweets", tweet).then(() => {
        loadTweets();
        $(this).find("textarea").val("");
      });
    }
  });

//toggle the compose tweet button.  default => invisible
  $("#nav-bar button").click(function(event) {
    $(".new-tweet").slideToggle(80);
    $("textarea").focus();
  });

  loadTweets();

});