@app
begin-app

@events
registered

@http
get /
get /register
get /logout
get /admin
get /login
get /verify/:token
get /reset
get /reset/:token

post /register
post /login
post /register/nuke
post /reset
post /reset-password

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
