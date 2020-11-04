let arc = require('@architect/functions')
let layout = require('@architect/views/layout')
let auth = require('@architect/shared/auth')
let data = require('@begin/data')

exports.handler = arc.http.async(auth,cart)

async function cart(req) {

  let cart = await data.get({
    table: `shopping-${req.session.account.email}`
  })

  function cartItem(item) {
    return `<form action=/cart/update method=post>
    <input type=text name=productId value=${item.key}>
    <input type=text name=quantity value=${item.quantity}>
    <button>Update Cart</button>
    </form>`
  }

  let form = `
  <p> limited edition praise cage candle </p>
  <form action=/cart method=post>
  <input type=hidden name=productId value=0001>
  <button> add to cart </button>
  </form>
  <p> this is your cart, yay </p>
  ${cart.map(cartItem).join('')}
  <form action=/cart/reset method=post>
  <button>DELETE CART</button>
  </form>
  `

  return {
    html: layout({
      account: req.session.account,
      body: form
    })
  }
}