import { PrismaClient } from '@prisma/client'
import { Context } from './model/appInterface'

const prisma = new PrismaClient()

export function createContext(req: any): Context {
  return { ...req, prisma }
}
