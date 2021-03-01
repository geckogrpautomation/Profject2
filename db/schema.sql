CREATE SCHEMA `project2` ;

CREATE TABLE `project2`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`));


  CREATE TABLE `project2`.`token` (  
  `token` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`token`));
