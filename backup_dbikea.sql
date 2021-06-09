-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: dbikea
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `idstock` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`idcart`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`idcategory`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Elektronik',NULL),(2,'Furniture Rumah',NULL),(3,'Furniture Kantor',NULL),(4,'AC',1),(5,'Lampu',1),(6,'Alat Masak',1),(7,'Ruang Tamu',2),(8,'Kamar',2),(9,'Container',3),(10,'Kursi Kantor',3),(11,'Microwave',6),(12,'Kulkas',6),(13,'Sofa',7),(14,'Karpet',7),(15,'TV',1),(16,'Kasur',8);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `idproduct_category` int(11) NOT NULL AUTO_INCREMENT,
  `idproduct` int(11) NOT NULL,
  `idcategory` int(11) NOT NULL,
  PRIMARY KEY (`idproduct_category`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,10,3),(2,10,9),(3,9,16),(4,9,8),(5,9,2),(6,13,16),(7,13,8),(8,13,2);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `idproduct_image` int(11) NOT NULL AUTO_INCREMENT,
  `idproduct` int(11) NOT NULL,
  `images` varchar(200) NOT NULL,
  PRIMARY KEY (`idproduct_image`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,1,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg'),(2,1,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810719_PE771386_S4.jpg'),(3,2,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/557/0955765_PE804101_S4.jpg'),(4,2,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/594/0959497_PE806037_S4.jpg'),(5,2,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/727/0972709_PE811745_S4.jpg'),(6,2,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/557/0955706_PE803970_S4.jpg'),(7,3,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/334/0933452_PE791908_S4.jpg'),(8,3,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/407/0940712_PE795127_S4.jpg'),(9,9,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg'),(10,9,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/323/0932344_PE791460_S4.jpg'),(11,9,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/391/0939185_PE794439_S4.jpg'),(12,10,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/390/0939002_PE794384_S4.jpg'),(13,10,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/388/0938824_PE794380_S4.jpg'),(14,10,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/741/0974172_PE812299_S4.jpg'),(15,11,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg'),(16,11,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/323/0932344_PE791460_S4.jpg'),(17,11,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/391/0939185_PE794439_S4.jpg'),(18,13,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg'),(19,13,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/323/0932344_PE791460_S4.jpg'),(20,13,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/391/0939185_PE794439_S4.jpg');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_stock`
--

DROP TABLE IF EXISTS `product_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_stock` (
  `idproduct_stock` int(11) NOT NULL AUTO_INCREMENT,
  `idproduct` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `qty` int(11) NOT NULL,
  `idstatus` int(11) DEFAULT '1',
  PRIMARY KEY (`idproduct_stock`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_stock`
--

LOCK TABLES `product_stock` WRITE;
/*!40000 ALTER TABLE `product_stock` DISABLE KEYS */;
INSERT INTO `product_stock` VALUES (1,1,'L',20,1),(2,1,'XL',30,1),(3,2,'Black',10,1),(4,2,'Krem',8,1),(5,3,'Black',12,1),(6,3,'White',12,1),(7,9,'T-1',10,1),(8,9,'T-2',10,1),(9,10,'Black',15,1),(10,10,'Brown',12,1),(11,11,'TA',10,1),(12,11,'TB',10,1),(13,13,'TA',10,1),(14,13,'TB',10,1);
/*!40000 ALTER TABLE `product_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idproduct` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `deskripsi` varchar(400) DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `idstatus` int(11) DEFAULT '1',
  PRIMARY KEY (`idproduct`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'IDALINNEA C','IKEA','Ritsleting yang tersembunyi membuat sarung mudah dilepas.  Sarung bantal dengan tampilan cermin karena memiliki pola yang sama di kedua sisi.  Katun adalah bahan alami lembut dan mudah dirawat yang dapat Anda cuci dengan mesin.',890000,1),(2,'HAUGA V.2','IKEA','Mudah untuk menyembunyikan kabel dan stopkontak tapi tetap dapat dijangkau dengan jalur kabel di bagian belakang.',1599000,2),(3,'LINNEBÄCK','IKEA','Lebar:\\t55 cm Kedalaman:\\t69,5 cm Tinggi:\\t72,4 cm Lebar dudukan:\\t57 cm Kedalaman dudukan:\\t50 cm Tinggi dudukan:\\t42,4 cm Berat total:\\t6,50 kg',995000,1),(9,'IDANÄS','IKEA',' Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  ',5499000,1),(10,'RUDSTA','IKEA','Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.',2499000,1),(11,'IDANÄS AB','IKEA',' Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  ',6499000,1),(13,'IDANÄS ABC','IKEA',' Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  ',6499000,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idstatus` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Available'),(2,'Non-Available'),(3,'Active'),(4,'Non-Active'),(5,'Restock'),(6,'Unpaid'),(7,'Paid'),(8,'Processed'),(9,'Delivered'),(10,'Received'),(11,'Verified'),(12,'Unverified');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `idtransaction_detail` int(11) NOT NULL AUTO_INCREMENT,
  `idtransaction` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `idstock` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`idtransaction_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
INSERT INTO `transaction_detail` VALUES (1,1,1,1,1),(2,1,9,8,1),(3,1,3,5,3),(4,2,1,2,1),(5,2,10,9,1),(6,3,1,1,4);
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `idtransaction` int(11) NOT NULL AUTO_INCREMENT,
  `invoice` varchar(45) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `iduser` int(11) NOT NULL,
  `ongkir` int(11) DEFAULT '0',
  `total_payment` int(11) NOT NULL,
  `note` varchar(150) DEFAULT NULL,
  `idstatus` int(11) DEFAULT '6',
  PRIMARY KEY (`idtransaction`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'#INVOICE/1622705129517','2021-06-03 14:25:29',2,234350,9608350,'',6),(2,'#INVOICE/1622708263472','2021-06-03 15:17:43',3,84725,3473725,'Barang di cek',6),(3,'#INVOICE/1622708974134','2021-06-03 15:29:34',2,89000,3649000,'Empuk gag bantalnya',6);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) DEFAULT 'user',
  `otp` varchar(45) DEFAULT NULL,
  `idstatus` int(11) DEFAULT '12',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@mail.com','1234','admin',NULL,3),(2,'Abdi','abdi@mail.com','1234','user',NULL,11),(3,'Edo','edo@mail.com','1234','user',NULL,11),(5,'abdi03','abdialghi@gmail.com','12345','user','vrh2u3',12);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbikea'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 13:29:04
