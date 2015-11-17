var fs = require('fs');
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./data.txt');
var WORD_MAP = {};

function Analyser(){
  lr.on('line', function (line) {
      word = line.split(" ")[0]
      n = line.split(" ")[1]
      WORD_MAP[word]=parseInt(n,10);
  });

  lr.on('end', function () {
      console.log("word list loaded");
  });
}

Analyser.prototype.word = function (word){
  console.log("Word received", word);
  return {word: word, sentiment: WORD_MAP[word] || 0};
}
module.exports = Analyser;
