import express from "express";

import {
  getAll,
  create,
  update,
  deleteInteraction,
} from "../controllers/interactionController.js";

const interRouter = express();
interRouter.use(express.json());

interRouter.get("/interactions", getAll);

interRouter.post("/create/interaction/:chatId", create);
interRouter.put("/update/interaction/:id", update);
interRouter.delete("/delete/interaction/:id", deleteInteraction);

export { interRouter };
