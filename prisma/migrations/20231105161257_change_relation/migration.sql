/*
  Warnings:

  - You are about to drop the column `course_id` on the `class` table. All the data in the column will be lost.
  - You are about to drop the `class_taken_by_user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[class_code]` on the table `class` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `class_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_taken_by_user` DROP FOREIGN KEY `class_taken_by_user_class_code_fkey`;

-- DropForeignKey
ALTER TABLE `class_taken_by_user` DROP FOREIGN KEY `class_taken_by_user_taken_nim_fkey`;

-- AlterTable
ALTER TABLE `class` DROP COLUMN `course_id`;

-- DropTable
DROP TABLE `class_taken_by_user`;

-- CreateTable
CREATE TABLE `class_course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_code` VARCHAR(100) NOT NULL,
    `course_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_taken_user` (
    `taken_nim` VARCHAR(191) NOT NULL,
    `class_code` VARCHAR(100) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`taken_nim`, `class_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `class_class_code_key` ON `class`(`class_code`);

-- AddForeignKey
ALTER TABLE `class_course` ADD CONSTRAINT `class_course_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `class`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_course` ADD CONSTRAINT `class_course_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_taken_user` ADD CONSTRAINT `class_taken_user_taken_nim_fkey` FOREIGN KEY (`taken_nim`) REFERENCES `user`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_taken_user` ADD CONSTRAINT `class_taken_user_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `class`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
