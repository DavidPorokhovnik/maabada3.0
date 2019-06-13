var global_maker="";

$(document).ready(function(){
    /*divRowProgress = document.createElement('div');
    divRowProgress.className="row";
    divRowProgress.id="divRowProgress";
    divRowProgress.innerHTML ="<p>Download...</p>";
    document.body.style.overflow = 'hidden';
    container.appendChild(divRowProgress);*/

    getMakers();
});

function getMakers() {

    const url='https://phoneservice.herokuapp.com/getmakes';

    request = $.ajax({
        url: url,
        type: "post",
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        // console.log("resp: "+response);
        // console.log("textStatus: "+textStatus);
        console.log(response);
        var makersArray = jQuery.parseJSON(response);
        /*divRowProgress.innerHTML ="<p>There are no orders, but they will be soon.</p>";
        divRowProgress.remove();*/

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
    /*for(var i = 0; i < makersArray.length; i++) {
        var maker = makersArray[i];
        var div = document.createElement('div');
        div.className = "row";
        div.innerHTML = "" + "<div id=\"maker-" + maker + "\" class=\"col-12\" onclick=\"getTypes(id)\" " +
            "onmouseover='mHover(id)' onmouseout='mUnHover(id)'>\n" + "<p class=\"item_ttl\">" + maker + "</p>\n" + "";
        container.appendChild(div);
    }*/
}

function getTypes(maker) {
    /*container2.innerHTML="";
    container3.innerHTML="";*/

    //var maker = id.split("-")[1];
    global_maker = maker;
    //console.log(global_maker);
    const url='https://phoneservice.herokuapp.com/gettypes';

    request = $.ajax({
        url: url,
        type: "post",
        data: {"make" : global_maker}
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        var typesArray = jQuery.parseJSON(response);
        /*divRowProgress.innerHTML ="<p>There are no orders, but they will be soon.</p>";
        divRowProgress.remove();*/

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
    document.getElementById(maker).nextElementSibling.innerHTML = output;
    /*for (var i=0; i < typesArray.length; i++) {
        var type = typesArray[i];
        var div = document.createElement('div');
        div.className="row";
        div.innerHTML = "" + "<div id=\"type-" + type + "\" class=\"col-12\" onclick=\"getModels(id)\" " +
            "onmouseover='mHover(id)' onmouseout='mUnHover(id)'>\n" + "<p class=\"item_ttl\">" + type+"</p>\n" + "";
        container2.appendChild(div);
    }*/
}
