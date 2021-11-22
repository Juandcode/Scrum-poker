-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("userId","roomId")
);

-- CreateTable
CREATE TABLE "Estimation" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Estimation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryEstimation" (
    "value" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "estimationId" INTEGER NOT NULL,

    CONSTRAINT "StoryEstimation_pkey" PRIMARY KEY ("userId","roomId","estimationId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryEstimation" ADD CONSTRAINT "StoryEstimation_userId_roomId_fkey" FOREIGN KEY ("userId", "roomId") REFERENCES "Story"("userId", "roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryEstimation" ADD CONSTRAINT "StoryEstimation_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "Estimation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
