-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2020 at 09:46 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialmediadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `multimediaposts`
--

CREATE TABLE `multimediaposts` (
  `mmpostid` varchar(200) NOT NULL,
  `ImagePath` varchar(100) NOT NULL,
  `caption` varchar(500) NOT NULL,
  `tags` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `posted_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `multimediaposts`
--

INSERT INTO `multimediaposts` (`mmpostid`, `ImagePath`, `caption`, `tags`, `email`, `user_name`, `posted_on`) VALUES
('22345343asa4cvrv34tv', 'testpath', 'capyionnkd', '#tafsgas', 'test@test,com', 'test user', '2020-04-18'),
('22345343c54cvrv34sav', 'testpath', 'capyionnkd', '#tafsgas', 'test@test,com', 'test user', '2020-04-18'),
('22345343c54cvrv34tv', 'testpath', 'capyionnkd', '#tafsgas', 'test@test,com', 'test user', '2020-04-18'),
('32345343c54cvrv34tv', 'testpath', 'capyionnkd', '#tafsgas', 'test@test,com', 'test user', '2020-04-18'),
('e6e00ff5af17452cab087512579e66747691fe28a81a595414be5ce06878818a', 'C:/Users/user/Pictures/BEARR.jpg', 'Test image final upload', '#Its Working', 'test@test.com', 'test user', '2020-04-18');

-- --------------------------------------------------------

--
-- Table structure for table `registeredusers`
--

CREATE TABLE `registeredusers` (
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `UserStatus` varchar(100) NOT NULL,
  `Blog` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registeredusers`
--

INSERT INTO `registeredusers` (`Email`, `Password`, `Name`, `Gender`, `UserStatus`, `Blog`) VALUES
('test@test.com', '123abcABC', 'test user', 'Male', 'try try but dont cry', 'www.userblog.co.in');

-- --------------------------------------------------------

--
-- Table structure for table `textposts`
--

CREATE TABLE `textposts` (
  `textpostid` varchar(100) NOT NULL,
  `thepost` mediumtext NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `posted_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textposts`
--

INSERT INTO `textposts` (`textpostid`, `thepost`, `email`, `user_name`, `posted_on`) VALUES
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'This is a comment with tags proccessing enabled #Tags_rock ! heheheh', 'test@test.com', 'test user', '2020-04-17'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, This is a new test post from alpha built of posts, ', 'test@test.com', 'test user', '2020-04-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `multimediaposts`
--
ALTER TABLE `multimediaposts`
  ADD PRIMARY KEY (`mmpostid`);

--
-- Indexes for table `registeredusers`
--
ALTER TABLE `registeredusers`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `textposts`
--
ALTER TABLE `textposts`
  ADD PRIMARY KEY (`textpostid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
