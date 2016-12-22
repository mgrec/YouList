/**
 * Created by maxime on 21/12/2016.
 */

// requets get video list
$(document).ready(function () {
    $('#request-go').click( function () {
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            type: "GET",
            dataType: 'JSON',
            data: {
                'key': 'AIzaSyDdKTz8gD-xnA5y1MpuzzF_U5D8eXCO02w',
                'part': 'snippet',
                'maxResults': 20,
                'type': 'video' ,
                'q': $('#request').val()
            },
            success: function (data) {
                if (data.status == "error") {
                    alert('votre naviagteur ne supporte pas l\'AJAX')
                } else {
                    $('#list-result').empty();
                    console.log(data);
                    var items = data.items;
                    $.each(items, function (data, e) {
                       $('#list-result').append('<div class="music-item" id="item'+data+'">' +
                           '<img src="' + e.snippet.thumbnails.high.url + '" alt="">' +
                           '</div>');
                    })
                }
            }
        });
    })
});

