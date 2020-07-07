import express from 'express';
import { Topic, Comment, User } from './models';

const app = express();
const port = 3000;

app.get('/topic/:id', async (req, res) => {
  const { id } = req.params;
  const topic = await Topic.findOne({
    where: { id },
    include: [
      {
        model: Comment,
        include: [
          { model: User, as: 'from_user' },
          { model: User, as: 'to_user' },
        ],
      },
    ],
  });
  res.json({ data: topic });
});

app.listen(port, () => console.log(`HTTP server is listening on http://localhost:${port}`));
