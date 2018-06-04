var request = require('request');

exports.module = (req, res, next) => {
    request.post({url: 'http://kb-auth/handler.php', json: { idtoken: req.query.idtoken }}, (err, response, body) => {
        if(err){
            return res.status(500).send(err.message);
        }

        if(response.status === 200){
            req.firebase.id = body.id;
            next();
        } else {
            console.log('not logged in');
        }
    });
}