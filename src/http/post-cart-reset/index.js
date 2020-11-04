let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(cart)

async function cart(req) {

  let table = `shopping-${req.session.account.email}`

  console.log(req.body)
  let cart = await data.get({
    table
  })
  
  await data.destroy(cart)

  return {
    location: '/cart'
  }

}