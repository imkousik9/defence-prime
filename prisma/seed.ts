import { PrismaClient } from '@prisma/client';
import { videoData } from '../data/videos';
import { users } from '../data/users';
import { categories } from '../data/categories';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  for (const v of videoData) {
    const video = await prisma.video.create({
      data: v
    });
    console.log(`Created video with id: ${video.id}`);
  }

  for (const c of categories) {
    const category = await prisma.category.create({
      data: c
    });
    console.log(`Created video category with id: ${category.id}`);
  }

  for (const u of users) {
    const user = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
