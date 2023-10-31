import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const chats = await prisma.chat.findMany();

  return res.status(200).json(chats);
};

const create = async (req, res) => {
  const { email } = req.params;
  const { content, messageType, chat, chatId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
      isTeacher: true,
    },
  });

  try {
    const interaction = await prisma.interaction.create({
      data: {
        chat,
        chatId,
        Teacher: user.name,
        content,
        TeacherId: user.id,
        messageType,
      },
    });

    const newUser = await prisma.user.update({
      where: {
        email,
        isTeacher: true,
      },
      data: {
        messages: interaction,
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

const deleteChat = async (req, res) => {
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

export { getAll, create, update, deleteChat };
