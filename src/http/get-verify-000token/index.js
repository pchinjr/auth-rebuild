let arc = require('@architect/functions')
let data = require('@begin/data')
let layout = require('@architect/views/layout')
exports.handler = arc.http.async(verify)


async function verify(req) {

  let token = req.params.token

  let result = await data.get({
    table: 'tokens',
    token
  })

  if(result[0].key === token) {
    await data.set({
      table:'accounts',
      key: result[0].email,
      verified: true
    })
    return {
      html: layout({
        account: req.session.account,
        body: '<p>verified email</p>'
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