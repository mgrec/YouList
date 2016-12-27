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

    return $this->view->render($response, 'pages/home.twig', []);
})->setName('home');

$app->run();

