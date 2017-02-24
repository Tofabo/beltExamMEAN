app.factory('usersFactory', function ($http, $location) {
    var factory = {};
    factory.login = function (user) {
        $http.post('/login', user).then(function (output) {
            if (output.data.status) {
                $location.url('/dash');
            }
        })
    };
    factory.checkUser = function (cb) {
        $http.get('/checkUser').then(function (output) {
            if (!output.data) {
                $location.url('/login');
            } else {
                var uncheckeditems = [];
                var checkeditems = [];
                for (var i = 0; i < output.data.items.length; i++) {
                    if (output.data.items[i].status == "unchecked") {
                        uncheckeditems.push(output.data.items[i]);
                    }
                    else {
                        checkeditems.push(output.data.items[i]);
                    }
                }
                output.data.uncheckeditems = uncheckeditems;
                output.data.checkeditems = checkeditems;
                cb(output.data);
            }
        })
    };
    factory.getusers = function (cb) {
        $http.get('/getusers').then(function (output) {
            cb(output.data.users);
        })
    };

    factory.getone = function (id, cb) {
        $http.post('/getone', id).then(function (output) {
            var uncheckeditems = [];
            var checkeditems = [];
            for (var i = 0; i < output.data.user.items.length; i++) {
                if (output.data.user.items[i].status == "unchecked") {
                    uncheckeditems.push(output.data.user.items[i]);
                }
                else {
                    checkeditems.push(output.data.user.items[i]);
                }
            }
            output.data.user.uncheckeditems = uncheckeditems;
            output.data.user.checkeditems = checkeditems;
            cb(output.data.user);
        })
    };

    return factory;
})
