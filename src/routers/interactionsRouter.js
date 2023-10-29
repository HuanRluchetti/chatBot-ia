import express from "express";

import {
  getAll,
  create,
  update,
} from "../controllers/interactionController.js";

const interRouter = express();
interRouter.use(express.json());

interRouter.get("/interactions", getAll);

interRouter.post("/create/interaction", create);
interRouter.put("/update/interaction/:email", update);
// interRouter.delete("/delete/interaction", deleteInteraction);

export { interRouter };
