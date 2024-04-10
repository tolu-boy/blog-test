// import { PrismaClient, } from '@prisma/client'
import { db } from "../src/utils/db.server";
import * as CryptoJs from "crypto-js";
import AES from 'crypto-js/aes';

const prisma = db;



async function seedUsers() {
  try {
    // Define an array of user data
    const userData = [
      {
        name: 'john Doe',
        email: 'john.doe@example.com',
        password: AES.encrypt(
          "123456",
          process.env.SECRET
        ).toString(),
        
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: AES.encrypt(
          "123456",
          process.env.SECRET
        ).toString(),
      },

      {
        email: 'hana@hana.io',
        name: 'Hana Gold',
        password: AES.encrypt(
          "123456",
          process.env.SECRET
        ).toString(),
      }
      // Add more user data as needed
    ];

    // Create users in the database
    await Promise.all(
      userData.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );


    const appointmentsData =  [
      {
        email: 'john.doe@example.com',
        name: 'Appointment 1',
        phone: '123456789',
        address:"lagos ajoa",
        date: new Date('2024-04-05T12:00:00Z'),
      },
      {
        email: 'jane.smith@example.com',
        name: 'Appointment 2',
        phone: '987654321',
        address: '456 Elm St',
        date: new Date('2024-04-05T12:00:00Z'),
      },
    ];

  

    const author = await prisma.user.findFirst({
      where: {
        email: "john.doe@example.com",
      },
    });
  



    await Promise.all(
      appointmentsData.map( async (book) => {
        const { email,name, date,phone,address} = book;
        return prisma.appointment.create({
          data: {
            email,name, date,phone,address,
            userId: author?.id || "",
          },
        });
      })
    );
  

    

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await prisma.$disconnect();
  }

}
// Call the seedUsers function
seedUsers();


