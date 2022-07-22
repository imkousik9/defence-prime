import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryId = req.query['categoryId'];
  console.log(categoryId);
  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(404).json({ message: 'categoryId is not valid' });
  }

  const data = await prisma.categories.findFirst({
    where: {
      id: {
        equals: categoryId
      }
    }
  });

  res.status(200).json(data);
}
