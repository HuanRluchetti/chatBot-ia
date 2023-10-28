import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { request } from "express";

const prisma = new PrismaClient();

const getAllUsers = async (_, response) => {
  const users = await prisma.User.findMany();

  return response.status(200).json(users);
};

const getAllTeachers = async (_, response) => {
  // const teachers = await prisma.User;
  // return response.status(200).json(teachers);
};

const getAllStudents = async (_, response) => {
  const students = "students";

  return response.status(200).json(students);
};

const createUser = async (request, response) => {
  const { name, email, isTeacher } = request.body;
  try {
    const user = await prisma.User.create({
      data: {
        name,
        email,
        isTeacher,
      },
    });
    return response.status(201).json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
};

const updateUser = async (request, response) => {
  const { email } = request.params;
  const { name, isTeacher } = request.body;
  try {
    const user = await prisma.user.update({
      where: { email: String(email) },
      data: {
        name,
        isTeacher,
      },
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
};

const deleteUser = async (request, response) => {
  const { email } = request.params;
  try {
    const user = await prisma.user.delete({ where: { email: String(email) } });
    response.status(204).json(user);
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getAllStudents,
  getAllTeachers,
};

// examples

// post crate user

// app.post(`/user`, async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//     });
//     return res.json(user);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// put update user

// const { id } = req.params;
// const { name, email } = req.body;
// try {
//   const user = await prisma.user.update({
//     where: { id: Number(id) },
//     data: {
//       name,
//       email,
//     },
//   });
//   return res.json(user);
// } catch (error) {
//   return res.status(500).json(error);
// }

// delet user

//   const { id } = req.params;
// try {
//   const user = await prisma.user.delete({ where: { id: Number(id) }});
//   res.json(user);
// } catch (error) {
//   res.status(500).json({ error: 'Something went wrong' });
// }
