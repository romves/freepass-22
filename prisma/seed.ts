// Import the Prisma Client
const { PrismaClient } = require('@prisma/client');

// Create a new Prisma Client instance
const prisma = new PrismaClient();

// Example: Creating a user with a specific role
async function createUser() {
  const userData = {
    nim: 'yourNim1',
    nama_lengkap: 'User 1',
    password: 'password1',
    role: 'STUDENT', // Use the actual enum value "STUDENT" or "ADMIN"
  };

  // Create the user with the specified role
  const user = await prisma.user.create({
    data: userData,
  });

  console.log('User created:', user);
}

// Call the createUser function to create a user with a specific role
createUser()
  .catch((error) => {
    console.error('Error creating user:', error);
  })
  .finally(async () => {
    // Disconnect from the Prisma Client
    await prisma.$disconnect();
  });
