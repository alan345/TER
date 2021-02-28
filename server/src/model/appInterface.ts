import { PrismaClient } from '@prisma/client'

export interface Decoded {
  userId: string
  exp: number
}
export interface Context {
  req: any
  prisma: PrismaClient
}
