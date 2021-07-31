const gif$ = $("#gifDisplay");
const joke$ = $("#jokeDisplay");
const favButton$ = $("#favButton");
const favList$ = $("#favoritesList");

// Checks array for contents or creates and empty array.
let jokeArray = JSON.parse(localStorage.getItem("jokes")) || [];
let currentJoke = "";

// API pull for G rated dad joke GIFs.
$.ajax({
  url: "https://api.giphy.com/v1/gifs/random?api_key=IaSI9WvRX5rWEpsJJOZEduVTQGDHxWk6&tag=chuckle&rating=g",
  type: "GET",
  success: function (results) {
    // $.data.images.original.url is the direct path to the GIF.
    gif$.attr("src", results.data.images.original.url);
  },
  error: function (error) {
    console.log(error);
  },
});

// API pull for random dad joke.
$.ajax({
  url: "https://icanhazdadjoke.com/slack",
  type: "GET",
  success: function (results) {
    // $.attachments[0].text is the direct path to the joke.
    joke$.text(results.attachments[0].text);
    currentJoke = results.attachments[0].text;
  },
  error: function (error) {
    console.log(error);
  },
});

// Dynamicly add the favorited joke to the bottom of your favorites list.
function addToFavList() {
  for (i = 0; i < jokeArray.length; i++) {
    let jokeList = jokeArray[i];
    favList$.append("<li>" + jokeList + "<li>");
  }
}

// Button to store the current joke and add it to the bottom of the favorites list.
favButton$.on("click",  function (e) {
  jokeArray.push(currentJoke);
  localStorage.setItem("jokes", JSON.stringify(jokeArray));
  addToFavList();
});
