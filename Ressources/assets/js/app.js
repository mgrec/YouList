/**
 * Created by maxime on 21/12/2016.
 */

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: /*'M7lc1UVf-VE'*/ playlist[countPlaylist],
        events: {
            'onReady': onPlayerReady
        }
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
    event.target.stopVideo();
}

$(document).ready(function () {

    id = [];
    playlist = [];
    countPlaylist = 0;
    musicEtant = 1;
    countList = 0;
    speedOrpass = 0;

    $('#request-go').click(function () {
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            type: "GET",
            dataType: 'JSON',
            data: {
                'key': 'AIzaSyDdKTz8gD-xnA5y1MpuzzF_U5D8eXCO02w',
                'part': 'snippet',
                'maxResults': 30,
                'type': 'video',
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
                        $('#list-result').append('<div class="music-item" id="item' + data + '">' +
                            '<img src="' + e.snippet.thumbnails.high.url + '" alt="">' +
                            '<h3 id="music-tiem-title' + e.id.videoId + '">' + e.snippet.title + ' </h3>' +
                            '<button id="' + e.id.videoId + '" class="button-playliste">Ajouter à la playlist</button>' +
                            '</div>' +
                            '<div id="AA' + e.id.videoId + '" class="hidden-title">' + e.snippet.title + '</div>');

                        id.push("#music-tiem-title" + e.id.videoId);
                    })
                }
                $(id).each(function (i) {
                    var text = $(id[i]);
                    text.text(text.text().substring(0, 27) + ' ...')
                });
            }
        });
    });

    $('#request').keypress(function (e) {
        if (e.which == 13) {
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search',
                type: "GET",
                dataType: 'JSON',
                data: {
                    'key': 'AIzaSyDdKTz8gD-xnA5y1MpuzzF_U5D8eXCO02w',
                    'part': 'snippet',
                    'maxResults': 30,
                    'type': 'video',
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
                            $('#list-result').append('<div class="music-item" id="item' + data + '">' +
                                '<img src="' + e.snippet.thumbnails.high.url + '" alt="">' +
                                '<h3 id="music-tiem-title' + e.id.videoId + '">' + e.snippet.title + ' </h3>' +
                                '<button id="' + e.id.videoId + '" class="button-playliste">Ajouter à la playlist</button>' +
                                '</div>' +
                                '<div id="AA' + e.id.videoId + '" class="hidden-title">' + e.snippet.title + '</div>');

                            id.push("#music-tiem-title" + e.id.videoId);
                        })
                    }
                    $(id).each(function (i) {
                        var text = $(id[i]);
                        text.text(text.text().substring(0, 27) + ' ...')
                    });
                }
            });
        }
    });

});


$('#list-result').on('click', '.button-playliste', function () {
    console.log(countList);
    var idPlay = $(this).attr('id');
    var id = '#AA' + idPlay;
    title = $(id).text();
    $('.track-list-content').append('<p class="list-item-track" id="play' + countList + idPlay + '" >' + title + '</p>');
    playlist.push(idPlay);
    countList = countList + 1;
    console.log(playlist);

    $.ajax({
        url: 'http://localhost:8000/add-playlist-item',
        type: "POST",
        dataType: 'JSON',
        data: {
            'id_playlist': $('#idlist').text(),
            'idVid': idPlay,
            'title': title
        },
        success: function (data) {
            if (data.status == "error") {
                alert('votre naviagteur ne supporte pas l\'AJAX')
            } else {

            }

        }
    });
});

