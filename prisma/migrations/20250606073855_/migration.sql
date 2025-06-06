-- CreateTable
CREATE TABLE `SaleList` (
    `id_saleList` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `note` TEXT NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `carId` INTEGER NULL,
    `saleId` INTEGER NULL,

    UNIQUE INDEX `SaleList_uuid_key`(`uuid`),
    PRIMARY KEY (`id_saleList`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SaleList` ADD CONSTRAINT `SaleList_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id_car`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleList` ADD CONSTRAINT `SaleList_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id_sale`) ON DELETE SET NULL ON UPDATE CASCADE;
