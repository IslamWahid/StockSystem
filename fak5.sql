-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: fak5
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Stocks`
--

DROP TABLE IF EXISTS `Stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stocks` (
  `companyname` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currentprice` decimal(11,2) NOT NULL,
  `recentchange` decimal(11,2) NOT NULL,
  `annualtrend` varchar(5) NOT NULL,
  `recentchangedirection` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stocks`
--

LOCK TABLES `Stocks` WRITE;
/*!40000 ALTER TABLE `Stocks` DISABLE KEYS */;
INSERT INTO `Stocks` VALUES ('ABC Company',1,0.40,0.02,'Up','Up'),('XYZ Logistics',2,1.00,0.05,'Down','Down'),('Acme Publishing',3,1.33,0.08,'Up','Down'),('Fling Fing',4,0.94,0.11,'Down','Up'),('Neutral Networks',5,1.25,0.40,'Up','Up'),('Total Solutions Inc',6,0.55,0.01,'Down','Up');
/*!40000 ALTER TABLE `Stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `username` varchar(30) NOT NULL,
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('Fred',1,'freddo'),('Jo',2,'jobo'),('Judy',3,'judyb'),('Bill',4,'bilbo');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users-Stocks`
--

DROP TABLE IF EXISTS `Users-Stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users-Stocks` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL DEFAULT 'ADD NOTE HERE',
  PRIMARY KEY (`uid`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users-Stocks`
--

LOCK TABLES `Users-Stocks` WRITE;
/*!40000 ALTER TABLE `Users-Stocks` DISABLE KEYS */;
INSERT INTO `Users-Stocks` VALUES (1,1,'ADD NOTE HERE'),(2,1,'ADD NOTE HERE'),(3,1,'ADD NOTE HERE'),(4,1,'ADD NOTE HERE'),(5,1,'hellllllllllllllo'),(6,1,'ADD NOTE HERE'),(1,2,'ADD NOTE HERE'),(4,2,'ADD NOTE HERE'),(5,2,'sssssssssssss');
/*!40000 ALTER TABLE `Users-Stocks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-25  2:00:46
