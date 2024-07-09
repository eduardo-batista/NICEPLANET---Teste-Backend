-- CreateTable
CREATE TABLE `Productor` (
    `idProductor` INTEGER NOT NULL AUTO_INCREMENT,
    `nameProductor` VARCHAR(191) NOT NULL,
    `cpfProductor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Productor_cpfProductor_key`(`cpfProductor`),
    PRIMARY KEY (`idProductor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `idProperty` INTEGER NOT NULL AUTO_INCREMENT,
    `nameProperty` VARCHAR(191) NOT NULL,
    `agroRegister` VARCHAR(191) NOT NULL,
    `productorId` INTEGER NOT NULL,

    UNIQUE INDEX `Property_agroRegister_key`(`agroRegister`),
    INDEX `Property_productorId_idx`(`productorId`),
    PRIMARY KEY (`idProperty`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_productorId_fkey` FOREIGN KEY (`productorId`) REFERENCES `Productor`(`idProductor`) ON DELETE RESTRICT ON UPDATE CASCADE;
