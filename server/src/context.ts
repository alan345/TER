import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  req: any
  prisma: PrismaClient
}

export function createContext(req: any): Context {
  return { ...req, prisma }
}
