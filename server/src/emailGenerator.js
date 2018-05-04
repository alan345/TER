const nodemailer = require('nodemailer')
var config = require('./config/config')

module.exports = {
  async sendWelcomeEmail (user, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: user.email,
      from: 'naperg@naperg.io',
      subject: 'Welcome in the Naperg APP',
      html: `
      <div>hello ${user.name}</div>
      <div>Welcome in the Naperg App.</div>
        <div>Please find link to validate your email.
           ${ctx.request.headers.origin}/validateEmail?validateEmailToken=${user.validateEmailToken}
        </div>
    `
    }
    return mailer.sendMail(mailOptions)
  },
  sendForgetPassword (uniqueId, email, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: email,
      from: 'naperg@naperg.io',
      subject: 'Forget Password - Naperg APP',
      html: `
      <div>hello</div>
      <div>Please find link to reset your password.
         ${ctx.request.headers.origin}/resetPassword?resetPasswordToken=${uniqueId}
      </div>
    `
    }
    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Mail sent to: ' + email)
      }
    })
  }
}
