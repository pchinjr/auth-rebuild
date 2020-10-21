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

post /register
post /login
post /register/nuke

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
