import { User } from '@prisma/client'
import { Context } from './model/appInterface'

const email = {
  async sendForgetPassword(ctx: Context, user: User) {
    const subject = `${user.name}, Reset your password`

    const body = `
<div>Hello ${user.name}, </div>
<p>
  Please click on the button below to reset your password:
</p>
<p>
  <a class="button" href="${ctx.req.headers.origin}/resetPassword/${user.resetPasswordToken}">
    Reset password
  </a>  
</p>
<p>
  This link will expire in 7 days.
</p>

    `
    console.log('subject', subject)
    console.log('body', body)
    console.log('Sent to', user.email)
    return body
  },
}

export default email
