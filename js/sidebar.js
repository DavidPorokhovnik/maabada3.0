
const MAKERS_URL='https://phoneservice.herokuapp.com/getmakes';
const TYPES_URL = 'https://phoneservice.herokuapp.com/gettypes';
const MODELS_URL = 'https://phoneservice.herokuapp.com/getmodels';

let global_maker = '';

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
    global_maker = maker; //!?

    let output = '';
    for (let i = 0; i < typesArray.length; i++) {
        output += '<li><div id="' + typesArray[i] + '" onclick="getModels(id)">' + typesArray[i] +
            '</div><ul class="submenu"></ul></li></li>';
    }
    let $this = document.getElementById(maker);
    let $next = document.getElementById(maker).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    $($this).parent().toggleClass('open');
}


function getModels(type) {

    request = $.ajax({
        url: MODELS_URL,
        type: "Post",
        data: {"make" : global_maker, "type": type}
    });

    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        var modelsArray = jQuery.parseJSON(response);

        if (modelsArray.length > 0) {
            createModels(modelsArray, type);
        }
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
    });
}

function createModels(modelsArray, type) {
    let output = '';
    for (let i = 0; i < modelsArray.length; i++) {
        output += '<li><div id="' + modelsArray[i] + '">' + modelsArray[i] + '</div></li>';
    }
    let $this = document.getElementById(type);
    let $next = document.getElementById(type).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    $($this).parent().toggleClass('open');
}
