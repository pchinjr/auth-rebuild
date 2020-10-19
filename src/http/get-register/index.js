let arc = require('@architect/functions')
let layout = require('@architect/views/layout')

exports.handler = arc.http.async(register)

let form = `
  <form action=/register method=post>
  Sign Up Now!
  <input name=email type=email placeholder="add your email" required>
  <input name=password type=password required>
  <button>Register</button>
`

async function register(req) {
  return {
    html: layout({
      account: req.session.account,
      body: form
    })
  }
}