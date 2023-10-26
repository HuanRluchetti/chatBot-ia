import { response } from "express";

const getAllUsers = async (_request, response) => {
  const users = "users";

  return response.status(200).json(users);
};

const getAllTeachers = async (_request, response) => {
  const teachers = "teachers";

  return response.status(200).json(teachers);
};

const getAllStudents = async (_, response) => {
  const students = "students";

  return response.status(200).json(students);
};

const postUserRegister = async (request, response) => {
  const succcess = "success";

  return response.status(200).json(succcess);
};

const deleteUser = async (request, response) => {
  const succcess = "succcess";

  return response.status(200).json(succcess);
};

export {
  deleteUser,
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  postUserRegister,
};
