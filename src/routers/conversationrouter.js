import express from "express";

const conversationRouter = express();
conversationRouter.use(express.json());

conversationRouter.get("/conversation", getAll);
conversationRouter.put("/register/conversation/:email", interact);
conversationRouter.delete("/delete/conversation/:id", deleteChat);

export { conversationRouter };
