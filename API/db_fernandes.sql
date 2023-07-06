-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2023 at 03:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_fernandes`
--

-- --------------------------------------------------------

--
-- Table structure for table `cervejas`
--

CREATE TABLE `cervejas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `preco` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cervejas`
--

INSERT INTO `cervejas` (`id`, `nome`, `imagem`, `preco`) VALUES
(1, 'Westvleteren editei', 'https://www.passionforwhisky.com/325734-large_default/trappist-westvleteren-12-33cl.jpg', 25),
(2, 'Chimay Grande Réserve', 'https://images-americanas.b2w.io/produtos/44664875/imagens/cerveja-chimay-blue-grande-reserve-750ml/44664873_1_large.jpg', 23),
(3, 'Rodenbach Grand Cru', 'https://cdn.shopify.com/s/files/1/0496/3850/6663/products/achat-biere-rodenback-grand-cru_d6d86ae5-d8db-4df3-9384-7eb3d71e2046_700x.png?v=1641497378', 23),
(4, 'Deus Brut des Flandres', 'https://s.cornershopapp.com/product-images/1449255.jpg?versionId=RGLpcKCFqK4DGC9ESFc.EdxGW.y2B1GL', 27),
(5, 'Cantillon editado', 'https://cdn.shopify.com/s/files/1/0496/3850/6663/products/biere-gueuze-cantillon_250x@2x.png?v=1677772682', 46);

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user` varchar(50) NOT NULL,
  `senha` varchar(32) DEFAULT NULL,
  `TIPO` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `user`, `senha`, `TIPO`) VALUES
