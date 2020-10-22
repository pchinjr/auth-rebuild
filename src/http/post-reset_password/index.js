// learn more about HTTP functions here: https://arc.codes/primitives/http

let arc = require('@architect/functions')
let data = require('@begin/data')
let bcrypt = require('bcryptjs')

exports.handler = arc.http.async(reset)

async function reset(req) {
  console.log(req.body)

  //confirm values are the same and validate token to get email
  if (req.body.password === req.body.confirm) {

    //look up email
    let result = await data.get({
      table: 'tokens',
      key: req.body.token
    })
    let email = result.email

    // save the new password to the account record
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password, salt)

    await data.set({
      table: 'accounts',
      key: email,
      password: hash
    })

    return {
      session: {
        account: {
          email: req.body.email
        }
      },
      location: '/admin'
    }
  } else {
    return {
      location: '/?password=nomatch'
    }
  }

}