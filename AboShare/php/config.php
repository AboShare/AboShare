<?php

$host = "localhost";
$user = "375639_3_1";
$password = "1l2uhUVXR=9g";
$dbname = "375639_3_1";

$pdo = new PDO('mysql:host='. $host . '; dbname=' . $dbname . ';charset=utf8', $user, $password);
$pdo->exec("set names utf8");