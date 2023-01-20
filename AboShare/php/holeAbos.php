<?php

require("config.php");
require("autorisieren.php");

$sql = "
SELECT ABO.ID, ABO.spiel, ABO.bild, ABO.datum, VE.name, ABO.beschreibung, U.name, U.email
FROM abo ABO
INNER JOIN user U
ON ABO.User_ID = U.ID
INNER JOIN verein VE
ON ABO.Verein_ID = VE.ID
ORDER BY ABO.datum ASC;
";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}   