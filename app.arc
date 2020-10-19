@app
begin-app

@http
get /
get /register
get /logout
get /admin

post /register

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
