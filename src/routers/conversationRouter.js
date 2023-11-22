import express from "express";

import { upsert } from "../controllers/conversationController.js";

const conversationRouter = express();
conversationRouter.use(express.json());

conversationRouter.put("/conversation/:chatId/:convID?", upsert);
// conversationRouter.delete("/delete/conversation/:id", deleteChat);

export { conversationRouter };
