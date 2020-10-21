module.exports = function layout(params) {

  let logout = `<a href=/logout>logout</a>`

  let notAuthed = `<a href=/login>login</a> | <a href=/register>register</a> | <a href=/reset>Reset Password</a>`

  return `
  <!doctype html>
  </html>
  <h1> My Login </h1>
  ${ params.account ? logout: notAuthed}
  ${ params.body}
  </html>
  `
}