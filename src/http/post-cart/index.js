let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(cart)

async function cart(req) {
  // expecting key on request
  console.log(req.body)
  await data.set({
    table: `shopping-${req.session.account.email}`,//base64 encode
    ...req.body
  })

  return {
    location: '/cart'
  }

}