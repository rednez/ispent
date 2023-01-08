import { PrismaClient } from '@prisma/client';
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();
const userId = '1';

async function main() {
  await prisma.currency.createMany({
    data: [
      { name: 'UAH', userId },
      { name: 'CZK', userId },
    ],
  });

  const currencies = await prisma.currency.findMany();

  await prisma.group.createMany({
    data: [
      { name: 'Життя', color: '#39b21f', userId },
      { name: 'Навчання', color: '#c25203', userId },
      { name: 'Авто', color: '#da09d1', userId },
      { name: 'Інше', color: '#1f42ec', userId },
    ],
  });

  const groups = await prisma.group.findMany();

  await prisma.category.createMany({
    data: [
      { name: 'Продукти', color: '#1678c2', groupId: groups[0].id, userId },
      { name: 'Комуналка', color: '#dc9b12', groupId: groups[0].id, userId },

      { name: 'Математика', color: '#da5c04', groupId: groups[1].id, userId },
      { name: 'Менталка', color: '#107b8d', groupId: groups[1].id, userId },

      { name: 'Бензин', color: '#268311', groupId: groups[2].id, userId },
      { name: 'Мийка', color: '#a915a3', groupId: groups[2].id, userId },

      { name: 'Розваги', color: '#f6ad0f', groupId: groups[3].id, userId },
      { name: 'Кава', color: '#9c47ee', groupId: groups[3].id, userId },
    ],
  });

  const categories = await prisma.category.findMany({
    include: { group: true },
  });

  await prisma.operation.createMany({
    data: [
      {
        userId,
        amount: 1200,
        currencyId: currencies[1].id,
        categoryId: categories[0].id,
        groupId: categories[0].group.id,
      },
      {
        userId,
        amount: 980,
        currencyId: currencies[0].id,
        categoryId: categories[0].id,
        groupId: categories[0].group.id,
      },
      {
        userId,
        amount: 1890.3,
        currencyId: currencies[0].id,
        categoryId: categories[0].id,
        groupId: categories[0].group.id,
      },
      {
        userId,
        amount: 349.86,
        currencyId: currencies[1].id,
        categoryId: categories[0].id,
        groupId: categories[0].group.id,
        dateTime: new Date('2022-10-07'),
      },
      {
        userId,
        amount: 45.4,
        currencyId: currencies[1].id,
        categoryId: categories[1].id,
        groupId: categories[1].group.id,
        dateTime: new Date('2022-08-27'),
      },
      {
        userId,
        amount: 500.45,
        currencyId: currencies[1].id,
        categoryId: categories[1].id,
        groupId: categories[1].group.id,
        dateTime: new Date('2022-08-27'),
      },
      {
        userId,
        amount: 980.09,
        currencyId: currencies[1].id,
        categoryId: categories[0].id,
        groupId: categories[0].group.id,
        dateTime: new Date('2022-08-27'),
      },
      {
        userId,
        amount: 1980.1,
        currencyId: currencies[1].id,
        categoryId: categories[4].id,
        groupId: categories[4].group.id,
        dateTime: new Date('2022-08-27'),
      },
      {
        userId,
        amount: 120,
        currencyId: currencies[1].id,
        categoryId: categories[5].id,
        groupId: categories[5].group.id,
        dateTime: new Date('2022-08-27'),
      },
    ],
  });

  await prisma.budgetRecord.createMany({
    data: [
      {
        userId,
        amount: 11000,
        currencyId: currencies[1].id,
        groupId: groups[0].id,
        categoryId: categories[0].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 21000,
        currencyId: currencies[1].id,
        groupId: groups[0].id,
        categoryId: categories[1].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 1600,
        currencyId: currencies[1].id,
        groupId: groups[1].id,
        categoryId: categories[2].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 1200,
        currencyId: currencies[1].id,
        groupId: groups[1].id,
        categoryId: categories[3].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 8300,
        currencyId: currencies[1].id,
        groupId: groups[2].id,
        categoryId: categories[4].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 700,
        currencyId: currencies[1].id,
        groupId: groups[2].id,
        categoryId: categories[5].id,
        dateTime: parseISO('2022-08-05'),
      },
      {
        userId,
        amount: 11300,
        currencyId: currencies[1].id,
        groupId: groups[0].id,
        categoryId: categories[0].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 8000,
        currencyId: currencies[0].id,
        groupId: groups[0].id,
        categoryId: categories[0].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 20000,
        currencyId: currencies[1].id,
        groupId: groups[0].id,
        categoryId: categories[1].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 1700,
        currencyId: currencies[1].id,
        groupId: groups[1].id,
        categoryId: categories[2].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 950,
        currencyId: currencies[1].id,
        groupId: groups[1].id,
        categoryId: categories[3].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 8300,
        currencyId: currencies[1].id,
        groupId: groups[2].id,
        categoryId: categories[4].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 700,
        currencyId: currencies[1].id,
        groupId: groups[2].id,
        categoryId: categories[5].id,
        dateTime: parseISO('2022-09-05'),
      },
      {
        userId,
        amount: 12000,
        currencyId: currencies[0].id,
        groupId: groups[0].id,
        categoryId: categories[0].id,
      },
      {
        userId,
        amount: 23000,
        currencyId: currencies[0].id,
        groupId: groups[0].id,
        categoryId: categories[1].id,
      },
      {
        userId,
        amount: 1800,
        currencyId: currencies[0].id,
        groupId: groups[1].id,
        categoryId: categories[2].id,
      },
      {
        userId,
        amount: 1000,
        currencyId: currencies[0].id,
        groupId: groups[1].id,
        categoryId: categories[3].id,
      },
      {
        userId,
        amount: 8000,
        currencyId: currencies[0].id,
        groupId: groups[2].id,
        categoryId: categories[4].id,
      },
      {
        userId,
        amount: 500,
        currencyId: currencies[0].id,
        groupId: groups[2].id,
        categoryId: categories[5].id,
      },
    ],
  });
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
