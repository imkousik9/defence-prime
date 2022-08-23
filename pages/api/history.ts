import { protect, addHistory, getHistory } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function historyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = protect(req, res);

  if (!userId) {
    return res.end();
  }

  if (req.method === 'POST') {
    const { id, title, channelName } = req.body;

    try {
      const history = addHistory({
        req,
        userId,
        id,
        title,
        channelName
      });

      res.setHeader('Set-Cookie', history);

      return res.end();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'GET') {
    try {
      const history = getHistory(req, userId);

      return res.status(201).json(history);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
