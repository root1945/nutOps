/*
  Warnings:

  - Added the required column `sector` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN `sector` VARCHAR(191) NOT NULL;
