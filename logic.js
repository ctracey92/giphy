//Starting Gifs array
var topics = ["Avengers","Spider-Man","Batman","Superman", "Doctor Strange", "Green Lantern", "Wonder Woman"];

//Function that displays the Gifs
function displayGifs (){
    //Emptys the gifs div before anything
    $("#gifs-view").empty();

    //Defines the gif variable as the data-name value of the button pushed
    var gifs = $(this).attr("data-name");

    //Sets the variable for the query URL based on user input
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=cV9VuIm8aO4h04UWMKe0F2FUNMNPorMs&q=" + gifs + "&limit=10&offset=0&rating=pg-13&lang=e";


    //Makes the AJAX request
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    //Then...
    .then(function(response){
        //Console.log the response so we can see it to better code
        console.log(response);

        //Set teh results variable to the reponse data to pull from
        var results = response.data;

        //Runs a for loop to gather the gifs into a DIV and prepend it on a page
        for (var i =0; i <results.length; i++){
            var gifDiv = $("<div>");

            //Sets the rating var equal to the gif rating
            var rating = results[i].rating;

            //Displays the rating variable
            var p = $("<p>").text("Rating: " + rating); 

            //Sets the gifImage equal to an image using jquery
            var gifImage = $("<img>");
            
            //Assigns the attributes,classes,id's,and urls to each gifImage
            gifImage.attr("src" , results[i].images.fixed_height_still.url);
            gifImage.attr("data-still" , results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate" , results[i].images.fixed_height.url);
            gifImage.attr("data-state" , "still");
            gifImage.attr( "id" , "gifImages");

            //Prepends the text and gif to the div
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);
            
            //Displays the div on the page
            $("#gifs-view").prepend(gifDiv);
        }
    })
};

//Render buttons function that will display them on the page
function renderButtons(){

    //Emptys the button div before running the function so that they arent duplicated
    $("#buttons-view").empty();   

   //Clears the Search bar 
    $("#gifs-input").val("");

    //Runs a for loop that created the buttons and assigns them values/class/text and such
    for (var i = 0; i < topics.length; i++){
        var gifButtons = $("<button>");
        gifButtons.addClass("btn btn-primary")
        gifButtons.addClass("gifs");
        gifButtons.attr("data-name", topics[i]);
        gifButtons.text(topics[i]);
        $("#buttons-view").append(gifButtons);
    }
};

function clicker () {
    var state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else{
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
 };

$(document).on("click", "#gifImages", clicker);

//On click of the add-gifs function adds another button
$("#add-gifs").click("on", function (event){
    event.preventDefault();

    var gif = $("#gifs-input").val().trim();

    topics.push(gif);

    renderButtons();  
});

//On click of the gif buttons displays the gifs by running the function.
$(document).on("click", ".gifs", displayGifs);

renderButtons();
