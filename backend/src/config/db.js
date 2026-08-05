import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter })

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connect success");
  } catch (err) {
    console.error(`DB connect error: ${err}`)
  }
}

const disconnectDB = async () => {
  await prisma.$disconnect();
}

export { prisma, connectDB, disconnectDB };
