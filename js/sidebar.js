//var global_make="";

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
        output += '<li><div class="link" id="maker-' + makersArray[i] + '" onclick="getTypes(id)">' + makersArray[i] +
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


function mHover(id) {
    //alert(id);
    //var itemId = id.split("-")[1];
    let div = document.getElementById(id);
    let divTtl = div.getElementsByClassName("item_ttl")[0];
    divTtl.style.textShadow="gray 1px 1px";
    divTtl.style.backgroundColor="rgb(17,214,255)";
    // divTtl.style.fontWeight="bold";
    // divImg.style.transform = "rotate(7deg)"
}

function mUnHover(id) {
    //var itemId = id.split("-")[1];
    let div=document.getElementById(id);
    let divTtl=div.getElementsByClassName("item_ttl")[0];
    divTtl.style.textShadow="";
    divTtl.style.backgroundColor="aquamarine";
}
