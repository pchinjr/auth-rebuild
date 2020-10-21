let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let layout = require('@architect/views/layout')

exports.handler = arc.http.async(auth, admin)

async function admin(req) {
  let html = layout({
    account: req.session.account,
    body: `
    <p>This is protected.</p>
    <form action=/register/nuke method=post>
      Nuke your account
      <input name=email type=email placeholder="add your email" required>
      <input name=password type=password required>
      <button>Nuke</button>
    </form>
    `
  })

  return {
    html
  }

}