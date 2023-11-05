/*
  Warnings:

  - The primary key for the `class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_code` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `class` table. All the data in the column will be lost.
  - The primary key for the `userclasstaken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `userclasstaken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `userclasstaken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_id]` on the table `class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_code` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_code` to the `UserClassTaken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taken_nim` to the `UserClassTaken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userclasstaken` DROP FOREIGN KEY `UserClassTaken_classId_fkey`;

-- DropForeignKey
ALTER TABLE `userclasstaken` DROP FOREIGN KEY `UserClassTaken_userId_fkey`;

-- DropIndex
DROP INDEX `class_course_code_key` ON `class`;

-- AlterTable
ALTER TABLE `class` DROP PRIMARY KEY,
    DROP COLUMN `course_code`,
    DROP COLUMN `name`,
    ADD COLUMN `class_code` VARCHAR(100) NOT NULL,
    ADD COLUMN `course_id` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`class_code`);

-- AlterTable
ALTER TABLE `userclasstaken` DROP PRIMARY KEY,
    DROP COLUMN `classId`,
    DROP COLUMN `userId`,
    ADD COLUMN `class_code` VARCHAR(100) NOT NULL,
    ADD COLUMN `taken_nim` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`taken_nim`, `class_code`);

-- CreateTable
CREATE TABLE `course` (
    `course_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `course_course_id_key`(`course_id`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `class_course_id_key` ON `class`(`course_id`);

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClassTaken` ADD CONSTRAINT `UserClassTaken_taken_nim_fkey` FOREIGN KEY (`taken_nim`) REFERENCES `user`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClassTaken` ADD CONSTRAINT `UserClassTaken_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `class`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
