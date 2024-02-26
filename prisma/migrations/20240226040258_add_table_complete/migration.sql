-- Create extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CreateTable
CREATE TABLE "movie" (
    "movie_id" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "ongoing" BOOLEAN NOT NULL,
    "rating" DECIMAL(1,1) NOT NULL,
    "release_date" DATE NOT NULL,
    "banner" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "genre" VARCHAR(50) NOT NULL
);

-- CreateTable
CREATE TABLE "cinema" (
    "cinema_id" VARCHAR(10) NOT NULL,
    "cinema_number" VARCHAR(10) NOT NULL
);

-- CreateTable
CREATE TABLE "seat" (
    "seat_id" VARCHAR(255) NOT NULL,
    "seat_number" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "showtime" (
    "showtime_id" VARCHAR(50) NOT NULL,
    "cinemaId" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ NOT NULL,
    "movieId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "userName" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "showtimeId" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_movie_id_key" ON "movie"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "cinema_cinema_id_key" ON "cinema"("cinema_id");

-- CreateIndex
CREATE UNIQUE INDEX "seat_seat_id_key" ON "seat"("seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "showtime_showtime_id_key" ON "showtime"("showtime_id");

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("cinema_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_userName_fkey" FOREIGN KEY ("userName") REFERENCES "user"("user_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "showtime"("showtime_id") ON DELETE CASCADE ON UPDATE CASCADE;
