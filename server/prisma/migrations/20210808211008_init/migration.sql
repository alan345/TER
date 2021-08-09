-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'GOD_ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'STANDARD', 'PRO');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RUR', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SPORT', 'TECHNOLOGY', 'PROGRAMMING', 'POLITICS', 'RELIGION', 'GLOBAL_WARMING', 'PHILOSOPHY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userRole" "UserRole" NOT NULL DEFAULT E'USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "type" "SubscriptionType" NOT NULL DEFAULT E'FREE',
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT E'RUR',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "sourceUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "categories" "Category"[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserArticleIneraction" (
    "userId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "isHidden" BOOLEAN NOT NULL,
    "isMarkedAsReadLater" BOOLEAN NOT NULL,
    "isMarkedAsRead" BOOLEAN NOT NULL,

    PRIMARY KEY ("userId","articleId")
);

-- CreateTable
CREATE TABLE "_FollowingArticleSources" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleSourceToFeed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Feed.name_unique" ON "Feed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleSource.name_unique" ON "ArticleSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowingArticleSources_AB_unique" ON "_FollowingArticleSources"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowingArticleSources_B_index" ON "_FollowingArticleSources"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleSourceToFeed_AB_unique" ON "_ArticleSourceToFeed"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleSourceToFeed_B_index" ON "_ArticleSourceToFeed"("B");

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleSource" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD FOREIGN KEY ("sourceId") REFERENCES "ArticleSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticleIneraction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticleIneraction" ADD FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowingArticleSources" ADD FOREIGN KEY ("A") REFERENCES "ArticleSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowingArticleSources" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleSourceToFeed" ADD FOREIGN KEY ("A") REFERENCES "ArticleSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleSourceToFeed" ADD FOREIGN KEY ("B") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
