import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function categoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.category.findMany({});
  res.status(200).json(data);
}
