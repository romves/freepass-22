// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function createUser() {
//   const userData = {
//     nim: 'yourNim1',
//     nama_lengkap: 'User 1',
//     password: 'password1',
//     role: 'STUDENT', 
//   };

//   const user = await prisma.user.create({
//     data: userData,
//   });

//   console.log('User created:', user);
// }

// // Call the createUser function to create a user with a specific role
// createUser()
//   .catch((error) => {
//     console.error('Error creating user:', error);
//   })
//   .finally(async () => {
//     // Disconnect from the Prisma Client
//     await prisma.$disconnect();
//   });

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const courses = [
    {
      course_id: 'COMPSCI101',
      name: 'Introduction to Computer Science',
    },
    {
      course_id: 'MATH202',
      name: 'Advanced Calculus',
    },
    {
      course_id: 'HISTORY101',
      name: 'World History: Ancient to Modern',
    },
    {
      course_id: 'PHYSICS301',
      name: 'Quantum Physics',
    },
    {
      course_id: 'ENGLIT101',
      name: 'Introduction to Literature',
    },
    {
      course_id: 'CHEM101',
      name: 'General Chemistry',
    },
    {
      course_id: 'PSYCH101',
      name: 'Introduction to Psychology',
    },
    {
      course_id: 'BIOLOGY201',
      name: 'Cell Biology',
    },
    {
      course_id: 'BUSINESS202',
      name: 'Marketing Strategy',
    },
    // Add more course objects as needed
  ];

  for (const course of courses) {
    const { course_id, name } = course;
    await prisma.course.create({
      data: {
        course_id,
        name,
      },
    });
  }

  console.log('Courses seeded successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
