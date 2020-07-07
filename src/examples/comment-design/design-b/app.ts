import express from 'express';
import { Topic, Comment } from './models';

const app = express();
const port = 3000;

app.get('/topic/:id', async (req, res) => {
  const { id } = req.params;
  const topic = await Topic.findOne({
    where: { id },
    include: [{ model: Comment, attributes: ['id', 'content', 'user_id', 'parent_id', 'created_at'] }],
    order: [[Comment, 'created_at', 'asc']],
  });
  const topicDTO = topic.toJSON();
  topicDTO.comments = getComments(topicDTO.comments);
  res.json({ data: topicDTO });
});

function getComments(comments) {
  const r: any[] = [];
  const m = new Map();
  comments.forEach((c) => {
    if (c.parent_id === null) {
      r.push(c);
    }
    m.set(c.id, c);
  });
  comments.forEach((c) => {
    if (c.parent_id !== null) {
      const parentComment = m.get(c.parent_id);
      if (!parentComment.children) {
        parentComment.children = [];
      }
      parentComment.children.push(c);
    }
  });
  return r;
}

app.listen(port, () => console.log(`HTTP server is listening on http://localhost:${port}`));