(93, 'mateus editado', 'testandoedição@gmail.com', 'testandomd5', '8d70d8ab2768f232ebe874175065ead3', NULL),
(95, 'mateus fernandes', 'martinsmateus382@gmail.com', 'testandoDuplicados', 'e10adc3949ba59abbe56e057f20f883e', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `pratos` varchar(200) DEFAULT NULL,
  `bebidas` varchar(200) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `precos` double DEFAULT NULL,
  `nomecliente` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id`, `pratos`, `bebidas`, `cliente_id`, `precos`, `nomecliente`) VALUES
(9, 'Bacalhau à Gomes de Sá, Bife de chorizo, Foie gras poêlé, Crème brûlée de baunilha, Torta de chocolate belga, Soufflé de Grand Marnier', 'Château Margaux, Opus One, Sassicaia, Coca-cola, Guaraná, Pepsi', 93, 1774.91, 'mateus fernandes'),
(10, 'Bacalhau à Gomes de Sá, Bife de chorizo, Foie gras poêlé, Crème brûlée de baunilha, Torta de chocolate belga, Soufflé de Grand Marnier', 'Château Margaux, Opus One, Sassicaia, Coca-cola, Guaraná, Pepsi', 93, 1774.91, 'mateus fernandes'),
(11, 'Bacalhau à Gomes de Sá, Bife de chorizo, prato1, Crème brûlée de baunilha', 'Château Margaux, Opus One, Rodenbach Grand Cru, Chimay Grande Réserve, Westvleteren editei', 93, 1240.05, 'mateus fernandes'),
(12, 'Bacalhau à Gomes de Sá, Bife de chorizo, Foie gras poêlé, Crème brûlée de baunilha, Torta de chocolate belga, Soufflé de Grand Marnier', 'Château Margaux, Opus One, Sassicaia, Westvleteren editei, Chimay Grande Réserve, Rodenbach Grand Cru, Coca-cola, Guaraná', 93, 1837.91, 'mateus fernandes'),
(13, 'Bacalhau à editado1 de Sá, Bife de chorizo, Foie gras poêlé, Crème brûlée de baunilha, Torta de chocolate belga, Soufflé de Grand Marnier', 'Château Margaux, Opus One, Sassicaia, Westvleteren editei, Chimay Grande Réserve, Rodenbach Grand Cru, Coca-cola, Guaraná', 93, 1837.91, 'mateus fernandes');

-- --------------------------------------------------------

--
-- Table structure for table `pratos`
--

CREATE TABLE `pratos` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `imagens` varchar(500) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pratos`
--

INSERT INTO `pratos` (`id`, `userId`, `nome`, `descricao`, `imagens`, `preco`) VALUES
(3, NULL, 'Bife de chorizo', 'corte argentino de carne bovina, grelhado e servido com molho chimichurri', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAM2E2GZ27N3_ftM-eXzyIHn3uTkpr269gKQ&usqp=CAU', 239.22),
(4, NULL, 'Foie gras poêlé', 'fígado de pato grelhado, servido com redução de vinho do Porto e brioche', 'https://img.circulaire-en-ligne.ca/wp-content/uploads/foie-gras-poecc82le-aux-raisins.jpg', 221.16),
(6, NULL, 'Coq au Vin', 'frango cozido em vinho tinto, bacon, cogumelos e cebolas', 'https://truffle-assets.tastemadecontent.net/024f88e7-coq-au-vin_l_thumb.jpg', 177.22),
(10, 2, 'prato1', 'testando userId', 'https://static.wixstatic.com/media/40a8fe_add8300dd7784c56a1b507397cf2983f~mv2.jpg/v1/fill/w_320,h_240,q_90/40a8fe_add8300dd7784c56a1b507397cf2983f~mv2.jpg', 123.00);

-- --------------------------------------------------------

--
-- Table structure for table `refrigerantes`
--

CREATE TABLE `refrigerantes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `preco` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refrigerantes`
--

INSERT INTO `refrigerantes` (`id`, `nome`, `imagem`, `preco`) VALUES
(1, 'Coca-cola', 'https://cdn.awsli.com.br/600x1000/784/784082/produto/197207213/refrigerante-coca-cola-sabor-original-350ml-e5f2e9df43.jpg', 8),
(2, 'Guaraná', 'https://www.galaxcommerce.com.br/sistema/upload/1994/produtos/refrigerante-guarana-antarctica-lata-350-ml_2020-11-24_14-10-38_0_535.jpeg', 8),
(3, 'Pepsi', 'https://www.piramidesdistribuidora.com.br/images/original/3334-pepsi-lata-350ml-12un.20230427160531.png', 8),
(4, 'Água sem gás', 'https://images.tcdn.com.br/img/img_prod/1115696/180_agua_crystal_sem_gas_pet_1_5l_6_und_59_1_9f29b19be85113b4adf619b4a505bc1a.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `sobremesas`
--

CREATE TABLE `sobremesas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sobremesas`
--

INSERT INTO `sobremesas` (`id`, `nome`, `descricao`, `imagem`, `preco`) VALUES
(2, 'Crème brûlée de baunilha', 'Uma sobremesa clássica, mas sempre elegante. A superfície crocante de açúcar caramelizado é cuidadosamente queimada para criar a tradicional crosta de caramelo.', 'https://s2.glbimg.com/ctzysuSVWcIt4OMjlfLMiORRK-s=/smart/e.glbimg.com/og/ed/f/original/2021/04/12/receita-creme-brulee.jpg', 27.17),
(3, 'Torta de chocolate belga', 'Feita com os melhores chocolates belgas, essa torta é uma verdadeira indulgência para os amantes do chocolate. ', 'https://s2.glbimg.com/ifL4c5K-Uz2ERht0ck02I8hsuWc=/620x455/e.glbimg.com/og/ed/f/original/2018/10/08/chez-vous-torta-de-chocolate-belga-ligia-skowronski.jpg', 46.40),
(4, 'Soufflé de Grand Marnier', 'Uma versão particularmente requintada é o soufflé de Grand Marnier, feito com ovos frescos, açúcar, raspas de laranja e um toque generoso de licor Grand Marnier.', 'https://images.squarespace-cdn.com/content/v1/6109e64cfe878a0cad199515/6906b0d6-fc80-4351-9b39-62749fe2d76c/2U6A0057.jpg', 20.47),
(5, 'Tiramisu de trufa negra', 'Uma interpretação sofisticada do clássico italiano, esse tiramisu é feito com ingredientes de alta qualidade, incluindo trufas negras frescas.', 'https://i0.wp.com/gastronomiaitaliana.com.br/wp-content/uploads/2021/07/tiramisu-gb53f6a82b_1920.jpg?fit=1920%2C1279&ssl=1', 33.15),
(6, 'Parfait de frutas exóticas com caramelo de champanhe', 'Esse parfait é composto por camadas de frutas exóticas frescas, como manga, maracujá e carambola, intercaladas com creme batido e finalizadas com um caramelo luxuoso feito com champanhe.', 'https://s2.glbimg.com/cB2fwhaRwXDIykYJVub9E2ga2s8=/512x320/smart/e.glbimg.com/og/ed/f/original/2020/03/10/parfait.jpg', 14.33);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`) VALUES
(1, 'admin', 'martinsmateus382@gmail.com', 'username', '123456'),
(2, 'mateus123', 'martinsmteus382@gmail.com', 'usuario1', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `vinhos`
--

CREATE TABLE `vinhos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vinhos`
--

INSERT INTO `vinhos` (`id`, `nome`, `imagem`, `preco`) VALUES
(1, 'Château Margaux', 'https://images-americanas.b2w.io/produtos/3915104772/imagens/vinho-chateau-margaux-grand-cru-classe-2013/3915104772_1_large.jpg', 280.10),
(2, 'Opus One', 'https://cdn.dooca.store/3742/products/vinho-tinto-opus-one-2012.jpg?v=1646318850', 261.42),
(3, 'Sassicaia', 'https://d3qoj2c6mu9s8x.cloudfront.net/Custom/Content/Products/35/82/35820_vinho-tinto-sassicaia-bolgheri-750-ml-italia-2012_l1_636785839877569416.jpg', 416.83),
(4, 'Vega Sicilia', 'https://www.bancadoramon.com.br/media/catalog/product/v/e/vega_sicilia_unico_2011.jpg', 449.90),
(5, 'adicionando vinho', '', 130.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cervejas`
--
ALTER TABLE `cervejas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indexes for table `pratos`
--
ALTER TABLE `pratos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pratos_users` (`userId`);

--
-- Indexes for table `refrigerantes`
--
ALTER TABLE `refrigerantes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sobremesas`
--
ALTER TABLE `sobremesas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vinhos`
--
ALTER TABLE `vinhos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cervejas`
--
ALTER TABLE `cervejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pratos`
--
ALTER TABLE `pratos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `refrigerantes`
--
ALTER TABLE `refrigerantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sobremesas`
--
ALTER TABLE `sobremesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vinhos`
--
ALTER TABLE `vinhos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `pratos`
--
ALTER TABLE `pratos`
  ADD CONSTRAINT `fk_pratos_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
