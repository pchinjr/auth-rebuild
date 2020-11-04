let arc = require('@architect/functions')
let data = require('@begin/data')
let layout = require('@architect/views/layout')

exports.handler = arc.http.async(reset)

async function reset(req) {

  let token = req.params.token
  console.log(token)
  let result = await data.get({
    table: 'tokens',
    key: token
  })

  console.log(result)
  //xss form validation
  if (result.key === token) {
    return {
      html: layout({
        account: req.session.account,
        body: `<h2>Choose a new password<h2>
        <form action=/reset-password method=post>
        <input name=password type=password required>
        <input name=confirm type=password required>
        <input type=hidden name=token value=${token}>
        <button>Reset Password</button>
        </form>`
      })
    }
  } else {
    return {
      html: layout({
        account: req.session.account,
        body: '<p>verifying email ... token expired</p>'
      })
    }
  }
}