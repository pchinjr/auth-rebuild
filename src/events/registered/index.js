let data = require('@begin/data')
let arc = require('@architect/functions')
let mail = require('@sendgrid/mail')

exports.handler = arc.events.subscribe(registered)

async function registered(event) {
  console.log(event)

  let email = event.key

  mail.setApiKey(process.env.SENDGRID_API_KEY)

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
