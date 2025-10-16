/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';
import * as bcrypt from 'bcryptjs';

async function seed() {
  await connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/expense_day8',
  );
  console.log('Connected for seeding');
  const db = (await import('mongoose')).connection.db;
  await db.dropDatabase();
  const usersCol = db.collection('users');
  const pw = await bcrypt.hash('secret123', 10);
  const u = await usersCol.insertOne({
    name: 'Demo',
    email: 'demo@example.com',
    password: pw,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const userId = u.insertedId;
  const cats = db.collection('categories');
  const food = await cats.insertOne({
    userId,
    name: 'Food',
    slug: 'food',
    color: '#ff0000',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const travel = await cats.insertOne({
    userId,
    name: 'Travel',
    slug: 'travel',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const exps = db.collection('expenses');
  await exps.insertMany([
    {
      userId,
      title: 'Lunch',
      amount: 50,
      categoryId: food.insertedId,
      date: new Date(),
      paymentMethod: 'cash',
      tags: [],
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId,
      title: 'Taxi',
      amount: 100,
      categoryId: travel.insertedId,
      date: new Date(),
      paymentMethod: 'bkash',
      tags: [],
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('Seed done. demo@example.com / secret123');
  process.exit(0);
}
seed();
