import express from "express";

const chatRouter = express();
chatRouter.use(express.json());

export { chatRouter };
