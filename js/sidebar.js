
const MAKERS_URL='https://phoneservice.herokuapp.com/getmakes';
const TYPES_URL = 'https://phoneservice.herokuapp.com/gettypes';
const MODELS_URL = 'https://phoneservice.herokuapp.com/getmodels';
const MODEL_URL = 'https://phoneservice.herokuapp.com/getmodel';

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
            "The following error occurred: " + textStatus, errorThrown
        );
    });
}

function createMakers(makersArray) {
    let output = '';
    for (let i = 0; i < makersArray.length; i++) {
        //let maker = makersArray[i].charAt(0).toUpperCase() + makersArray[i].slice(1);
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
            "The following error occurred: " + textStatus, errorThrown
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
    console.log(output);
    let $this = document.getElementById(maker);
    let $next = document.getElementById(maker).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    /*if ($.find('.open')) {

    }*/
    $($this).parent().toggleClass('open');
}


function getModels(type) {
    let makerNode = document.getElementById(type).parentElement.parentElement.previousSibling.textContent;
    let maker = makerNode.split('<')[0];
    console.log(maker);
    request = $.ajax({
        url: MODELS_URL,
        type: "Post",
        data: {"make" : maker, "type": type}
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
            "The following error occurred: " + textStatus, errorThrown
        );
    });
}

function createModels(modelsArray, type) {
    let output = '';
    for (let i = 0; i < modelsArray.length; i++) {
        output += '<li><div id="' + modelsArray[i] + '" onclick="getPrices(id)">' + modelsArray[i] + '</div></li>';
    }
    let $this = document.getElementById(type);
    let $next = document.getElementById(type).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    $($this).parent().toggleClass('open');
}


function getPrices(name) {

    request = $.ajax({
        url: MODEL_URL,
        type: "Post",
        data:{"name" : name, "make": global_maker}
    });

    request.done(function (response, textStatus, jqXHR){
        console.log(response);
        let modelObj = jQuery.parseJSON(response);
        console.log(modelObj);
        let worksArray = modelObj[0].works;
        console.log(worksArray);
        let pricesArray = JSON.parse(worksArray);
        if (pricesArray.length > 0) {
            /*let pricesArray = worksArray[0].works;
            console.log(pricesArray);*/
            createPrices(pricesArray);
        }
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " + textStatus, errorThrown
        );
    });
}

function createPrices(pricesArray) {
    for(var i = 0; i < pricesArray.length; i++) {
        document.getElementsByClassName('work-price')[i].firstElementChild.innerText = pricesArray[i];
    }
}
