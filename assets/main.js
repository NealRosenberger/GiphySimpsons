var simpson = ["Bart", "Homer", "Mr. Burns", "Lisa Simpson", "Krusty", "Comic Book Guy","Troy McClure" ];

// Creates animal buttons when the page loads 
createsimpsonButtons();


// Whenbutton with the ID of addsimpson is clicked, a new variable is saved. Trim removes excess space. Value 
// should be  pushed to the end of the simpson array and the createsimpsonButtons
// function is called to redraw the buttons. This button is a submit type is submit so things get loaded only once
$('#addsimpson').on('click', function() {
    var simpsonEntered = $('#simpsonInput').val().trim();
    simpson.push(simpsonEntered);
    $('#simpsonInput').val('');
    createsimpsonButtons();

    return false;
});

// click event is set up so elements created after the DOM has loaded and can be changed.

$(document.body).on('click', '.button-list', function() {
    // Creates a variable to push to end
    var simpsonClicked = $(this).data('simpson');
    // Creates a variable to hold the string from Giphy query.
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + simpsonClicked + '&limit=12&api_key=dc6zaTOxFJmzC';

    // Empties the element so new gifs can be loaded.
    $('#simpson').empty();


    // AJAX request .
    $.ajax({
        url: query,
        method: 'GET'
            // Performs this anonymous function when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the number of recieved results. 
        for (i = 0; i < results.length; i++) {
            // Creates a new variable and assigns 
            var newGif = $('<div class="col-sm-4">');
            // rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Creates a new variable and assigns it to HTML of the gifs rating.
            var p = $('<p>').html('Rating: ' + rating);
            // Adds the text-center.
            p.addClass('text-center');
            // Creates a new variable and assigns a img.
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
          
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(p);
            newGif.append(img);
            // Appends the newGif variable to the element with the animals ID.
            $('#simpson').append(newGif);
        }
    });
});

// When gif class is clicked, the img src link for the element that was clicked is replaced  

$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
      }
});



// This function is responsible for creating the clickable buttons of names. When the fuction is called the animalButtons
/
function createsimpsonButtons() {
    $('#simpsonButtons').empty();

    for (var i = 0; i < simpson.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-simpson', simpson[i]).html(simpson[i]);
        $('#simpsonButtons').append(button);
    }
}