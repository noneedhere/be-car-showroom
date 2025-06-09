/*
  Warnings:

  - You are about to drop the column `categoty` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `categoty`,
    ADD COLUMN `category` ENUM('SPORT', 'FAMILY') NOT NULL DEFAULT 'FAMILY';
