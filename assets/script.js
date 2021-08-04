let favList = document.querySelector("ul");
let favButton = document.getElementById("favButton");
let joke = document.getElementById("jokeDisplay");
let favArray = localStorage.getItem("favs")
  ? JSON.parse(localStorage.getItem("favs"))
  : [];
let clearButton = document.getElementById("clearButton");

localStorage.setItem("favs", JSON.stringify(favArray));
const data = JSON.parse(localStorage.getItem("favs"));

const welcomeCard$ = $("#welcomeCard");
const jokeSection$ = $("#gifAndJoke");
const jokeButton$ = $("#jokeButton");
const favSection$ = $("#favorites-section");

const gif$ = $("#gifDisplay");
const joke$ = $("#jokeDisplay");

// Checks array for contents or creates and empty array.
let jokeArray = JSON.parse(localStorage.getItem("jokes")) || [];
let currentJoke = "";

function gifAPI() {
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
}

function jokeAPI() {
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
}

// Reloads the page, generates joke, toggles html sections disokay.
jokeButton$.on("click", function (e) {
  gifAPI();
  jokeAPI();
  welcomeCard$.hide();
  jokeSection$.show();
  favSection$.show();
});

function liAdd(text) {
  let li = document.createElement("li");
  li.textContent = text;
  favList.appendChild(li);
}

favButton.addEventListener("click", function (e) {
  e.preventDefault();
  favArray.push(currentJoke);
  localStorage.setItem("favs", JSON.stringify(favArray));
  liAdd(joke.textContent);
});

clearButton.addEventListener("click", function () {
  favList.innerHTML = "";
  localStorage.clear();
  while (favList.firstChild) {
    favList.removeChild(ul.firstChild);
  }
  favArray = [];
});

function favHistory() {
  for (i = 0; i < favArray.length; i++) {
    liAdd(favArray[i]);
  }
}

favHistory();
