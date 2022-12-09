$(document).ready(function() {
  // --- our code goes here --- 
  // 1. first step: implement jQuery by grabbing text area value
// display to my console, all the letters coming from that text area 
  $("#tweet-text").on("input", function () {
   
// 2. how do I get the numbers from those values 
//use the .length method 

    let tweetChar = $(this).val().length;
  //3. the calculation
// if 140 is default and we want to substract that number based on numbers in the field
// 1. grab that element 
// 2. jquery method that changes the text 
// 3. value of textbox - 140 = changes 

    let charactersLeft = 140 - tweetChar;
    // console.log($(this).val().length)
    // console.log($(this).parent());
    let $counter = $(this)
      .parent()
      .children(".under-border")
      .children(".counter"); 
    $counter.text(charactersLeft); 
    if (charactersLeft < 0) {
      $counter.css("color", "red");
      return;
    }
    $counter.css("color", "black");
  });
});



