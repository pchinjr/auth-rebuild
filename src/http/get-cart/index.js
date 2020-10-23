let arc = require('@architect/functions')
let layout = require('@architect/views/layout')
let auth = require('@architect/shared/auth')
let data = require('@begin/data')

exports.handler = arc.http.async(auth,cart)

async function cart(req) {


  let result = await data.get({
    table: `shopping-${req.session.account.email}`
  })

  console.log(result)
  let form = `
  <p> this is your cart, yay </p>
  <form action=/cart method=post>
  <input type=hidden name=productId value=0001>
  <button> add to cart </button>
  </form>
  ${JSON.stringify(result)}
  `

  return {
    html: layout({
      account: req.session.account,
      body: form
    })
  }
}