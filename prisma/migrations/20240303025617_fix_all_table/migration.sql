/*
  Warnings:

  - You are about to drop the column `cinema_id` on the `cinema` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `movie` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `Decimal(1,1)`.
  - You are about to drop the column `seat_id` on the `seat` table. All the data in the column will be lost.
  - You are about to drop the column `showtime_id` on the `showtime` table. All the data in the column will be lost.
  - Added the required column `id` to the `cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `showtime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "showtime" DROP CONSTRAINT "showtime_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "showtime" DROP CONSTRAINT "showtime_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_seatId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_showtimeId_fkey";

-- DropIndex
DROP INDEX "cinema_cinema_id_key";

-- DropIndex
DROP INDEX "movie_movie_id_key";

-- DropIndex
DROP INDEX "seat_seat_id_key";

-- DropIndex
DROP INDEX "showtime_showtime_id_key";

-- AlterTable
ALTER TABLE "cinema" DROP COLUMN "cinema_id",
ADD COLUMN     "id" VARCHAR(10) NOT NULL,
ADD CONSTRAINT "cinema_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "movie" DROP COLUMN "banner",
DROP COLUMN "movie_id",
ADD COLUMN     "id" VARCHAR(50) NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(1,1),
ADD CONSTRAINT "movie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "seat" DROP COLUMN "seat_id",
ADD COLUMN     "id" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "seat_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "showtime" DROP COLUMN "showtime_id",
ADD COLUMN     "id" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "showtime_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "banner" (
    "id" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "carouselId" TEXT NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carousel" (
    "id" VARCHAR(255) NOT NULL,

    CONSTRAINT "carousel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "showtime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "carousel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
