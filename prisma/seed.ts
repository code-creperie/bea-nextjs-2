import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { faker } from '@faker-js/faker'; // Import the faker library

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./bea.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {

  // Clear existing data (Optional)
  await prisma.comment.deleteMany();
  await prisma.book.deleteMany();
  console.log('Cleared existing Book and Comment data.');

  const numberOfBooksToCreate = faker.number.int({ min: 10, max: 20 }); // Between 10 and 20 books

  const createdBooks = []; // Array to hold the books we create

  for (let i = 0; i < numberOfBooksToCreate; i++) {
    // Generate somewhat realistic book titles using Faker
    const randomTitleWords = faker.lorem.words({ min: 2, max: 5 });
    // Simple capitalization for the title
    const bookTitle: string = randomTitleWords
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Generate a paragraph for the description
    const bookDescription = faker.lorem.paragraph({ min: 3, max: 7 });

    // Book generation
    const book = await prisma.book.create({
      data: {
        name: bookTitle,
        description: bookDescription,
      },
    });
    createdBooks.push(book); // Store the created book (including its ID)
  }
  console.log(`Successfully created ${createdBooks.length} books.`);

  // Comment generation
  for (const book of createdBooks) {
    const numberOfComments = faker.number.int({ min: 0, max: 10 }); // Between 0 and 10 comments per book

    if (numberOfComments > 0) {
      const commentsData = [];
      for (let j = 0; j < numberOfComments; j++) {
        commentsData.push({
          author: faker.person.fullName(), // Generate a fake author name
          commentText: faker.lorem.sentence({ min: 5, max: 20 }), // Generate a fake comment sentence
          bookId: book.id, // Link the comment to the current book's ID
        });
      }
      await prisma.comment.createMany({ data: commentsData });
    }
  }
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      name: 'Demo Reader',
      email: 'demo@bea.local',
      passwordHash,
    },
  });

  console.log('Created demo user: demo@bea.local / password123');

  console.log('Seeding finished.');
  
}

main()
  .catch(async (e) => {
    console.error('An error occurred during the seeding process:', e);
    await prisma.$disconnect();
    process.exit(1); // Exit with error code
  })
  .finally(async () => {
    await prisma.$disconnect();
  });