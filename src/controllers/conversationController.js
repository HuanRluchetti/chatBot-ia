import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async (_, res) => {
  const conversation = await prisma.conversation.findMany();

  return res.status(200).json(conversation);
};

const upsert = async (req, res) => {
  const { chatId, convId } = req.params;
  const { name } = req.body;

  try {
    const conversation = await prisma.conversation.upsert({
      where: {
        email: "viola@prisma.io",
      },
      update: {
        name: "Viola the Magnificent",
      },
      create: {
        email: "viola@prisma.io",
        name: "Viola the Magnificent",
      },
    });
    return res.status(200).json(interaction);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// upsert modell

// const upsertUser = await prisma.user.upsert({
//     where: {
//       email: 'viola@prisma.io',
//     },
//     update: {
//       name: 'Viola the Magnificent',
//     },
//     create: {
//       email: 'viola@prisma.io',
//       name: 'Viola the Magnificent',
//     },
//   })
