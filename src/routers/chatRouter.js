import express from "express";
import {
  getAll,
  create,
  update,
  deleteChat,
} from "../controllers/chatController.js";

const chatRouter = express();
chatRouter.use(express.json());

chatRouter.get("/chats", getAll);
chatRouter.post("/register/chat/:email", create);
chatRouter.put("/update/chat/:id", update);
chatRouter.delete("/delete/chat/:id", deleteChat);

export { chatRouter };
