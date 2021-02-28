import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      email: `admin@naperg.com`,
      name: 'Admin Naperg',
      password: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
      resetPasswordToken: '123',
      validateEmailToken: '',
      isEmailValidated: true,
    },
  })

  console.log({ user })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
