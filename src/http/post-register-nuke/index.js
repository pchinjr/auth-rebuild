let arc = require('@architect/functions')
let data = require('@begin/data')
let bcrypt = require('bcryptjs');

exports.handler = arc.http.async(/*debug,*/ nuke)

// async function debug(req) {return {req}}

async function nuke(req) {

  let result = await data.get({
    table: 'accounts',
    key: req.body.email
  })

  if (!result) {
    return {
      session: {},
      location: '/?notfound'
    }
  }

  let hash = result.password
  let good = bcrypt.compareSync(req.body.password, hash)

  if (good) {
    await data.destroy({
      table: 'accounts',
      key: req.body.email
    })
    console.log('account destroyed')
    return {
      session: {},
      location: '/'
    }
  }
  else {
    return {
      session: {},
      location: '/?badpassword'
    }
  }
}