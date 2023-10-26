import express from "express";
import {
  getAllUsers,
  getAllTeachers,
  getAllStudents,
  postUserRegister,
  deleteUser,
} from "./controllers/userController.js";
const router = express();

console.log("dentro do router");
router.get("/users/get-all", getAllUsers);
router.get("/users/get-teachers", getAllTeachers);
router.get("/users/get-students", getAllStudents);

router.post("/register/user", postUserRegister);
router.delete("/delete/user", deleteUser);

export { router };
