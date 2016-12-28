<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/get-list-playlist', 'PlayListController@getAllPlayList')->name('getAllPlayList');
Route::post('/add-playlist', 'PlayListController@addPlayList')->name('addPlayList');
Route::post('/add-playlist-item', 'PlayListController@addPlayListItem')->name('addPlayListItem');
Route::post('/get-playlist', 'PlayListController@returnPlayList')->name('returnPlayList');