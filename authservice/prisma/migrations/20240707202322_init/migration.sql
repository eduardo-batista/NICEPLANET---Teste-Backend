-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `passwordUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_nameUser_key`(`nameUser`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
