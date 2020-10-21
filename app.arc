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

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
