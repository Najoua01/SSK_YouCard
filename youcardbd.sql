SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `abonnements` (
  `Id_Abonnements` int(11) NOT NULL,
  `abonnement_name` varchar(50) DEFAULT NULL
) ;

INSERT INTO `abonnements` (`Id_Abonnements`, `abonnement_name`) VALUES
(1, 'standard'),
(2, 'premium');

CREATE TABLE `membres` (
  `Id_Membres` int(11) NOT NULL,
  `dateNaiss` date NOT NULL,
  `Users_Id` int(11) NOT NULL,
  `Abonnements_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `partenaires` (
  `Id_Partenaires` int(11) NOT NULL,
  `siteUrl` varchar(255) NOT NULL,
  `tva` varchar(100) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `contactNom` varchar(100) NOT NULL,
  `contactPrenom` varchar(100) NOT NULL,
  `contactEmail` varchar(100) NOT NULL,
  `contactTelephone` varchar(20) NOT NULL,
  `Users_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `roles` (
  `Id_Roles` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ;

INSERT INTO `roles` (`Id_Roles`, `role_name`) VALUES
(1, 'admin'),
(2, 'membre'),
(3, 'partenaire');

CREATE TABLE `users` (
  `Id_Users` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pays` varchar(100) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `codePostal` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Roles_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `abonnements`
  ADD PRIMARY KEY (`Id_Abonnements`);

ALTER TABLE `membres`
  ADD PRIMARY KEY (`Id_Membres`),
  ADD UNIQUE KEY `Users_Id` (`Users_Id`),
  ADD KEY `fk_membres_abonnements` (`Abonnements_Id`);

ALTER TABLE `partenaires`
  ADD PRIMARY KEY (`Id_Partenaires`),
  ADD UNIQUE KEY `Users_Id` (`Users_Id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`Id_Roles`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`Id_Users`),
  ADD KEY `Roles_Id` (`Roles_Id`);


ALTER TABLE `abonnements`
  MODIFY `Id_Abonnements` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `membres`
  MODIFY `Id_Membres` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `partenaires`
  MODIFY `Id_Partenaires` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `roles`
  MODIFY `Id_Roles` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `Id_Users` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `membres`
  ADD CONSTRAINT `fk_membres_abonnements` FOREIGN KEY (`Abonnements_Id`) REFERENCES `abonnements` (`Id_Abonnements`),
  ADD CONSTRAINT `membres_ibfk_1` FOREIGN KEY (`Users_Id`) REFERENCES `users` (`Id_Users`);

ALTER TABLE `partenaires`
  ADD CONSTRAINT `partenaires_ibfk_1` FOREIGN KEY (`Users_Id`) REFERENCES `users` (`Id_Users`);

ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Roles_Id`) REFERENCES `roles` (`Id_Roles`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
