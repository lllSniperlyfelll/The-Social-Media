-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2020 at 02:33 PM
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
-- Database: `socialmediacommentsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `commentstable`
--

CREATE TABLE `commentstable` (
  `postid` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `comments` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commentstable`
--

INSERT INTO `commentstable` (`postid`, `email`, `name`, `comments`) VALUES
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'This is a test comment'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'the above text is a place holder for the post to be set hence can be removed in future'),
('c14f04ea6c77f5898cca14a2b8b93775858b446a4872f76114b8b5cf99318a22', 'test@test.com', 'test user', 'this is another comment with the auto refresh feature enabled'),
('c34a9b957bafd3d437b4e4195d6af8c31aebf52a617a702e546729c80ea02447', 'test@test.com', 'test user', 'another test comment'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', '#Tags works'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', 'more than 1 tags also work #Tag1 and #Tag2 with#tag3'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', 'More than 1 tag also works #Tag1 and #tag2'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', 'only # are not tags though !!'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', 'But #t is'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'hell ya'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'Its a good comment'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'Yea the post is nice yo !'),
('40ec10ab4e4c4114f4c9ef2b610221ee8017ddb77ee0c73e1ea5f3b93ef7ae3f', 'test@test.com', 'test user', 'Yea the post is nice yo ! smae for u bro'),
('cd8f52944b5e58afec00f855340446c188dfd5d3c86aedd9fe56bd6e9e2196da', 'test@test.com', 'test user', 'Awesomepoist'),
('22345343c54cvrv34sav', 'test@test.com', 'test user', 'This is a comment'),
('e6e00ff5af17452cab087512579e66747691fe28a81a595414be5ce06878818a', 'test@test.com', 'test user', 'Aswsome image #Lit'),
('5e04bb17e9b81f36a625cce4656d4818816d3b9ae96205afe6b56f5f2cc16876', 'test@test.com', 'test user', 'Its me The same user commenting on the POst :)'),
('49bd55d1d9f1470a2681fa18574f83082331eea4347cc7c27fc1e493d5390b0', 'test@test.com', 'test user', 'Nice Pic Yo !!!!'),
('7da298d0625fa0f68554c3c0c66a82e756b3586f68cafc5720054e7325acbbd', 'test@test.com', 'test user', 'Chal Rahi hai Wowowowowowowowo #HoGayaAlmostProject');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
