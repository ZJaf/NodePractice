module.exports = function(app) {

    app.get('/rest/user/1.0/:id/', function(req, res) {
        var id = req.getParamter('id');
        var user = "user " + id + " is awesome!";
        res.send(user);
    });

    app.post('/rest/user/1.0/:id/', function(req, res) {
        var id = req.getParameter('id');
        var body = req.body;
    });

    app.post('/rest/user/1.0/newuser/', function(req, res) {
        var body = req.body;
    });

};