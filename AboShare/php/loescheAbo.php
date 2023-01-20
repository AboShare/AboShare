<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$aboID = $_POST["aboID"];

$sql = "DELETE FROM abo WHERE User_ID = ? AND ID = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $aboID]);

if ($erfolg) {

    loescheGegenleistungen($aboID);

} else {

    print_r($erfolg);
};

// lösche alle verknüpften Gegenleistungen von dem gelöschten Abo
function loescheGegenleistungen($aboID){

    require('config.php');

    $sql = "DELETE FROM abo_hat_gegenleistungen WHERE Abo_ID = ?";
    $stmt = $pdo->prepare($sql);

    $erfolg = $stmt->execute([$aboID]);

    if ($erfolg){

        echo "Abo und Gegenleistung wurden gelöscht!";

    } else {

        $erfolg;

    }

}