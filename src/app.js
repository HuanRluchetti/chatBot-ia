import express, { application } from "express";
import { PrismaClient } from "@prisma/client";

import validateEnv from "./utils/validateEnv.js";
import redisClient from "./utils/connectRedis.js";

import { userRouter } from "./routers/userRouter.js";
import { chatRouter } from "./routers/chatRouter.js";
import { interRouter } from "./routers/interactionsRouter.js";

import {} from "dotenv/config";

validateEnv();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

async function bootstrap() {
  app.get("/api/healthchecker", async (_, res) => {
    const message = await redisClient.get("try");
    res.status(200).json({
      status: "success",
      message,
    });
  });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
    app.use(userRouter);
    app.use(interRouter);
    app.use(chatRouter);
  });
