// import { PrismaClient } from "@prisma/client";
// import { db } from "../src/utils/db.server";


// const prisma = new PrismaClient();

// type User = {
//   email: string;
//   name: string;
// };

// type Appointment = {
//   email: string;
//   name: string;
//   phone: string;
//   address: string;
//   date: string;
// };

// async function seed() {
//   await prisma.user.create({
//     data: {
//       email: 'test@gmail.com12333',
//       name: 'ADMIN',
//     },
//   });

//   // await Promise.all(
//   //   getUsers().map((user) => {
//   //     return db.user.create({
//   //       data: {
//   //         name: user.name,
//   //         email: user.email,
//   //       },
//   //     });
//   //   })
//   // );

//   // const user = await db.user.findFirst({
//   //   where: {
//   //     name: "dammy",
//   //   },
//   // });


//   // await Promise.all(
//   //   getAppointments().map((appointment) => {
//   //     const { name, email,phone,address,date } = appointment;
//   //     return db.appointment.create({
//   //       data: {
//   //           name, email,phone,address,date, userId: user?.id || 1
//   //       },
//   //     });
//   //   })
//   // );
// }

// seed();


// function getUsers(): Array<User> {
//     return [
//       {
//         name: "Johndoe",
//         email: "john@gmail.com",
//       },
//       {
//         name: "mike",
//         email: "mike123@gmail.com",
//       },
//       {
//         name: "dammy",
//         email: "dammy@gmail.com",
//       },
//     ];
//   }
  
//   function getAppointments(): Array<Appointment> {
//     return [
//       {
//         name: "Johndoe",
//         email: "gggggg11@gmail.com",
//         phone: "1111111",
//         address: "ddd",
//         date: "date",
//       },
//     ];
//   }
  


import { PrismaClient } from "@prisma/client";
// import { db } from "../src/utils/db.server";

// Instantiate Prisma client
const prisma = new PrismaClient();

// Define the data to seed
const userData = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

const appointmentData = [
  { name: "John Doe", email: "john@example.com", phone: "1111111", address: "123 Main St", date: "2024-04-05", userId: 1113  },
  { name: "Jane Smith", email: "jane@example.com", phone: "2222222", address: "456 Elm St", date: "2024-04-06", userId: 1112  },
];

// Function to seed data into users table
async function seedUsers() {
  try {
    // Use Prisma client to create users
    await Promise.all(userData.map(user => {
      return prisma.user.create({
        data: user,
      });
    }));
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Function to seed data into appointments table
async function seedAppointments() {
  try {
    // Use Prisma client to create appointments
    await Promise.all(appointmentData.map(appointment => {
      return prisma.appointment.create({
        data: appointment,
      });
    }));
    console.log('Appointments seeded successfully');
  } catch (error) {
    console.error('Error seeding appointments:', error);
  }
}

// Function to seed data into the database
async function seedData() {
  await seedUsers();
  // await seedAppointments();
  // Disconnect Prisma client after seeding
  await prisma.$disconnect();
}

// Call the seedData function to initiate seeding
seedData();
