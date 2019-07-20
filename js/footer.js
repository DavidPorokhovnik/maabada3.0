$(document).ready(function () {

    $('.footer-powered').click(function () {
        if ( $(document).width() > 575 ) {
            $(this).fadeOut('slow');
            $('.footer-powered-front').slideDown('slow');
            $('.footer-powered-back').slideDown('slow');
            setTimeout(function () {
                $('.footer-powered-front').slideUp('slow');
                $('.footer-powered-back').slideUp('slow');
                $('.footer-powered').fadeIn('slow');
            }, 6000);
        }
        else{
            $(this).hide();
            $('.footer-powered-front').show();
            $('.footer-powered-back').show();
            setTimeout(function () {
                $('.footer-powered-front').hide();
                $('.footer-powered-back').hide();
                $('.footer-powered').show();
            }, 6000);
        }
    })
});
