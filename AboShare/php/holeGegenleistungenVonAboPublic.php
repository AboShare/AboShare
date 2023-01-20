<?php

require("config.php");

$aboID = $_POST["aboID"];

$sql = "
SELECT g.ID, g.name FROM gegenleistung g 
INNER JOIN abo_hat_gegenleistung junc ON g.ID = junc.Gegenleistung_ID
WHERE junc.Abo_ID = '$aboID';
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}