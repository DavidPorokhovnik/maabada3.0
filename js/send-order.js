// adding works to the order form
// canceling an order
// sending an order to server

const ADDORDER_URL = 'https://phoneservice.herokuapp.com/orderadd';

$(document).ready(function (message){
    // number of work in the order form
    let worksCounter = 0;
    // id of model in the order
    let id = '';
    // numbers of works sending with the data params
    let worksArray = [];
    let totalCost = 0;

    $(document).on('click', '.work', function () {
        console.log($(this)); //$(this) is object
        let thisId = $(this)[0].lastElementChild.id; //children('.work-price')
        if ((id === '' || id === thisId) && $('#fixing-model')[0].innerHTML !== '') {
            id = thisId; //?
            worksCounter++;
            if (worksCounter === 1) {
                $('.order-works').children('.number').remove();
            }
            let workNumber = +($(this)[0].id);
            console.log(workNumber);
            worksArray.push(workNumber);
            console.log(worksArray);
            let workName = $(this).children('.work-name').text();
            //console.log(workName);
            let workParagraph = '<p class="work-field">'+ worksCounter + '. ' + workName + '</p>';
            $('.order-works').append(workParagraph);
            let price = $(this)[0].lastElementChild.firstElementChild.innerHTML;
            //console.log(price);
            totalCost += +(price);
            //console.log(totalCost);
            $('.total-cost')[0].innerHTML = totalCost;
            $('.total-cost-paragraph').css({display: 'block'});
        }
        //console.log($('#fixing-model')[0].innerHTML);
        if ($('#fixing-model')[0].innerHTML === '') {
            console.log($('#dialog-paragraph'));
            $('#dialog-paragraph')[0].className = 'message-paragraph';
            /*document.getElementById('dialog-paragraph')
                .setAttribute('class', 'message-paragraph');*/
            setTimeout(function() {
                $('#dialog-paragraph')[0].className = 'dialog-paragraph';
                /*document.getElementById('dialog-paragraph')
                    .setAttribute('class', 'dialog-paragraph');*/
            },3000);
        }
        if (id !== thisId && $('#fixing-model')[0].innerHTML !== '') {
            document.getElementById('dialog-paragraph')
                .setAttribute('class', 'alert-paragraph');
            document.getElementById('dialog-paragraph').innerHTML =
                'בחר את הדגם המצויין בתוך ההזמנה או בטל את ההזמנה';
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
        totalCost = 0;
        $('.total-cost-paragraph').css({display: 'none'});
    });

    $('#btn-send-order').click(function () {

        let email = $('#inputEmail')[0].value;
        let tel = $('#inputTel')[0].value;
        //let email = document.getElementById('inputEmail').value;
        //let tel = document.getElementById('inputTel').value;

        let fixingModel = document.getElementById('fixing-model').innerText;
        let maker = fixingModel.split(' ')[0];
        let type = fixingModel.split(' ')[1];
        let model = fixingModel;
        let works = JSON.stringify(worksArray); // !

        /*console.log(id);
        console.log(email);
        console.log(tel);
        console.log(maker);
        console.log(type);
        console.log(model);
        console.log(works);
        console.log(totalCost);
        alert(totalCost);*/

        request = $.ajax({
            url: ADDORDER_URL,
            type: "Post",
            data: {
                "id": id,
                "email": email,
                "phone": tel,
                "make": maker,
                "type": type,
                "model": model,
                "works": works,
                "price": totalCost
            }
        });
        
        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            worksCounter = 0;
            worksArray = [];
            id = '';
            $('.order-works').children().remove();
            let numberParagraph = '<p class="number">1. </p>';
            $('.order-works').append(numberParagraph);
            totalCost = 0;
            $('.total-cost-paragraph').css({display: 'none'});
            document.getElementById('dialog-paragraph').innerHTML = 'הזמנת התיקון שלך נשלחה. תודה, אנו ניצור קשר בהקדם.';
            //$('#dialog-paragraph')[0].innerHTML = 'הזמנת התיקון שלך נשלחה. תודה, אנו ניצור קשר בהקדם.';
            setTimeout(function() {
                document.getElementById('dialog-paragraph').innerHTML ='בחר את הדגם המבוקש מתוך הרשימה בצד ימין';
                //$('#dialog-paragraph')[0].innerHTML = 'בחר את הדגם המבוקש מתוך הרשימה בצד ימין';
            },5000);

        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.log(
                "The following error occurred: " + textStatus, errorThrown
            );
        });
    })

});
