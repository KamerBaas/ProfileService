var request = require('request');

module.exports = function(req, res, next) {
    request.post({
        url: 'http://192.168.99.100:8081/handler.php',
        headers: { 'content-type': 'application/json' }, 
        mode: 'cors', 
        body: JSON.stringify(req.query.idtoken)
    }, (err, response, body) => {
        if(err){
            return res.status(500).send(err.message);
        }
        
        if(response.statusCode === 200){
            console.log('ding!');
            next();
        } else {
            console.log(response.statusCode);
            console.log('not logged in');
        }
    }).on('error', () => {
        res.status(500);
    });
}