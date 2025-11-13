// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const entries = [
    // Movie 1
    {
      title: 'Dune',
      type: 'Movie',
      director: 'Denis Villeneuve',
      budget: '$165 million',
      location: 'Budapest, Hungary',
      duration: '155 mins',
      yearTime: '2021',
    },
    // Movie 2
    {
      title: 'Inception',
      type: 'Movie',
      director: 'Christopher Nolan',
      budget: '$160 million',
      location: 'Los Angeles, USA',
      duration: '148 mins',
      yearTime: '2010',
    },
    // TV Show 1
    {
      title: 'Arcane',
      type: 'TVShow',
      director: 'Pascal Charrue & Arnaud Delord',
      budget: 'Est. $9-10 million per episode',
      location: 'Fortis, France',
      duration: '40-45 mins/episode',
      yearTime: '2021-Present',
    },
    // TV Show 2
    {
      title: 'Succession',
      type: 'TVShow',
      director: 'Various',
      budget: 'Est. $5 million per episode',
      location: 'New York City, USA',
      duration: '60 mins/episode',
      yearTime: '2018-2023',
    },
  ];

  for (const data of entries) {
    try {
      await prisma.entry.create({ data });
      console.log(`Created entry: ${data.title}`);
    } catch (e) {
      if (e.code === 'P2002') {
        console.warn(`Skipping seeding '${data.title}', as it already exists.`);
      } else {
        throw e;
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
