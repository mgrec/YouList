<?php
/**
 * Created by PhpStorm.
 * User: maxime
 * Date: 16/12/2016
 * Time: 13:44
 */
require 'vendor/autoload.php';
require_once "config.php";
use Controller\homeController;

$app->get('/', function ($request, $response, $args) {

    return $this->view->render($response, 'pages/welcome.twig', []);
})->setName('welcome');

$app->get('/wall/{username}', function ($request, $response, $args) {

    $datas['username'] = $args['username'];
    return $this->view->render($response, 'pages/wall.twig', $datas);
})->setName('wall');

$app->get('/playlist/{iduser}-{idlist}', function ($request, $response, $args) {

    $datas['idlist'] = $args['idlist'];
    return $this->view->render($response, 'pages/home.twig', $datas);
})->setName('playlist');

$app->run();
