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
  item.quantity = Number(item.quantity)
  let isInCart = cart.find(i => i.key === item.productId)

  if (isInCart && item.quantity > 0) {
    await data.set({
      table,
      key: item.productId,
      quantity: item.quantity
    })
  } else {
    await data.destroy({
      table,
      key: item.productId
    })
  }

  return {
    location: '/cart'
  }

}