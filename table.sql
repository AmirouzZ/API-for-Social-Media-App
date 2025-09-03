
CREATE TABLE `social`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `coverPic` VARCHAR(100) NULL,
  `proflePic` VARCHAR(100) NULL,
  `city` VARCHAR(45) NULL,
  `website` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


  CREATE TABLE `social`.`new_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NULL,
  `image` VARCHAR(200) NULL,
  `userId` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `social`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NOT NULL,
  `createdAt` DATETIME NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `commentUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `postId`
    FOREIGN KEY (`postId`)
    REFERENCES `social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `social`.`stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `img` VARCHAR(200) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `storyUserId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `storyUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
 

 CREATE TABLE `social`.`relationships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `followerUser` INT NOT NULL,
  `followedUser` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `followerUser_idx` (`followerUser` ASC) VISIBLE,
  INDEX `followedUser_idx` (`followedUser` ASC) VISIBLE,
  CONSTRAINT `followerUser`
    FOREIGN KEY (`followerUser`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `followedUser`
    FOREIGN KEY (`followedUser`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
 
 CREATE TABLE `social`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `likeUserId_idx` (`userId` ASC) VISIBLE,
  INDEX `likePostId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `likeUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `likePostId`
    FOREIGN KEY (`postId`)
    REFERENCES `social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
