var users = require('./../controllers/users.js');

module.exports = function(app){
    app.post('/login', users.login);
    app.get('/checkuser', users.checkUser);
    app.get('/logout', users.logout);
}
