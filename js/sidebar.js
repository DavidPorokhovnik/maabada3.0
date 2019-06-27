
const MAKERS_URL='https://phoneservice.herokuapp.com/getmakes';
const TYPES_URL = 'https://phoneservice.herokuapp.com/gettypes';
const MODELS_URL = 'https://phoneservice.herokuapp.com/getmodels';
const MODEL_URL = 'https://phoneservice.herokuapp.com/getmodel';

//let global_maker = '';
//let model_id="";

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
        data: {"make": maker}
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
    //global_maker = maker; //!?

    let output = '';
    for (let i = 0; i < typesArray.length; i++) {
        output += '<li><div id="' + typesArray[i] + '" onclick="getModels(id)">' + typesArray[i] +
            '</div><ul class="sub-submenu"></ul></li></li>';
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
        data: {"make": maker, "type": type}
    });

    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        var modelsArray = jQuery.parseJSON(response);

        if (modelsArray.length > 0) {
            createModels(modelsArray, type, maker);
        }
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " + textStatus, errorThrown
        );
    });
}

function createModels(modelsArray, type, maker) {
    let output = '';
    for (let i = 0; i < modelsArray.length; i++) {
        output += '<li><div id="' + modelsArray[i] + '-' + maker + '" onclick="getPrices(id); ' +
            '/*$(this).css({\'color\': \'#2973ad\'});*/">' + modelsArray[i] + '</div></li>';
    }
    let $this = document.getElementById(type);
    let $next = document.getElementById(type).nextElementSibling;
    $next.innerHTML = output;
    $($next).slideToggle();
    $($this).parent().toggleClass('open');
}


function getPrices(name) {

    let model = name.split('-')[0];
    let maker = name.split('-')[1];

    request = $.ajax({
        url: MODEL_URL,
        type: "Post",
        data:{"name": model, "make": maker}
    });

    request.done(function (response, textStatus, jqXHR){
        //console.log(response);
        let modelObj = jQuery.parseJSON(response);
        console.log(modelObj);
        let id = modelObj[0]._id;
        console.log(id);
        //model_id=id;
        let maker = modelObj[0].make;
        console.log(maker);
        let type = modelObj[0].type;
        console.log(type);
        let model = modelObj[0].name;
        console.log(model);
        let worksArray = modelObj[0].works;
        //console.log(worksArray);
        let pricesArray = JSON.parse(worksArray);
        if (pricesArray.length > 0) {
            /*let pricesArray = worksArray[0].works;
            console.log(pricesArray);*/
            createPrices(pricesArray, id, maker, type, model);
        }
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
            "The following error occurred: " + textStatus, errorThrown
        );
    });
}

function createPrices(pricesArray, id, maker, type, model) {
    let priceParagraphArr = document.getElementsByClassName('work-price');
    for(var i = 0; i < pricesArray.length; i++) {
        priceParagraphArr[i].id = id;
        priceParagraphArr[i].firstElementChild.innerText = pricesArray[i];
    }
    document.getElementById('dialog-paragraph').innerHTML =
        'בחר את העבודות הדרושות כדי להוסיף אותם להזמנת תיקון שלמטה';
    document.getElementById('fixing-model').innerHTML = maker + ' ' + type + ' ' + model;
}
