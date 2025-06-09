/*
  Warnings:

  - The primary key for the `car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `car` table. All the data in the column will be lost.
  - The primary key for the `sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sale` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - The values [SALES] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `id_car` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sale` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `profilePicture` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_carId_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_userId_fkey`;

-- DropIndex
DROP INDEX `Sale_carId_fkey` ON `sale`;

-- DropIndex
DROP INDEX `Sale_userId_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `car` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_car` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_car`);

-- AlterTable
ALTER TABLE `sale` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_sale` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_sale`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `profilePicture` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `role` ENUM('MANAGER', 'SALES') NOT NULL DEFAULT 'MANAGER',
    ADD PRIMARY KEY (`id_user`);

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id_car`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
