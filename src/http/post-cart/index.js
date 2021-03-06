let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(cart)

async function cart(req) {

  let table = `shopping-${req.session.account.email}`
  // expecting key on request
  console.log(req.body)
  let cart = await data.get({
    table
  })

  let item = req.body
  let isInCart = cart.find(i => i.key === item.productId)

  if (isInCart) {
    await data.incr({
      table,
      key: item.productId,
      prop: 'quantity'
    })
  } else {
   await data.set({
     table,
     key: item.productId,
     quantity: 1
   })
  }

  return {
    location: '/cart'
  }

}