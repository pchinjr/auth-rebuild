// learn more about HTTP functions here: https://arc.codes/primitives/http
let arc = require('@architect/functions')
let data = require('@begin/data')
let mail = require('@sendgrid/mail')

exports.handler = arc.http.async(reset)

async function reset (req) {

  let email = req.body.email

  mail.setApiKey(process.env.SENDGRID_API_KEY)

  try {
    let fiveMinutes = 300000
    let ttl = (Date.now() + fiveMinutes) / 1000
    let token = await data.set({ table: 'tokens', email, ttl })

    let result = await mail.send({
      to: email,
      from: 'paul@begin.com',
      subject: 'Reset your password',
      text: `Reset your password by clicking this link ${process.env.BASE_URL}/reset/${token.key}`,
    });
    console.log(result, 'made it here')
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }


  return {
    location: `/`
  }
}


async function registered(event) {

  try {
    let fiveMinutes = 300000
    let ttl = (Date.now() + fiveMinutes) / 1000
    let token = await data.set({ table: 'tokens', email, ttl })

    let result = await mail.send({
      to: email,
      from: 'paul@begin.com',
      subject: 'Welcome to the service',
      text: `verify your email email ${process.env.BASE_URL}/verify/${token.key}`,
    });
    console.log(result, 'made it here')
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}