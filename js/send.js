// adding works to the order form
//

$(document).ready(function(){

    let worksCounter = 0;

    $(document).on('click', '.work', function () {
        worksCounter++;
        if (worksCounter == 1) {
            $('.order-works').children('.number').remove();
        }
        //console.log(this);
        let workName = $(this).children('.work-name').text();
        //console.log(workName);
        let workParagraph = '<p class="work-field">'+ worksCounter + '. ' + workName + '</p>';
        $('.order-works').append(workParagraph);
    })

    $('.btn-cancel').click(function () {
        $('.order-works').children().remove();
        let numberParagraph = '<p class="number">1. </p>';
        $('.order-works').append(numberParagraph);
        worksCounter = 0;
    })

    /*function orderCancel() {
        $('.order-works').children.remove();
        let numberParagraph = '<p class="number">1. </p>';
        $('.order-works').append(numberParagraph);
    }*/

});
