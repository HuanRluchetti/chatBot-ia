import express from "express";
import {} from "dotenv/config";
import { PrismaClient } from "@prisma/client";
import validateEnv from "./utils/validateEnv.js";
import redisClient from "./utils/connectRedis.js";

validateEnv();

console.log("comesssou");

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  // Testing
  console.log("TESTING");
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
  });
