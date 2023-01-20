<?php

require('config.php');
require('autorisieren.php');

$user =  $_POST["user"];

$spiel = $_POST["spiel"];
$datum = $_POST["datum"];
$bild = $_POST["bild"];
$beschreibung = $_POST["beschreibung"];
$verein = $_POST["verein"];

$gegenleistungen = json_decode($_POST['gegenleistungen']);

$sql = "INSERT INTO abo (spiel, bild, datum, Verein_ID, beschreibung, User_ID) VALUES (:Spiel, :Bild, :Datum, :Verein_ID, :Beschreibung, :User_ID)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Spiel' => $spiel, 'Bild' => $bild, 'Datum' => $datum, 'Verein_ID' => $verein, 'Beschreibung' => $beschreibung, 'User_ID' => $user));

if ($erfolg) {

    $letzteID = $pdo->lastInsertId();

    insertGegenleistungen($gegenleistungen, $letzteID);

} else {

    print_r($erfolg);
};

// Ausgewählte Gegenleistungen mit dem Abo verknüpfen (in der Tabelle abo_hat_gegenleistung Eintrag erstellen)
function insertGegenleistungen($gegenleistungen, $letzteID)
{

    require('config.php');

    if (sizeof($gegenleistungen) > 0) {

        $sql = "INSERT INTO abo_hat_gegenleistung (Abo_ID, Gegenleistung_ID) VALUES (:Abo_ID, :Gegenleistung_ID)";

        $stmt = $pdo->prepare($sql);

        foreach ($gegenleistungen as $gegenleistung) {

            $erfolg = $stmt->execute(array('Abo_ID' => $letzteID, 'Gegenleistung_ID' => $gegenleistung));
        }

        if ($erfolg) {

            print_r("Dein Inserat wurde mit Gegenleistungen erstellt.");

        } else {

            print_r($erfolg);

        }
    } else {

        print_r("Dein Inserat wurde ohne Gegenleistungen erstellt.");

    }
}