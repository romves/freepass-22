/*
  Warnings:

  - You are about to drop the `userclasstaken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userclasstaken` DROP FOREIGN KEY `UserClassTaken_class_code_fkey`;

-- DropForeignKey
ALTER TABLE `userclasstaken` DROP FOREIGN KEY `UserClassTaken_taken_nim_fkey`;

-- DropTable
DROP TABLE `userclasstaken`;

-- CreateTable
CREATE TABLE `class_taken_by_user` (
    `taken_nim` VARCHAR(191) NOT NULL,
    `class_code` VARCHAR(100) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`taken_nim`, `class_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_taken_by_user` ADD CONSTRAINT `class_taken_by_user_taken_nim_fkey` FOREIGN KEY (`taken_nim`) REFERENCES `user`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_taken_by_user` ADD CONSTRAINT `class_taken_by_user_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `class`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
