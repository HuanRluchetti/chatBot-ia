pp.post("/user/:id/profile", async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  const profile = await prisma.profile.create({
    data: {
      bio,
      user: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  res.json(profile);
});
