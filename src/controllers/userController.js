import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUsers = async (_, response) => {
  const users = await prisma.User.findMany();

  return response.status(200).json(users);
};

const getAllTeachers = async (_, response) => {
  const teachers = await prisma.user.findMany({
    where: {
      isTeacher: true,
    },
  });

  return response.status(200).json(teachers);
};

const getAllStudents = async (_, response) => {
  const students = await prisma.user.findMany({
    where: {
      isTeacher: false,
    },
  });

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