$('#play').click(function () {
    if (playlist.length != 0) {
        console.log('countPlaylist' + countPlaylist);
        console.log('countList' + countList);

        if (musicEtant == 1) {
            var id = '#play' + countPlaylist + playlist[countPlaylist];
            $(id).css('color', 'red');
            $(id).css('font-weight', 'bold');
            $('#track-bar-title').text($(id).text());
            console.log(id);

            player.loadVideoById({
                'videoId': playlist[countPlaylist],
                'suggestedQuality': 'large'
            });

            setInterval(function () {


                $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

                if (player.getCurrentTime() >= player.getDuration() && player.getDuration() != 0) {

                    countPlaylist = countPlaylist + 1;

                    player.loadVideoById({
                        'videoId': playlist[countPlaylist],
                        'suggestedQuality': 'large'
                    });
                    player.playVideo();
                    var id = '#play' + countPlaylist + playlist[countPlaylist];
                    $('.list-item-track').css('color', 'black');
                    $('.list-item-track').css('font-weight', '400');
                    $('#track-bar-title').text($(id).text());
                    $(id).css('color', 'red');
                    $(id).css('font-weight', 'bold');
                }

                currentValeur = player.getCurrentTime();
                valMax = player.getDuration();

                currentValeurReal = (player.getCurrentTime() * 100) / valMax;

                $('.progress-bar').css('width', currentValeurReal + '%').attr('aria-valuenow', currentValeurReal);
            }, 100);

            $(this).css('display', 'none');
            $('#pause').css('display', 'block');
        } else {
            $(this).css('display', 'none');
            $('#pause').css('display', 'block');
            player.seekTo(player.getCurrentTime());
            player.playVideo();
            musicEtant = 1;
        }

        $.ajax({
            url: 'http://localhost:8000/change-playlist-status',
            type: "POST",
            dataType: 'JSON',
            data: {
                'id_playlist': $('#idlist').text(),
                'status': musicEtant
            },
            success: function (data) {
                if (data.status == "error") {
                    alert('votre naviagteur ne supporte pas l\'AJAX')
                } else {

                }
            }
        });
    }

});

$('#pause').click(function () {
    musicEtant = 0;
    $('#play').css('display', 'block');
    $(this).css('display', 'none');
    player.pauseVideo();
    console.log('pause at ' + player.getCurrentTime());

    $.ajax({
        url: 'http://localhost:8000/change-playlist-status',
        type: "POST",
        dataType: 'JSON',
        data: {
            'id_playlist': $('#idlist').text(),
            'status': musicEtant
        },
        success: function (data) {
            if (data.status == "error") {
                alert('votre naviagteur ne supporte pas l\'AJAX')
            } else {

            }
        }
    });
});

$('#back').click(function () {

    console.log('countPlaylist' + countPlaylist);
    console.log('countList' + countList);

    if (speedOrpass != 1) {

        if (countPlaylist > 0) {
            countPlaylist = countPlaylist - 1;
            $('.list-item-track').css('color', 'black');
            $('.list-item-track').css('font-weight', '400');
            var id = '#play' + countPlaylist + playlist[countPlaylist];
            $(id).css('color', 'red');
            $(id).css('font-weight', 'bold');
            console.log(id);
            console.log(countPlaylist);
            $('#track-bar-title').text($(id).text());

            player.loadVideoById({
                'videoId': playlist[countPlaylist],
                'suggestedQuality': 'large'
            });

            $('#play').css('display', 'none');
            $('#pause').css('display', 'block');
        } else {
            player.loadVideoById({
                'videoId': playlist[countPlaylist],
                'suggestedQuality': 'large'
            });
            /*$('#track-bar-title').text($(id).text());*/
        }
    } else {
        speedOrpass = 0;
    }
});

$('#next').click(function () {

    if (speedOrpass != 1) {
        /*countPlaylist = countPlaylist + 1;*/
        if (countPlaylist < playlist.length - 1) {

            countPlaylist = countPlaylist + 1;

            $('.list-item-track').css('color', 'black');
            $('.list-item-track').css('font-weight', '400');
            var id = '#play' + countPlaylist + playlist[countPlaylist];
            $(id).css('color', 'red');
            $(id).css('font-weight', 'bold');
            console.log(id);
            $('#track-bar-title').text($(id).text());

            player.loadVideoById({
                'videoId': playlist[countPlaylist],
                'suggestedQuality': 'large'
            });

            $('#play').css('display', 'none');
            $('#pause').css('display', 'block');
        }
    } else {
        speedOrpass = 0;
    }
});

$('.track-list-content ').on('click', 'p', function () {

    $('#play').css('display', 'none');
    $('#pause').css('display', 'block');

    $('.list-item-track').css('color', 'black');
    $('.list-item-track').css('font-weight', '400');
    $('#track-bar-title').text($(this).text());
    $(this).css('color', 'red');
    $(this).css('font-weight', 'bold');
    idNow = $("p").index(this);
    countPlaylist = idNow;
    player.loadVideoById({
        'videoId': playlist[countPlaylist],
        'suggestedQuality': 'large'
    });

    setInterval(function () {


        if (player.getCurrentTime() >= player.getDuration() && player.getDuration() != 0) {

            countPlaylist = countPlaylist + 1;

            player.loadVideoById({
                'videoId': playlist[countPlaylist],
                'suggestedQuality': 'large'
            });
            player.playVideo();
            var id = '#play' + countPlaylist + playlist[countPlaylist];
            $('.list-item-track').css('color', 'black');
            $('.list-item-track').css('font-weight', '400');
            $('#track-bar-title').text($(id).text());
            $(id).css('color', 'red');
            $(id).css('font-weight', 'bold');

        }

        currentValeur = player.getCurrentTime();
        valMax = player.getDuration();

        currentValeurReal = (player.getCurrentTime() * 100) / valMax;

        $('.progress-bar').css('width', currentValeurReal + '%').attr('aria-valuenow', currentValeurReal);
    }, 100);
});

