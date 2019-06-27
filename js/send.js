// adding works to the order form
// canceling an order
// sending an order to server

const ADDORDER_URL = 'https://phoneservice.herokuapp.com/orderadd'

$(document).ready(function(){
    // number of work in the order form
    let worksCounter = 0;
    // id of model in the order
    let id = '';
    // numbers of works sending with the data params
    let worksArray = [];

    $(document).on('click', '.work', function () {
        console.log($(this)); //$(this) is object
        let thisId = $(this)[0].lastElementChild.id; //children('.work-price')
        if (id === '' || id === thisId) {
            id = thisId; //?
            worksCounter++;
            if (worksCounter == 1) {
                $('.order-works').children('.number').remove();
            }
            let workNumber = $(this)[0].id;
            worksArray.push(workNumber);
            console.log(worksArray);
            let workName = $(this).children('.work-name').text();
            //console.log(workName);
            let workParagraph = '<p class="work-field">'+ worksCounter + '. ' + workName + '</p>';
            $('.order-works').append(workParagraph);
        }
        else {
            //console.log("get previous model!");
            //alert("get previous model!");
            document.getElementById('dialog-paragraph')
                .setAttribute('class', 'message-paragraph');
            document.getElementById('dialog-paragraph').innerHTML =
                'בחר את המודל המצויין בתוך ההזמנה או בטל את ההזמנה';
            setTimeout(function() {
                document.getElementById('dialog-paragraph').innerHTML = '';
                document.getElementById('dialog-paragraph')
                    .setAttribute('class', 'dialog-paragraph');
            },5000);
        }
    });

    $('.btn-cancel').click(function () {
        $('.fixing-model').text(' ');
        $('.order-works').children().remove();
        let numberParagraph = '<p class="number">1. </p>';
        $('.order-works').append(numberParagraph);
        worksCounter = 0;
        worksArray = [];
        id = '';
    })

    $('#btn').click(function () {

        let email = $('#inputEmail')[0].value;
        let tel = $('#inputTel')[0].value;
        //let email = document.getElementById('inputEmail').value;
        //let tel = document.getElementById('inputTel').value;

        console.log(email);
        console.log(tel);
        console.log(id);
        console.log(worksArray);

        request = $.ajax({
            url: ADDORDER_URL,
            type: "Post",
            data: {
                "email": email,
                "phone": tel,
                "id": id,
                "works": worksArray
            }
        });
        
        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            //let respArray = jQuery.parseJSON(response);
            //console.log(respArray);
            //let resp = response[msg];
            /*if (response[msg] === 'OK') {
                alert('be happy!');
                worksArray = [];
                id = '';
            }*/
            worksCounter = 0;
            worksArray = [];
            id = '';
            $('.order-works').children().remove();
            let numberParagraph = '<p class="number">1. </p>';
            $('.order-works').append(numberParagraph);
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(
                "The following error occurred: " + textStatus, errorThrown
            );
        });
    })

});
