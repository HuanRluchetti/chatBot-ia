import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";
import { OpenAI } from "openai";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const inter = await prisma.interaction.findMany();

  return res.status(200).json(inter);
};

const create = async (req, res) => {
  const { chatId, intId } = req.params;
  const { content, messageType } = req.body;

  const convertedId = Number(chatId);

  const chat = await prisma.chat.findUnique({
    where: {
      id: convertedId,
    },
  });

  if (!chat) return res.status(400).json("chat not found");

  let realIntId;
  if (intId == null) {
    realIntId = -1;
  } else {
    realIntId = intId;
  }

  try {
    const interaction = await prisma.interaction.upsert({
      where: {
        id: Number(realIntId),
      },
      update: {
        content,
        messageType,
      },
      create: {
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

    const configuration = {
      apiKey: process.env.OPENAI_API_KEY,
    };

    const openai = new OpenAI(configuration);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be a teacher, on a certain online platform, and you will have to answer questions about the course content and how the course works",
        },
        {
          role: "user",
          content: interaction.content,
        },
        {
          role: "professor",
          content: interaction.messageType,
        },
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    });

    return res.status(201).json(response.choices[0]);
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
