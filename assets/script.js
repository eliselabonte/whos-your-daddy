const gif$ = $("#gif");
const joke$ = $("#joke");

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
  },
  error: function (error) {
    console.log(error);
  },
});
