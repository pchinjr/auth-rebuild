let arc = require('@architect/functions')
let layout = require('@architect/views/layout')
let auth = require('@architect/shared/auth')
let data = require('@begin/data')

exports.handler = arc.http.async(auth,cart)

async function cart(req) {


  let cart = await data.get({
    table: `shopping-${req.session.account.email}`
  })

  let form = `
  <p> limited edition praise cage candle </p>

  <form action=/cart method=post>
  <input type=hidden name=productId value=0001>
  <button> add to cart </button>

  <p> this is your cart, yay </p>
  ${JSON.stringify(cart)}
  `

  return {
    html: layout({
      account: req.session.account,
      body: form
    })
  }
}