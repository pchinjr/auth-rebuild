// learn more about HTTP functions here: https://arc.codes/primitives/http

let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(reset)

async function reset(req) {
  console.log(req)

  //confirm values are the same

  //validate password rules

  // select user object

  // write new password to db (optional send email)
  req.body.
  return { ok:true}
}