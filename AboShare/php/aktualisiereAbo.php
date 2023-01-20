<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$spiel = $_POST["spiel"];
$datum = $_POST["datum"];
$beschreibung = $_POST["beschreibung"];
$verein = $_POST["verein"];

$bild = $_POST["bild"];

$aboID = $_POST["aboID"];

$gegenleistungen = json_decode($_POST['gegenleistungen']);

// Update SQL Statement für das Aktualisieren des Abos
$sql = "UPDATE abo SET spiel=?, bild=?, datum=?, Verein_ID=?, beschreibung=? WHERE User_ID=?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$spiel, $bild, $datum, $verein, $beschreibung, $userID]);

if ($erfolg) {

    loescheAlteGegenleistungen($aboID);
    insertNeueGegenleistungen($gegenleistungen, $aboID);

} else {

    print_r($erfolg);

};

// Lösche alle Gegenleistungen die mit dem Abo verknüpft sind
function loescheAlteGegenleistungen($aboID){

    require('config.php');

    $sql = "DELETE FROM abo_hat_gegenleistung WHERE Abo_ID = ?";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([$aboID]);

}

// Verknüpfe alle neuen Gegenleistungen mit dem Abo
function insertNeueGegenleistungen($gegenleistungen, $aboID){

    require('config.php');

    if (sizeof($gegenleistungen) > 0) {

        $sql = "INSERT INTO abo_hat_gegenleistung (Abo_ID, Gegenleistung_ID) VALUES (:Abo_ID, :Gegenleistung_ID)";
        $stmt = $pdo->prepare($sql);

        foreach ($gegenleistungen as $gegenleistung) {

            $erfolg = $stmt->execute(array('Abo_ID' => $aboID, 'Gegenleistung_ID' => $gegenleistung));
        }

        if ($erfolg) {

            print_r("Dein Inserat wurde aktualisiert.");

        } else {

            print_r($erfolg);
            
        }
        
    } else {

        print_r("Dein Inserat wurde ohne Gegenleistung aktualisiert.");
    }

}