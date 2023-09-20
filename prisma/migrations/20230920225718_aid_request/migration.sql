-- CreateTable
CREATE TABLE `AidRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(16) NULL,
    `address` VARCHAR(32) NULL,
    `category` VARCHAR(16) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `dateAdded` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateResolved` DATETIME(3) NULL,
    `family_members` INTEGER NOT NULL,
    `phone_num_1` VARCHAR(191) NOT NULL,
    `phone_num_2` VARCHAR(191) NULL,
    `status` VARCHAR(16) NOT NULL DEFAULT 'open',
    `tweetId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
