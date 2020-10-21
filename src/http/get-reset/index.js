let arc = require('@architect/functions')
let layout = require('@architect/views/layout')

//get route for reset password form

exports.handler = arc.http.async(reset)

let form = `
  <form action=/reset method=post>
  <h2>Reset your password</h2>
  <p> You will receive an email with a link to reset </p>
  <input name=email type=email placeholder="add your email" required>
  <button>Reset password</button>
`
async function reset(req) {

  return {
    html: layout({
      account: req.session.account,
      body: form
    })
  }
}