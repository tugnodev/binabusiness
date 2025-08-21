-- CreateTable
CREATE TABLE "public"."User" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(256),
    "vendeur" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Articles" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "images" VARCHAR(255) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "price" BIGINT NOT NULL,
    "stocke" BIGINT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comments" (
    "id" BIGSERIAL NOT NULL,
    "comments" VARCHAR(200) NOT NULL,
    "articleId" BIGINT NOT NULL,
    "buyerId" BIGINT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Messagers" (
    "id" BIGSERIAL NOT NULL,
    "message" VARCHAR(512) NOT NULL,
    "senderId" BIGINT NOT NULL,
    "receiverId" BIGINT NOT NULL,
    "date" BIGINT NOT NULL,

    CONSTRAINT "Messagers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Numbers" (
    "id" BIGINT NOT NULL,
    "number" BIGINT NOT NULL,
    "sellerId" BIGINT NOT NULL,

    CONSTRAINT "Numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Orders" (
    "id" BIGSERIAL NOT NULL,
    "articleDetails" JSONB NOT NULL,
    "buyerId" BIGINT NOT NULL,
    "sellerId" BIGINT NOT NULL,
    "orderTime" VARCHAR(255),
    "orderStatus" VARCHAR(255) NOT NULL DEFAULT 'init',

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cards" (
    "id" BIGSERIAL NOT NULL,
    "cardDetails" JSONB NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuthKey" (
    "id" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "hashedPassword" TEXT,
    "primary" BOOLEAN NOT NULL,
    "expires" TIMESTAMP(3),

    CONSTRAINT "AuthKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuthSession" (
    "id" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "activeExpires" BIGINT NOT NULL,
    "idleExpires" BIGINT NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Numbers_number_key" ON "public"."Numbers"("number");

-- AddForeignKey
ALTER TABLE "public"."Articles" ADD CONSTRAINT "Articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messagers" ADD CONSTRAINT "Messagers_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messagers" ADD CONSTRAINT "Messagers_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Numbers" ADD CONSTRAINT "Numbers_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuthKey" ADD CONSTRAINT "AuthKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
