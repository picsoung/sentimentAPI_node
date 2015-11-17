var express = require('express');
var Client = require('3scale').Client;

var app = express();
var Analyser = require('./analyser');
console.log(Analyser);
analyser = new Analyser();
client = new Client("1397437b4dc3d5bcacb02c196b6e4ae1");

var authenticate = function(request, response, callback){
	var params = request.query;
	var result = false;
	client.authorize_with_user_key({user_key: params['user_key'],service_id:"2555417729211"},function(resp){
		if(resp.is_success()){
			var trans = [{user_key: params['user_key'], "usage": {"hello": 1}}];
	    client.report(trans, function (response) {
				console.log(response);
			});
			callback(null,resp.is_success());
		}else{
			callback(resp.error_message);
		}
	});
}

app.get('/word/:word',function(req, res) {
    authenticate(req, res, function(err, reply){
			res.setHeader('Content-Type', 'application/json');
        if(err){
           res.status(403).send(JSON.stringify({error:err}));
        }else{
	       	res.status(200).send(analyser.word(req.params.word));
				}
    });
});

app.listen(3000);
console.log('Listening    on    port    3000...');
