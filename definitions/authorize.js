/*framework.onAuthorize = function(req, res, flags, next) {

    // EXAMPLE:
    var userId = req.cookie('user');

    if (userId === undefined) {
        // unauthorized user
        next(false);
        return;
    }

    var nosql = NOSQL('users');

    nosql.one().where('id', userId).callback(function(err, user) {

        if (err || !user) {
            // unauthorized user
            next(false);
            return;
        }

        // user is authorized
        next(true, user);

        // or assign the user object to request.user:
        
        //    req.user = user;
        //    next(true);
        
    });
}*/