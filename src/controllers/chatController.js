import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const chats = await prisma.chat.findMany();

  return res.status(200).json(chats);
};

const create = async (req, res) => {
  const { email } = req.params;
  const { name } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
      isTeacher: true,
    },
  });

  if (!user) {
    return res.status(400).json("user email incorrect");
  }

  try {
    const chat = await prisma.chat.create({
      data: {
        name,
        Teacher: {
          connect: { id: user.id },
        },
      },
    });

    return res.status(201).json(chat);
  } catch (error) {
    return res.status(500).json(error, "chegou aqui");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, messages, conversations } = req.body;

  try {
    const chat = await prisma.chat.update({
      where: {
        id,
      },
      data: {
        name,
        messages,
        conversations,
      },
    });

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await prisma.chat.delete({
      where: {
        id,
      },
    });

    return res.status(204).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { getAll, create, update, deleteChat };
