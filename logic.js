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
        var results = response.data;

        for (var i =0; i <results.length; i++){
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");

            gifImage.attr("src" , results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs-view").prepend(gifDiv);
        }


    })
}

function renderButtons(){

    $("#buttons-view").empty();   


    for (var i = 0; i < topics.length; i++){
        var gifButtons = $("<button>");
        gifButtons.addClass("gifs");
        gifButtons.attr("data-name", topics[i]);
        gifButtons.text(topics[i]);
        $("#buttons-view").append(gifButtons);
    }
}

$("#add-gifs").on("click", function (event){
    event.preventDefault();

    var gif = $("#gifs-input").val().trim();

    topics.push(gif);

    renderButtons();
})

$(document).on("click", ".gifs", displayGifs);

renderButtons();