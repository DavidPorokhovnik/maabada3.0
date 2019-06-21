// adding works to the order form
//

$(document).ready(function(){

    $(document).on('click', '.work', function () {
        console.log(this);
        let workName = $(this).children('.work-name').text();
        console.log(workName);
        $('.work-field').append(workName);
    })

});
