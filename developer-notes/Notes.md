Package Notes
=============

#### Getting Started
for development, add CORS extension to chrome:
  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US
  to allow for cross domain access (so localhost:8081 has access to localhost:5000)
#### Common Commands
gulp build:all

gulp serve

Ctrl+C to end execution

running test file:
gulp test --query app/test/unit/api/onkey-api-tests.js

#### trouble-shooting
problem: running tests could not find module aurelia-fetch-client

solution: install aurelia-fetch-client with npm


