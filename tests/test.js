TEST('Test method', function() {
    $GET('login', 1, function(err, response) {
        //FAIL(err != null);
        // or
         OK(err == null);
    });
});