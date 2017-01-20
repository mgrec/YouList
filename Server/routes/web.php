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

Route::group(['middleware' => 'cors'], function () {
    Route::post('/get-list-playlist', 'PlayListController@getAllPlayList')->name('getAllPlayList');
    Route::post('/add-playlist', 'PlayListController@addPlayList')->name('addPlayList');
    Route::post('/add-playlist-item', 'PlayListController@addPlayListItem')->name('addPlayListItem');
    Route::post('/get-playlist', 'PlayListController@returnPlayList')->name('returnPlayList');
    Route::post('/add-user', 'PlayListController@addUser')->name('addUser');
    Route::post('/connect-playlist', 'PlayListController@connectPlayList')->name('connectPlayList');
    Route::post('/get-playlist-status', 'PlayListController@getStatusPlayList')->name('getStatusPlayList');
    Route::post('/change-playlist-status', 'PlayListController@changeStatusPlayList')->name('changeStatusPlayList');
    Route::post('/get-share-code', 'PlayListController@getShareCode')->name('getShareCode');
    Route::post('/get-current-idVid', 'PlayListController@getCurrentIdVid')->name('getCurrentIdVid');
    Route::post('/change-current-idVid', 'PlayListController@changeCurrentIdVid')->name('changeCurrentIdVid');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
