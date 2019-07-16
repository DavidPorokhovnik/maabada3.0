
const MAKERS_URL='https://phoneservice.herokuapp.com/getmakes';
const TYPES_URL = 'https://phoneservice.herokuapp.com/gettypes';
const MODELS_URL = 'https://phoneservice.herokuapp.com/getmodels';
const MODEL_URL = 'https://phoneservice.herokuapp.com/getmodel';

//let global_maker = '';
//let model_id="";
let sidebar;
let desktopSidebar;
let mobileSidebar;

$(document).ready(function(){

    getMakers();

    var isMobile = false;

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        isMobile = true;
    }

    /*$(window).resize(function () {*/

    if (($(document).width() < 991) && isMobile === true){

        sidebar = $('.mobile-accordion');
        $('.mobile-sidebar-icon').css({display: 'block'});

        $(document).on('click', '.mobile-sidebar-icon', function () {
            if ($('#mobile-sidebar-checkbox').not(':checked')) {
                $('.mobile-sidebar-container').css({display: 'block'});
            }
            if ($('#mobile-sidebar-checkbox').is(':checked')) {
                $('.mobile-sidebar-container').css({display: 'none'});
            }
        });
    }
    else {
        sidebar = $('.accordion');
    }
    /*});*/

});


function getMakers() {

    request = $.ajax({
        url: MAKERS_URL,
        type: "Post"
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
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
        output += '<li class="sidebar-item"><div class="link" id="' + makersArray[i] + '" onclick="getTypes(id)">' + makersArray[i] +
            '<i class="fa fa-chevron-down"></i></div><ul class="submenu"></ul></li>';
    }
    /*$('.accordion').empty().append(output);
    $('.mobile-accordion').empty().append(output);*/
    $(sidebar).empty().append(output);
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
    $($this).parent().toggleClass('open');
   /* $('.accordion').find('.submenu').not($next).slideUp().parent().removeClass('open');
    $('.mobile-accordion').find('.submenu').not($next).slideUp().parent().removeClass('open');*/
    $(sidebar).find('.submenu').not($next).slideUp().parent().removeClass('open');
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

    let $this = document.getElementById(name);
    /*$('.accordion').find('.active-model').not($this).removeClass('active-model');
    $('.mobile-accordion').find('.active-model').not($this).removeClass('active-model');*/
    $(sidebar).find('.active-model').not($this).removeClass('active-model');
    $($this)[0].className = 'active-model';
    //document.getElementById(name).setAttribute('class', 'active-model');

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
    console.log(document.getElementsByClassName('work-field').length);
    if (document.getElementsByClassName('work-field').length === 0) {
        document.getElementById('fixing-model').innerHTML = maker + ' ' + type + ' ' + model +' ';
    }
}
