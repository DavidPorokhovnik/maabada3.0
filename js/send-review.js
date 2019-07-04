//

const GETALLREVIEWS_URL = 'https://phoneservice.herokuapp.com/reviewgetall';
const ADDREVIEW_URL = 'https://phoneservice.herokuapp.com/reviewadd';

$(document).ready(function () {

    function getReviews() {

        request = $.ajax({
            url: GETALLREVIEWS_URL,
            type: "Post"
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            var reviewsArray = jQuery.parseJSON(response);
            if (reviewsArray.length > 0) {
                createReviews(reviewsArray);
            }
        });
        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.log(
                "The following error occurred: " + textStatus, errorThrown
            );
        });
    }

    function createReviews(reviewsArray) {
        let output = '';
        for (let i = 0; i < reviewsArray.length; i++) {
            output += '<section><h5 class="reviews-headline">' + reviewsArray[i] + '</h5><p class="reviews-text"></p></section>';
        }
        $('#reviews-container').empty().append(output);
    }

    getReviews();

    $('#btn-send-review').click(function () {

        let name = $('#inputName')[0].value;
        let description = $('#textarea')[0].value;

        console.log(name);
        console.log(description);

        request = $.ajax({
            url: ADDREVIEW_URL,
            type: "Post",
            data: {
                "name": name,
                "description": description
            }
        });

        request.done(function (response, textStatus, jqXHR) {
            console.log(response);
            document.getElementById('review-send-response').innerHTML = 'הביקורת שלך נשלח. תודה רבה.';
            //$('#review-send-response')[0].innerHTML = 'הביקורת שלך נשלח. תודה רבה.';
            setTimeout(function() {
                document.getElementById('review-send-response').innerHTML = 'כאן ניתן להשאיר חוות דעת לגבי השירות';
                //$('#review-send-response')[0].innerHTML = 'כאן ניתן להשאיר חוות דעת לגבי השירות';
            },5000);
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(
                "The following error occurred: " + textStatus, errorThrown
            );
        });
    })
});
