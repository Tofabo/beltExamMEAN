app.factory('itemsFactory', function($http, $location){
    var factory = {};
    factory.add = function(newItem, owner, cb){
        newItem._owner = owner._id;
        newItem.owner = owner.name;
        $http.post('/additem', newItem).then(function(){
                cb();
        })
    };
    factory.changestatus = function(id, cb){
         $http.post('/changestatus', id).then(function(output){
                cb();
        })
    };
    return factory;
})
