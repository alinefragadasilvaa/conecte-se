// PARTE INICIAL
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// CLASSES
const UsuarioPlataforma = require('./model/UsuarioPlataforma');

// BANCO DE DADOS
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "equipe-um",
  password: "12345678",
  database: "conecte_se"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

// NAVEGAÇÃO PÁGINAS DE TABELA
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/usuario_deslogado/inicio_deslogado.html');
});

app.get('/empresas-deslogado', function(req, res){
	res.sendFile(__dirname + '/views/usuario_deslogado/empresas_deslogado.html');
});

app.get('/fale-conosco-deslogado', function(req, res){
	res.sendFile(__dirname + '/views/usuario_deslogado/faleConosco_deslogado.html');
});

app.get('/login', function(req, res){
	res.sendFile(__dirname + '/views/usuario_deslogado/login.html');
});

app.get('/cadastro', function(req, res){
	res.sendFile(__dirname + '/views/usuario_deslogado/cadastro.html');
});

app.post('/entrar', function(req, res){

try {
	var u = new UsuarioPlataforma();
	u.setApelido(req.body.apelido);
	u.setSenha(req.body.senha);
	
	u.buscarUsuario(con, function(result){
		if (result == ""){
			res.render('usuario_deslogado/erro.ejs');
		}else{
			res.render('usuario_deslogado/resposta.ejs', {resposta: result});
		}
	});
} catch (e) {
	console.log('Erro: '+e.message);
}
	
});

// PRÓXIMOS PASSOS:
// fazer esse redirecionamento de páginas por papel para todo o sistema
// após efetuar o login, a cada página direcionada, passar como parâmetro o apelido do ususário logado (sempre saber qual o ususário logado)
// para deslogar colocar o link da página "inicio_deslogado" no botão "sair"



