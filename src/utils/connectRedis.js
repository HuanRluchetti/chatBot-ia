const { createClient } = require("redis");
const redisUrl = "redis://localhost:6379";

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = () => {
  redisClient.on("connect", () => {
    console.log("Redis client connect successfully");
    redisClient.set("try", "Welcome to Express and TypeScript with Prisma");
  });

  redisClient.on("error", (error) => {
    console.log(error, "Não foi possivel se connectar com o redis");
    setTimeout(connectRedis, 5000);
  });
};

connectRedis();

exports.modules = connectRedis();
