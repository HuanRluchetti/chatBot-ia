import express from "express";
import {
  getAllUsers,
  getAllTeachers,
  getAllStudents,
  createUser,
  deleteUser,
  updateUser,
} from "./controllers/userController.js";
const router = express();
router.use(express.json());

router.get("/users/get-all", getAllUsers);
router.get("/users/get-teachers", getAllTeachers);
router.get("/users/get-students", getAllStudents);

router.post("/register/user", createUser);
router.put("/update/user/:email", updateUser);
router.delete("/delete/user/:email", deleteUser);

export { router };
