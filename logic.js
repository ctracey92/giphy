var topics = ["Avengers","Spider-Man","Batman","Superman"]

function displayGifs (){
    var gifs = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=cV9VuIm8aO4h04UWMKe0F2FUNMNPorMs&q=" + gifs + "&limit=10&offset=0&rating=G&lang=e";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
    })
}