function speed() {
    playerSpeed = player.getCurrentTime() + 2;
    player.seekTo(playerSpeed);

    speedOrpass = 1;
}

function speedback() {
    playerSpeed = player.getCurrentTime() - 2;
    player.seekTo(playerSpeed);

    speedOrpass = 1;
}

$('#next').on('mousedown', function () {
    interval = setInterval(function () {
        speed();
    }, 100);
}).on('mouseup', function () {
    clearInterval(interval);
    player.seekTo(player.getCurrentTime());
    player.playVideo();
    $('#play').css('display', 'none');
    $('#pause').css('display', 'block');
});

$('#back').on('mousedown', function () {
    interval2 = setInterval(function () {
        speedback();
    }, 100);
}).on('mouseup', function () {
    clearInterval(interval2);
    player.seekTo(player.getCurrentTime());
    player.playVideo();
    $('#play').css('display', 'none');
    $('#pause').css('display', 'block');
});

setInterval(function () {
    $.ajax({
        url: 'http://localhost:8000/get-playlist-status',
        type: "POST",
        dataType: 'JSON',
        data: {
            'id_playlist': $('#idlist').text()
        },
        success: function (data) {
            if (data.status == "error") {
                alert('votre naviagteur ne supporte pas l\'AJAX')
            } else {
                if (data == 1){
                    if (musicEtant == 1){

                    }else{
                        $('#play').css('display', 'none');
                        $('#pause').css('display', 'block');
                        player.seekTo(player.getCurrentTime());
                        player.playVideo();
                        musicEtant = 1;
                    }

                }else if(data == 0){
                    musicEtant = 0;
                    $('#play').css('display', 'block');
                    $('#pause').css('display', 'none');
                    player.pauseVideo();
                    console.log('pause at ' + player.getCurrentTime());
                }
            }
        }
    });
}, 1200);


setInterval(function () {

    $.ajax({
        url: 'http://localhost:8000/get-playlist',
        type: "POST",
        dataType: 'JSON',
        data: {
            'id_playlist': $('#idlist').text()
        },
        success: function (data) {
            if (data.status == "error") {
                alert('votre naviagteur ne supporte pas l\'AJAX')
            } else {
                dataAjax = data;
                playlistAjax = [];
                playlistAjaxTitle = [];
                $.each(dataAjax, function (item, i) {
                    playlistAjax.push(i.idVid);
                    playlistAjaxTitle.push(i.title)
                });
                var deletion = $(playlist).not(playlistAjax).get();
                /*var addition = $(playlistAjax).not(playlist).get();*/
                var addition = playlist.length - playlistAjax.length;
                console.log(addition);
                /*if (deletion != '') {
                 for (j = 0; j < deletion.length; j++) {
                 playlist = jQuery.grep(playlist, function (value) {
                 return value != deletion[j];
                 });
                 }
                 }*/
                if (addition < 0) {
                    if (playlist.length == 0) {
                        for (i = 0; i < playlistAjax.length; i++) {
                            playlist.push(playlistAjax[i]);
                            var idPlay = playlistAjax[i];
                            $('.track-list-content').append('<p class="list-item-track" id="play' + countList + idPlay + '" >' + playlistAjaxTitle[i] + '</p>');
                            countList = countList + 1;
                        }
                    } else {
                        for (i = playlist.length; i < playlistAjax.length; i++) {
                            playlist.push(playlistAjax[i]);
                            var idPlay = playlistAjax[i];
                            $('.track-list-content').append('<p class="list-item-track" id="play' + countList + idPlay + '" >' + playlistAjaxTitle[i] + '</p>');
                            countList = countList + 1;
                        }
                    }
                }

            }
        }
    });

}, 1000);
