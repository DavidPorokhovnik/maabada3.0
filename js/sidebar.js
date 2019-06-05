function showManufacturers()
{
    $.ajax({
        method: 'Post',
        url: 'https://phoneservice.herokuapp.com/getmakes',
        cache: false,
        success: function (data) {
            let dataArray = $.parseJSON(data);
            let output = '';
            for (let i = 0; i < dataArray.length; i++) {
                output += '<div class="link">' + dataArray[i] + '<i class="fa fa-chevron-down"></i></div>';
            }
            $('#manufacturers-menu').empty().append(output);
        }
    });
}

$(document).ready(function(){
    showManufacturers();
});
