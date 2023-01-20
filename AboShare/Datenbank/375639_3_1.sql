-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 20. Jan 2023 um 18:50
-- Server-Version: 10.3.31-MariaDB-0+deb10u1
-- PHP-Version: 7.0.33-57+0~20211119.61+debian10~1.gbp5d8ba5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `375639_3_1`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `abo`
--

CREATE TABLE `abo` (
  `ID` int(11) NOT NULL,
  `spiel` varchar(100) NOT NULL,
  `datum` date NOT NULL,
  `beschreibung` varchar(200) NOT NULL,
  `bild` varchar(200) NOT NULL,
  `Verein_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Daten für Tabelle `abo`
--

INSERT INTO `abo` (`ID`, `spiel`, `datum`, `beschreibung`, `bild`, `Verein_ID`, `User_ID`) VALUES
(15, 'Basel - YB', '2023-03-16', ' Ich kann leider nicht zum Spiel, da ich eine Familienfeier habe. Ich würde mich freuen, wenn mich jemand am Spiel vertreten würde. Hopp FCB', 'https://ybchampion.ch/wp-content/uploads/2018/12/basel-yb.jpg', 2, 15),
(17, 'FC Lugano - Young Boys Bern', '2023-02-19', ' An diesem Spieltag bin ich leider verhindert und kann mein Saison Abo nicht verwenden. Daher stelle ich es hier online. Schreiben sie mir gerne eine Mail falls interesse besteht.', 'https://football.ch/ResourceImage.aspx?raid=1608318', 4, 14);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `abo_hat_gegenleistung`
--

CREATE TABLE `abo_hat_gegenleistung` (
  `ID` int(11) NOT NULL,
  `Abo_ID` int(11) NOT NULL,
  `Gegenleistung_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `abo_hat_gegenleistung`
--

INSERT INTO `abo_hat_gegenleistung` (`ID`, `Abo_ID`, `Gegenleistung_ID`) VALUES
(49, 15, 1),
(52, 17, 2),
(53, 17, 3),
(58, 16, 1),
(59, 16, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gegenleistung`
--

CREATE TABLE `gegenleistung` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `gegenleistung`
--

INSERT INTO `gegenleistung` (`ID`, `name`) VALUES
(1, 'Bratwurst'),
(2, 'Bier'),
(3, 'Kaffee');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `session`
--

CREATE TABLE `session` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Token` varchar(42) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `session`
--

INSERT INTO `session` (`ID`, `User_ID`, `Token`, `Timestamp`) VALUES
(97, 14, 'bRxOI2kwDa6FpalEG3Cc64EHuymH9o6lw3wsP7OENR', '2023-01-14 21:46:11');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`ID`, `name`, `email`, `password`) VALUES
(14, 'Gian-Marco Stössel', 'gianmarco@stoessel.ch', '$2y$10$2whsSrSuOsRYG1RNKGloDe4rnmQ4CXUe0cie7Q.AWUeBwNKKMBq0u'),
(15, 'Jan Christen', 'jansimonchristen@gmail.com', '$2y$10$a39Y3Qu00bfioCaf5K4R4u2hDZIi9R0cIx6erZD7VMF/a10PUfDAG'),
(16, 'noe.freiburghaus', 'noe.freiburghaus@hotmail.com', '$2y$10$CoWe51vAg5QHufq.XxQFj.S6guud0ufs7WvNjLHdwcSKaVxFLxb8i');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `verein`
--

CREATE TABLE `verein` (
  `ID` int(11) NOT NULL,
  `name` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `verein`
--

INSERT INTO `verein` (`ID`, `name`) VALUES
(1, 'BSC Young Boys'),
(2, 'FC Basel'),
(3, 'FC St. Gallen'),
(4, 'FC Lugano');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `abo`
--
ALTER TABLE `abo`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `abo_hat_gegenleistung`
--
ALTER TABLE `abo_hat_gegenleistung`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `gegenleistung`
--
ALTER TABLE `gegenleistung`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `verein`
--
ALTER TABLE `verein`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `abo`
--
ALTER TABLE `abo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `abo_hat_gegenleistung`
--
ALTER TABLE `abo_hat_gegenleistung`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT für Tabelle `gegenleistung`
--
ALTER TABLE `gegenleistung`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `verein`
--
ALTER TABLE `verein`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
