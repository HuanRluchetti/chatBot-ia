import { PrismaClient } from "@prisma/client";
import { OpenAI } from "openai";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const conversation = await prisma.conversation.findMany();

  return res.status(200).json(conversation);
};

const upsert = async (req, res) => {
  const { chatId, convID } = req.params;
  const { message } = req.body;

  try {
    const interaction = await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId),
      },
      include: {
        messages: true,
      },
    });

    const sysPreSet = interaction.messages[0].content;

    const configuration = {
      organization: "org-58ZC4z9BAv8xkpkrSegCqBRg",
      apiKey: process.env.OPENAI_API_KEY,
    };

    const openai = new OpenAI(configuration);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: sysPreSet,
        },
        {
          role: "user",
          content: "Você pode me ajudar com uma duvida?",
        },
        {
          role: "assistant",
          content: "Claro, estou a seu dispor, oq deseja saber?",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 2048,
      temperature: 0.5,
    });

    const user = await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId),
      },
    });

    let idConv;

    if (convID) {
      idConv = convID;
    } else {
      idConv = -1;
    }

    const conversation = await prisma.conversation.upsert({
      where: {
        chatId: parseInt(chatId),
        id: parseInt(idConv),
      },
      update: {
        dateTime: new Date(),
      },
      create: {
        chat: {
          connect: {
            id: parseInt(chatId),
          },
        },
        dateTime: new Date(),
        participants: {
          connect: {
            id: user.TeacherId,
          },
        },
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { upsert, getAll };
