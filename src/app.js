const express = require("express");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
const redisClient = require("./utils/connectRedis");

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
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
