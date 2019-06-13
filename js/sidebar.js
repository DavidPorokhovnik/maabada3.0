
const MAKERS_URL='https://phoneservice.herokuapp.com/getmakes';
const TYPES_URL = 'https://phoneservice.herokuapp.com/gettypes';

$(document).ready(function(){

    getMakers();

});

function getMakers() {

    request = $.ajax({
        url: MAKERS_URL,
        type: "Post"
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        // console.log("resp: " + response);
        // console.log("textStatus: " + textStatus);
        console.log(response);
        var makersArray = jQuery.parseJSON(response);
        if (makersArray.length > 0) {
            createMakers(makersArray);
        }
    });
    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
    });
}


function createMakers(makersArray) {
    let output = '';
    for (let i = 0; i < makersArray.length; i++) {
        output += '<li><div class="link" id="' + makersArray[i] + '" onclick="getTypes(id)">' + makersArray[i] +
            '<i class="fa fa-chevron-down"></i></div><ul class="submenu"></ul></li>';
    }
    $('#accordion').empty().append(output);
}

function getTypes(maker) {

    request = $.ajax({
        url: TYPES_URL,
        type: "Post",
        data: {"make" : maker}
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        var typesArray = jQuery.parseJSON(response);
        if (typesArray.length > 0) {
            createTypes(typesArray, maker);
        }
    });
    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
    });
}

function createTypes(typesArray, maker) {
    let output = '';
    for (let i = 0; i < typesArray.length; i++) {
        output += '<li><a href="#">' + typesArray[i] + '</a></li>';
    }
    let $this = document.getElementById(maker);
    let $next = document.getElementById(maker).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    $($this).parent().toggleClass('open');
}
