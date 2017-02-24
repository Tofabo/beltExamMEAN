var users = require('./../controllers/users.js');
var items = require('./../controllers/items.js');

module.exports = function(app){
    app.post('/login', users.login);
    app.get('/checkuser', users.checkUser);
    app.get('/logout', users.logout);
    app.get('/getusers', users.getall);
    app.post('/additem', items.add);
    app.post('/getone', users.getone);
    app.post('/changestatus', items.changestatus)
}
