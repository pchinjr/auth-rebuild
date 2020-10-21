let arc = require('@architect/functions')
let data = require('@begin/data')
let bcrypt = require('bcryptjs')

exports.handler = arc.http.async(valid, register)

// check to see if account exists
async function valid(req) {
  let result = await data.get({
    table: 'accounts',
    key: req.body.email
  })
  if(result) {
    return {
      location: `/?error=exists`
    }
  }
}

async function register(req) {

  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(req.body.password, salt)

  let result = await data.set({
    table: 'accounts',
    key: req.body.email,
    password: hash
  })

  // publish a 'registered' event to dispatch email
  await arc.events.publish({ name: 'registered', payload: result })

  return {
    session: {
      account: {
        email: req.body.email
      }
    },
    location: '/admin'
  }
}
