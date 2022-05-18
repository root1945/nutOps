/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar`;

-- CreateTable
CREATE TABLE `avatar` (
    `id` VARCHAR(191) NOT NULL,
    `createBy` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avatar` ADD CONSTRAINT `avatar_createBy_fkey` FOREIGN KEY (`createBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
