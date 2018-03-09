F.on('module#session', function(type, name) {

    var session = MODULE('session').instance;
    const redis_client = MODULE('redis').instance;
    session.onRead = function(id, callback) {

        // id              = session ID === user ID === browser ID
        // callback(value) = return value from the storage

        redis_client.get('session_' + id, function(err, reply) {
            callback(err ? {} : JSON.parse(reply.toString()));
        });

    };

    session.onWrite = function(id, value) {
        
        // id              = session ID === user ID === browser ID
        // value           = session state
        
        redis_client.set('session_' + id, JSON.stringify(value));

    };
});