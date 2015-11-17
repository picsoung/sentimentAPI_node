var express = require('express');

var app = express();
var Analyser = require('./analyser');
console.log(Analyser);
analyser = new Analyser();

app.get('/word/:word',function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(analyser.word(req.params.word));
});

app.listen(3000);
console.log('Listening    on    port    3000...');
