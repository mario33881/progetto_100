-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 27, 2019 alle 20:45
-- Versione del server: 10.1.31-MariaDB
-- Versione PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db100_100`
--
CREATE DATABASE IF NOT EXISTS `db100_100` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db100_100`;

-- --------------------------------------------------------

--
-- Struttura della tabella `t_colors`
--

CREATE TABLE `t_colors` (
  `id` int(11) NOT NULL,
  `color_name` varchar(45) NOT NULL,
  `color_hex` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `t_colors`
--

INSERT INTO `t_colors` (`id`, `color_name`, `color_hex`) VALUES
(4379, 'red lighten-5', '#ffebee'),
(4380, 'red lighten-4', '#ffcdd2'),
(4381, 'red lighten-3', '#ef9a9a'),
(4382, 'red lighten-2', '#e57373'),
(4383, 'red lighten-1', '#ef5350'),
(4384, 'red', '#f44336'),
(4385, 'red darken-1', '#e53935'),
(4386, 'red darken-2', '#d32f2f'),
(4387, 'red darken-3', '#c62828'),
(4388, 'red darken-4', '#b71c1c'),
(4389, 'red accent-1', '#ff8a80'),
(4390, 'red accent-2', '#ff5252'),
(4391, 'red accent-3', '#ff1744'),
(4392, 'red accent-4', '#d50000'),
(4393, 'pink lighten-5', '#fce4ec'),
(4394, 'pink lighten-4', '#f8bbd0'),
(4395, 'pink lighten-3', '#f48fb1'),
(4396, 'pink lighten-2', '#f06292'),
(4397, 'pink lighten-1', '#ec407a'),
(4398, 'pink', '#e91e63'),
(4399, 'pink darken-1', '#d81b60'),
(4400, 'pink darken-2', '#c2185b'),
(4401, 'pink darken-3', '#ad1457'),
(4402, 'pink darken-4', '#880e4f'),
(4403, 'pink accent-1', '#ff80ab'),
(4404, 'pink accent-2', '#ff4081'),
(4405, 'pink accent-3', '#f50057'),
(4406, 'pink accent-4', '#c51162'),
(4407, 'purple lighten-5', '#f3e5f5'),
(4408, 'purple lighten-4', '#e1bee7'),
(4409, 'purple lighten-3', '#ce93d8'),
(4410, 'purple lighten-2', '#ba68c8'),
(4411, '#purple lighten-1', '#ab47bc'),
(4412, 'purple', '#9c27b0'),
(4413, 'purple darken-1', '#8e24aa'),
(4414, 'purple darken-2', '#7b1fa2'),
(4415, 'purple darken-3', '#6a1b9a'),
(4416, 'purple darken-4', '#4a148c'),
(4417, 'purple accent-5', '#ea80fc'),
(4418, 'purple accent-5', '#e040fb'),
(4419, 'purple accent-5', '#d500f9'),
(4420, 'purple accent-4', '#aa00ff'),
(4421, 'deep-purple lighten-5', '#ede7f6'),
(4422, 'deep-purple lighten-4', '#d1c4e9'),
(4423, 'deep-purple lighten-3', '#b39ddb'),
(4424, 'deep-purple lighten-2', '#9575cd'),
(4425, 'deep-purple lighten-1', '#7e57c2'),
(4426, 'deep-purple', '#673ab7'),
(4427, 'deep-purple darken-1', '#5e35b1'),
(4428, 'deep-purple darken-2', '#512da8'),
(4429, 'deep-purple darken-3', '#4527a0'),
(4430, 'deep-purple darken-4', '#311b92'),
(4431, 'deep-purple accent-1', '#b388ff'),
(4432, 'deep-purple accent-2', '#7c4dff'),
(4433, 'deep-purple accent-3', '#651fff'),
(4434, 'deep-purple accent-4', '#6200ea'),
(4435, 'indigo lighten-5', '#e8eaf6'),
(4436, 'indigo lighten-4', '#c5cae9'),
(4437, 'indigo lighten-3', '#9fa8da'),
(4438, 'indigo lighten-2', '#7986cb'),
(4439, 'indigo lighten-1', '#5c6bc0'),
(4440, 'indigo', '#3f51b5'),
(4441, 'indigo darken-1', '#3949ab'),
(4442, 'indigo darken-2', '#303f9f'),
(4443, 'indigo darken-3', '#283593'),
(4444, 'indigo darken-4', '#1a237e'),
(4445, 'indigo accent-1', '#8c9eff'),
(4446, 'indigo accent-2', '#536dfe'),
(4447, 'indigo accent-3', '#3d5afe'),
(4448, 'indigo accent-4', '#304ffe'),
(4449, 'blue lighten-5', '#e3f2fd'),
(4450, 'blue lighten-4', '#bbdefb'),
(4451, 'blue lighten-3', '#90caf9'),
(4452, 'blue lighten-2', '#64b5f6'),
(4453, 'blue lighten-1', '#42a5f5'),
(4454, 'blue', '#2196f3'),
(4455, 'blue darken-1', '#1e88e5'),
(4456, 'blue darken-2', '#1976d2'),
(4457, 'blue darken-3', '#1565c0'),
(4458, 'blue darken-4', '#0d47a1'),
(4459, 'blue accent-1', '#82b1ff'),
(4460, 'blue accent-2', '#448aff'),
(4461, 'blue accent-3', '#2979ff'),
(4462, 'blue accent-4', '#2962ff'),
(4463, 'light-blue lighten-5', '#e1f5fe'),
(4464, 'light-blue lighten-4', '#b3e5fc'),
(4465, 'light-blue lighten-3', '#81d4fa'),
(4466, 'light-blue lighten-2', '#4fc3f7'),
(4467, 'light-blue lighten-1', '#29b6f6'),
(4468, 'light-blue', '#03a9f4'),
(4469, 'light-blue darken-1', '#039be5'),
(4470, 'light-blue darken-2', '#0288d1'),
(4471, 'light-blue darken-3', '#0277bd'),
(4472, 'light-blue darken-4', '#01579b'),
(4473, 'ight-blue accent-1', '#l80d8f'),
(4474, 'light-blue accent-2', '#40c4ff'),
(4475, 'light-blue accent-3', '#00b0ff'),
(4476, 'light-blue accent-4', '#0091ea'),
(4477, 'cyan lighten-5', '#e0f7fa'),
(4478, 'cyan lighten-4', '#b2ebf2'),
(4479, 'cyan lighten-3', '#80deea'),
(4480, 'cyan lighten-2', '#4dd0e1'),
(4481, 'cyan lighten-1', '#26c6da'),
(4482, 'cyan', '#00bcd4'),
(4483, 'cyan darken-1', '#00acc1'),
(4484, 'cyan darken-2', '#0097a7'),
(4485, 'cyan darken-3', '#00838f'),
(4486, 'cyan darken-4', '#006064'),
(4487, 'cyan accent-1', '#84ffff'),
(4488, 'cyan accent-2', '#18ffff'),
(4489, 'cyan accent-3', '#00e5ff'),
(4490, 'cyan accent-4', '#00b8d4'),
(4491, 'teal lighten-5', '#e0f2f1'),
(4492, 'teal lighten-4', '#b2dfdb'),
(4493, 'teal lighten-3', '#80cbc4'),
(4494, 'teal lighten-2', '#4db6ac'),
(4495, 'teal lighten-1', '#26a69a'),
(4496, 'teal', '#009688'),
(4497, 'teal darken-1', '#00897b'),
(4498, 'teal darken-2', '#00796b'),
(4499, 'teal darken-3', '#00695c'),
(4500, 'teal darken-4', '#004d40'),
(4501, 'teal accent-1', '#a7ffeb'),
(4502, 'teal accent-2', '#64ffda'),
(4503, 'teal accent-3', '#1de9b6'),
(4504, 'teal accent-4', '#00bfa5'),
(4505, 'green lighten-5', '#e8f5e9'),
(4506, 'green lighten-4', '#c8e6c9'),
(4507, 'green lighten-3', '#a5d6a7'),
(4508, 'green lighten-2', '#81c784'),
(4509, 'green lighten-1', '#66bb6a'),
(4510, 'green', '#4caf50'),
(4511, 'green darken-1', '#43a047'),
(4512, 'green darken-2', '#388e3c'),
(4513, 'green darken-3', '#2e7d32'),
(4514, 'green darken-4', '#1b5e20'),
(4515, 'green accent-1', '#b9f6ca'),
(4516, 'green accent-2', '#69f0ae'),
(4517, 'green accent-3', '#00e676'),
(4518, 'green accent-4', '#00c853'),
(4519, 'light-green lighten-5', '#f1f8e9'),
(4520, 'light-green lighten-4', '#dcedc8'),
(4521, 'light-green lighten-3', '#c5e1a5'),
(4522, 'light-green lighten-2', '#aed581'),
(4523, 'light-green lighten-1', '#9ccc65'),
(4524, 'light-green', '#8bc34a'),
(4525, 'light-green darken-1', '#7cb342'),
(4526, 'light-green darken-2', '#689f38'),
(4527, 'light-green darken-3', '#558b2f'),
(4528, 'light-green darken-4', '#33691e'),
(4529, 'light-green accent-1', '#ccff90'),
(4530, 'light-green accent-2', '#b2ff59'),
(4531, 'light-green accent-3', '#76ff03'),
(4532, 'light-green accent-4', '#64dd17'),
(4533, 'lime lighten-5', '#f9fbe7'),
(4534, 'lime lighten-4', '#f0f4c3'),
(4535, 'lime lighten-3', '#e6ee9c'),
(4536, 'lime lighten-2', '#dce775'),
(4537, 'lime lighten-1', '#d4e157'),
(4538, 'lime', '#cddc39'),
(4539, 'lime darken-1', '#c0ca33'),
(4540, 'lime darken-2', '#afb42b'),
(4541, 'lime darken-3', '#9e9d24'),
(4542, 'lime darken-4', '#827717'),
(4543, 'lime accent-1', '#f4ff81'),
(4544, 'lime accent-2', '#eeff41'),
(4545, 'lime accent-3', '#c6ff00'),
(4546, 'lime accent-4', '#aeea00'),
(4547, 'yellow lighten-5', '#fffde7'),
(4548, 'yellow lighten-4', '#fff9c4'),
(4549, 'yellow lighten-3', '#fff59d'),
(4550, 'yellow lighten-2', '#fff176'),
(4551, 'yellow lighten-1', '#ffee58'),
(4552, 'yellow', '#ffeb3b'),
(4553, 'yellow darken-1', '#fdd835'),
(4554, 'yellow darken-2', '#fbc02d'),
(4555, 'yellow darken-3', '#f9a825'),
(4556, 'yellow darken-4', '#f57f17'),
(4557, 'yellow accent-1', '#ffff8d'),
(4558, 'yellow accent-2', '#ffff00'),
(4559, 'yellow accent-3', '#ffea00'),
(4560, 'yellow accent-4', '#ffd600'),
(4561, 'amber lighten-5', '#fff8e1'),
(4562, 'amber lighten-4', '#ffecb3'),
(4563, 'amber lighten-3', '#ffe082'),
(4564, 'amber lighten-2', '#ffd54f'),
(4565, 'amber lighten-1', '#ffca28'),
(4566, 'amber', '#ffc107'),
(4567, 'amber darken-1', '#ffb300'),
(4568, 'amber darken-2', '#ffa000'),
(4569, 'amber darken-3', '#ff8f00'),
(4570, 'amber darken-4', '#ff6f00'),
(4571, 'amber accent-1', '#ffe57f'),
(4572, 'amber accent-2', '#ffd740'),
(4573, 'amber accent-3', '#ffc400'),
(4574, 'amber accent-4', '#ffab00'),
(4575, 'orange lighten-5', '#fff3e0'),
(4576, 'orange lighten-4', '#ffe0b2'),
(4577, 'orange lighten-3', '#ffcc80'),
(4578, 'orange lighten-2', '#ffb74d'),
(4579, 'orange lighten-1', '#ffa726'),
(4580, 'orange', '#ff9800'),
(4581, 'orange darken-1', '#fb8c00'),
(4582, 'orange darken-2', '#f57c00'),
(4583, 'orange darken-3', '#ef6c00'),
(4584, 'orange darken-4', '#e65100'),
(4585, 'orange accent-1', '#ffd180'),
(4586, 'orange accent-2', '#ffab40'),
(4587, 'orange accent-3', '#ff9100'),
(4588, 'orange accent-4', '#ff6d00'),
(4589, 'deep-orange lighten-5', '#fbe9e7'),
(4590, 'deep-orange lighten-4', '#ffccbc'),
(4591, 'deep-orange lighten-3', '#ffab91'),
(4592, 'deep-orange lighten-2', '#ff8a65'),
(4593, 'deep-orange lighten-1', '#ff7043'),
(4594, 'deep-orange', '#ff5722'),
(4595, 'deep-orange darken-1', '#f4511e'),
(4596, 'deep-orange darken-2', '#e64a19'),
(4597, 'deep-orange darken-3', '#d84315'),
(4598, 'deep-orange darken-4', '#bf360c'),
(4599, 'deep-orange darken-1', '#ff9e80'),
(4600, 'deep-orange darken-2', '#ff6e40'),
(4601, 'deep-orange darken-3', '#ff3d00'),
(4602, 'deep-orange darken-4', '#dd2c00'),
(4603, 'brown lighten-5', '#efebe9'),
(4604, 'brown lighten-4', '#d7ccc8'),
(4605, 'brown lighten-3', '#bcaaa4'),
(4606, 'brown lighten-2', '#a1887f'),
(4607, 'brown lighten-1', '#8d6e63'),
(4608, 'brown', '#795548'),
(4609, 'brown darken-1', '#6d4c41'),
(4610, 'brown darken-2', '#5d4037'),
(4611, 'brown darken-3', '#4e342e'),
(4612, 'brown darken-4', '#3e2723'),
(4613, 'grey lighten-5', '#fafafa'),
(4614, 'grey lighten-4', '#f5f5f5'),
(4615, 'grey lighten-3', '#eeeeee'),
(4616, 'grey lighten-2', '#e0e0e0'),
(4617, 'grey lighten-1', '#bdbdbd'),
(4618, 'grey', '#9e9e9e'),
(4619, 'grey darken-1', '#757575'),
(4620, 'grey darken-2', '#616161'),
(4621, 'grey darken-3', '#424242'),
(4622, 'grey darken-4', '#212121'),
(4623, 'blue-grey lighten-5', '#eceff1'),
(4624, 'blue-grey lighten-4', '#cfd8dc'),
(4625, 'blue-grey lighten-3', '#b0bec5'),
(4626, 'blue-grey lighten-2', '#90a4ae'),
(4627, 'blue-grey lighten-1', '#78909c'),
(4628, 'blue-grey', '#607d8b'),
(4629, 'blue-grey darken-1', '#546e7a'),
(4630, 'blue-grey darken-2', '#455a64'),
(4631, 'blue-grey darken-3', '#37474f'),
(4632, 'blue-grey darken-4', '#263238'),
(4633, 'black', '#000000'),
(4634, 'white', '#ffffff'),
(4635, 'mdb-color lighten-5', '#d0d6e2'),
(4636, 'mdb-color lighten-4', '#b1bace'),
(4637, 'mdb-color lighten-3', '#929fba'),
(4638, 'mdb-color lighten-2', '#7283a7'),
(4639, 'mdb-color lighten-1', '#59698d'),
(4640, 'mdb-color', '#45526e'),
(4641, 'mdb-color darken-1', '#3b465e'),
(4642, 'mdb-color darken-2', '#2e3951'),
(4643, 'mdb-color darken-3', '#1c2a48'),
(4644, 'mdb-color darken-4', '#1c2331');

-- --------------------------------------------------------

--
-- Struttura della tabella `t_options`
--

CREATE TABLE `t_options` (
  `id` int(11) NOT NULL,
  `color_scheme` varchar(15) NOT NULL,
  `min_timestamp` int(11) NOT NULL,
  `max_timestamp` int(11) NOT NULL,
  `map` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `t_options`
--

INSERT INTO `t_options` (`id`, `color_scheme`, `min_timestamp`, `max_timestamp`, `map`) VALUES
(1, 'red darken-2', 0, 0, 'realistic');

-- --------------------------------------------------------

--
-- Struttura della tabella `t_sensors`
--

CREATE TABLE `t_sensors` (
  `id` int(11) NOT NULL,
  `measure_timestamp` int(11) NOT NULL,
  `id_node` varchar(15) NOT NULL,
  `humidity` decimal(5,2) NOT NULL,
  `celsius_temp` decimal(5,2) NOT NULL,
  `heatindex_celsius` decimal(5,2) NOT NULL,
  `rssi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `t_colors`
--
ALTER TABLE `t_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `t_options`
--
ALTER TABLE `t_options`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `t_sensors`
--
ALTER TABLE `t_sensors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `t_colors`
--
ALTER TABLE `t_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4645;

--
-- AUTO_INCREMENT per la tabella `t_options`
--
ALTER TABLE `t_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `t_sensors`
--
ALTER TABLE `t_sensors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
