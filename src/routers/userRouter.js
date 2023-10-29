import express from "express";
import {
  getAllUsers,
  getAllTeachers,
  getAllStudents,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
const userRouter = express();
userRouter.use(express.json());

userRouter.get("/users", getAllUsers);
userRouter.get("/users/teachers", getAllTeachers);
userRouter.get("/users/students", getAllStudents);

userRouter.post("/register/user", createUser);
userRouter.put("/update/user/:email", updateUser);
userRouter.delete("/delete/user/:email", deleteUser);

export { userRouter };
