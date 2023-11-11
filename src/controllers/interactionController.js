import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const inter = await prisma.interaction.findMany();

  return res.status(200).json(inter);
};

const create = async (req, res) => {
  const { chatId } = req.params;
  const { content, messageType } = req.body;

  const convertedId = Number(chatId);

  const chat = await prisma.chat.findUnique({
    where: {
      id: convertedId,
    },
  });

  if (!chat) return res.status(400).json("chat not found");

  try {
    const interaction = await prisma.interaction.create({
      data: {
        chat: {
          connect: { id: chat.id },
        },
        content,
        Teacher: {
          connect: { id: chat.TeacherId },
        },
        messageType,
      },
    });

    return res.status(201).json(interaction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { content, messageType, chat } = req.body;

  const current = await prisma.interaction.findUnique({
    where: {
      id,
    },
  });

  try {
    const interaction = await prisma.interaction.update({
      where: {
        id,
      },
      data: {
        chat: chat || current.chat,
        content: content || current.content,
        messageType: messageType || current.messageType,
      },
    });

    return res.status(200).json(interaction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteInteraction = async (req, res) => {
  const { id } = req.params;

  try {
    const interaction = await prisma.interaction.delete({
      where: {
        id,
      },
    });

    return res.status(204).json(interaction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { getAll, create, update, deleteInteraction };
