-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2022 at 08:36 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payment_gateway`
--

-- --------------------------------------------------------

--
-- Table structure for table `exchangerate_status`
--

CREATE TABLE `exchangerate_status` (
  `transactionId` varchar(255) NOT NULL,
  `referenceNo` varchar(255) NOT NULL,
  `merchantId` varchar(255) NOT NULL,
  `merchantName` varchar(255) NOT NULL,
  `merchantAmount` decimal(10,2) NOT NULL,
  `sourceCurrency` varchar(255) NOT NULL,
  `targetCurrency` varchar(255) NOT NULL,
  `exchangeRate` varchar(255) NOT NULL,
  `exchangeRateDate` varchar(255) NOT NULL,
  `signature` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exchangerate_status`
--

INSERT INTO `exchangerate_status` (`transactionId`, `referenceNo`, `merchantId`, `merchantName`, `merchantAmount`, `sourceCurrency`, `targetCurrency`, `exchangeRate`, `exchangeRateDate`, `signature`) VALUES
('fe93b22e-fd72-4b00-98c6-f3aad33045d8', '20201029000000000000001', '123456789', 'PT.ABCDE', '1000.00', 'PHP', 'IDR', '282.510000', '2022-12-21T06:53:35.455Z', '6f0d4dea38e20daa8f501e156cbfa3a816f0b1c9');

-- --------------------------------------------------------

--
-- Table structure for table `exchange_payment`
--

CREATE TABLE `exchange_payment` (
  `transactionId` varchar(255) NOT NULL,
  `referenceNo` varchar(255) NOT NULL,
  `transactionDesc` varchar(255) NOT NULL,
  `transactionStatus` varchar(1) NOT NULL,
  `paymentDate` varchar(255) NOT NULL,
  `paymentReff` varchar(255) NOT NULL,
  `paidAmountValue` decimal(10,2) NOT NULL,
  `paidAmountCurrency` varchar(255) NOT NULL,
  `targetAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exchange_payment`
--

INSERT INTO `exchange_payment` (`transactionId`, `referenceNo`, `transactionDesc`, `transactionStatus`, `paymentDate`, `paymentReff`, `paidAmountValue`, `paidAmountCurrency`, `targetAmount`) VALUES
('fe93b22e-fd72-4b00-98c6-f3aad33045d8', '20201029000000000000001', 'Payment Success', '1', '2022-12-12T09:25:26.142Z', 'abcd12345', '28251000.00', 'IDR', '99999999.99');

-- --------------------------------------------------------

--
-- Table structure for table `forex`
--

CREATE TABLE `forex` (
  `forexId` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `value` decimal(10,6) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `targetCurrency` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forex`
--

INSERT INTO `forex` (`forexId`, `date`, `value`, `currency`, `targetCurrency`) VALUES
(2, '2022-12-21', '282.510000', 'PHP', 'IDR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exchangerate_status`
--
ALTER TABLE `exchangerate_status`
  ADD PRIMARY KEY (`transactionId`);

--
-- Indexes for table `exchange_payment`
--
ALTER TABLE `exchange_payment`
  ADD PRIMARY KEY (`transactionId`,`referenceNo`);

--
-- Indexes for table `forex`
--
ALTER TABLE `forex`
  ADD PRIMARY KEY (`forexId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
