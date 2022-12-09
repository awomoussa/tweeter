/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const renderTweets = function (arr) {
    $("#tweet-section").empty() //empties tweet section (usually insert new one in dom)
    // loops through tweets
    arr.forEach((tweet) => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweet = createTweetElement(tweet);
      $("#tweet-section").prepend($tweet);
    });
  };

  const createTweetElement = function (tweet) {
    console.log(timeago.format(tweet.created_at))
    const $tweet = $(`<article class="tweet">
  <header>
    <div class="main-container">
    <div class="user">
    <div class = img-user>
      <img src="${tweet.user.avatars}" width="30" height="30">  <div class="username">${tweet.user.handle}</div>
      </div>
      <div class="name">${tweet.user.name}</div>
   </div>
    <div class="tweeted-msg">
      <div class="content">
       <div class="text">${escape(tweet.content.text)}</div>
       <div class="border"></div>
     </div>
     <div class="date-icons">
     <div class="date">${timeago.format(tweet.created_at)}</div>
     <div class="icons">
       <i class="fa-solid fa-flag"></i>
       <i class="fa-sharp fa-solid fa-retweet"></i>
       <i class="fa-solid fa-heart"></i>
     </div>
   </div>
 </div>

 <header>
  
</article>`);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);
  $("form").submit(async (event) => {
    event.preventDefault();
    const lengthOfTweet = $("#tweet-text").val().length;
    if (lengthOfTweet > 140) {
      $("#error-msg")
        .text("Exceeded number of characters allowed!")
        .slideDown();
        return 
    } else if (lengthOfTweet === 0) {
      $("#error-msg").text("Please write a tweet!").slideDown();
      return
    } 

    $.ajax('/tweets', { method: "POST", data: $("form").serialize() }).done(function () {
      // select element 
      
      $(".text-box").val("");
      // set it to empty 
      console.log('successful')
      })
      .then(() => loadTweets());
    console.log($("form").serialize());
  })

  
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      datatype: "json",
      success: (response => {
        renderTweets(response);
      })
    });
  }
   loadTweets()


  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-section').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

