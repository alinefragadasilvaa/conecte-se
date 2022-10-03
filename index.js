const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/inicio.html');
});

app.get('/comunidades', function(req, res){
	res.sendFile(__dirname + '/views/comunidades.html');
});

app.get('/cadastrar', function(req, res){
	res.sendFile(__dirname + '/views/criarConta.html');
});

app.post('/criarConta', function(req, res){
    res.sendFile(__dirname + '/views/respostaForm.html');
});