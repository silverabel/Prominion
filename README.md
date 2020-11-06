To install dependencies, run "npm install"

To start server, run "npm start"


Table with callbacks will be at "http://localhost:8080/index.html"

Unit tests: "http://localhost:8080/test/unit/unitTests.qunit.html"

Integration tests: "http://localhost:8080/test/integration/opaTests.qunit.html" 
(Note: this will send a request to the API and remove a callback from the list, 
so it will only work once. To reset the callback list, copy the contents of "calls2.json" to "calls.json" in the "data" folder)
