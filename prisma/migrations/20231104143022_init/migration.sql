-- CreateTable
CREATE TABLE `user` (
    `nim` VARCHAR(15) NOT NULL,
    `nama_lengkap` VARCHAR(200) NOT NULL,
    `role` ENUM('STUDENT', 'ADMIN') NOT NULL,

    UNIQUE INDEX `user_nim_key`(`nim`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `course_code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `class_course_code_key`(`course_code`),
    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserClassTaken` (
    `userId` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `classId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserClassTaken` ADD CONSTRAINT `UserClassTaken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClassTaken` ADD CONSTRAINT `UserClassTaken_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `class`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
