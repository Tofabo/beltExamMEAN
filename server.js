var express = require('express');
var path = require('path');
var bp = require('body-parser');
var app = express();
var session = require('express-session');
var port = 8000;

app.use(express.static(path.join(__dirname + '/client')));
app.use(express.static(path.join(__dirname + '/node_modules')));
app.use(bp.json());
app.use(session({
    secret: 'dojoforlyfe',
    resave: false,
    saveUninitialized: true
}))

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(port, function(){
    console.log('Listening to port ' + port);
})
