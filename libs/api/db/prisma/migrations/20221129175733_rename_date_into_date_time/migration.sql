/*
  Warnings:

  - You are about to drop the column `date` on the `BudgetRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BudgetRecord" DROP COLUMN "date",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
