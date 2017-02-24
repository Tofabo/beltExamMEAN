app.factory('usersFactory', function($http, $location){
    var factory = {};
    factory.login = function(user){
        $http.post('/login', user).then(function(output){
            if(output.data.status){
                $location.url('/dash');
            }
        })
    };
    factory.checkUser = function(cb){
        $http.get('/checkUser').then(function(output){
            if(!output.data){
                $location.url('/login');
            }else{
                cb(output.data);
            }
        })
    };
    return factory;
})
