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
const PapelUsuario = require('./model/PapelUsuario');
const UsuarioPlataforma = require('./model/UsuarioPlataforma');
const CategoriaComunidade = require('./model/CategoriaComunidade');
const Comunidade = require('./model/Comunidade');
const Forum = require('./model/Forum');
const RespostaForum = require('./model/RespostaForum');
const RamoEmpresa = require('./model/RamoEmpresa');
const Empresa = require('./model/Empresa'); 

// BANCO DE DADOS
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "equipe",
  password: "12345678",
  database: "conecte_se"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});


// NAVEGAÇÃO PÁGINAS DE TABELA
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/inicio.html');
});

app.get('/papeisUsuarios', function(req, res){
	var p = new PapelUsuario();  
    p.listar(con, function(result){
		res.render('tabelaPapeisUsuario.ejs', {papeisUsuario: result});
	});
});

app.get('/usuariosPlataforma', function(req, res){
	var u = new UsuarioPlataforma();  
    u.listar(con, function(result){
		res.render('tabelaUsuariosPlataforma.ejs', {usuariosPlataforma: result});
	});
});

app.get('/categoriasComunidades', function(req, res){
	var c = new CategoriaComunidade();  
    c.listar(con, function(result){
		res.render('tabelaCategoriasComunidades.ejs', {categoriasComunidades: result});
	});
});

app.get('/comunidades', function(req, res){
	var c = new Comunidade();  
    c.listar(con, function(result){
		res.render('tabelaComunidades.ejs', {comunidades: result});
	});
});

app.get('/foruns', function(req, res){
	var f = new Forum();  
    f.listar(con, function(result){
		res.render('tabelaForuns.ejs', {foruns: result});
	});
});

app.get('/respostasForuns', function(req, res){
	var r = new RespostaForum();  
    r.listar(con, function(result){
		res.render('tabelaRespostasForuns.ejs', {respostasForuns: result});
	});
});

app.get('/ramosEmpresas', function(req, res){
	var r = new RamoEmpresa();  
    r.listar(con, function(result){
		res.render('tabelaRamosEmpresas.ejs', {ramosEmpresas: result});
	});
});

app.get('/empresas', function(req, res){
	var e = new Empresa();  
    e.listar(con, function(result){
		res.render('tabelaEmpresas.ejs', {empresas: result});
	});
});

// FUNÇÕES FILTRAR / PESQUISAR / BUSCAR
app.post('/filtrarPapelUsuario', function(req, res){
	p = new PapelUsuario();
	p.setNome(req.body.nome);
	
	if (p.getNome() == '') {
		p.setNome('%');
	}
	
	p.pesquisar(con, function(result){
		res.render('tabelaPapeisUsuario.ejs', {papeisUsuario: result});
	});
});

app.post('/filtrarUsuarioPlataforma', function(req, res){
	var u = new UsuarioPlataforma();
	u.setNome(req.body.nome);
	
	if (u.getNome() == '') {
		u.setNome('%');
	}
	
	u.pesquisar(con, function(result){
		res.render('tabelaUsuariosPlataforma.ejs', {usuariosPlataforma: result});
	});
});


app.post('/filtrarCategoriaComunidade', function(req, res){
	var c = new CategoriaComunidade();
	c.setNome(req.body.nome);
	
	if (c.getNome() == '') {
		c.setNome('%');
	}
	
	c.pesquisar(con, function(result){
		res.render('tabelaCategoriasComunidades.ejs', {categoriasComunidades: result});
	});
});

app.post('/filtrarComunidade', function(req, res){
	var c = new Comunidade();
	c.setNome(req.body.nome);
	
	if (c.getNome() == '') {
		c.setNome('%');
	}
	
	c.pesquisar(con, function(result){
		res.render('tabelaComunidades.ejs', {comunidades: result});
	});
});

app.post('/filtrarForum', function(req, res){
	var f = new Forum();
	f.setTitulo(req.body.titulo);
	
	if (f.getTitulo() == '') {
		f.setTitulo('%');
	}
	
	f.pesquisar(con, function(result){
		res.render('tabelaForuns.ejs', {foruns: result});
	});
});

app.post('/filtrarRespostaForum', function(req, res){
	var r = new RespostaForum();
	r.setMensagem(req.body.mensagem);
	
	if (r.getMensagem() == '') {
		r.setMensagem('%');
	}
	
	r.pesquisar(con, function(result){
		res.render('tabelaRespostasForuns.ejs', {respostasForuns: result});
	});
});

app.post('/filtrarRamoEmpresa', function(req, res){
	var r = new RamoEmpresa();
	r.setNome(req.body.nome);
	
	if (r.getNome() == '') {
		r.setNome('%');
	}
	
	r.pesquisar(con, function(result){
		res.render('tabelaRamosEmpresas.ejs', {ramosEmpresas: result});
	});
});

app.post('/filtrarEmpresa', function(req, res){
	var e = new Empresa();
	e.setNome(req.body.nome);
	
	if (e.getNome() == '') {
		e.setNome('%');
	}
	
	e.pesquisar(con, function(result){
		res.render('tabelaEmpresas.ejs', {empresas: result});
	});
});

// NAVEGAÇÃO PÁGINAS FORMULÁRIOS
app.get('/formPapelUsuario', function(req, res){
	res.sendFile(__dirname + '/views/criarPapelUsuario.html');
});

app.get('/formUsuarioPlataforma', function(req, res){
	var p = new PapelUsuario();  
    
	p.listar(con, function(result){
			res.render('criarUsuarioPlataforma.ejs', {papeisUsuarios: result});
		
	});
});

app.get('/formCategoriaComunidade', function(req, res){
	res.sendFile(__dirname + '/views/criarCategoriaComunidade.html');
});

app.get('/formComunidade', function(req, res){ 
    var c = new CategoriaComunidade(); 
    
	c.listar(con, function(result){
		res.render('criarComunidade.ejs', {categoriasComunidades: result});
	});
	
});

app.get('/formForum', function(req, res){
	var c = new Comunidade(); 
    
	c.listar(con, function(result){
		res.render('criarForum.ejs', {comunidades: result});
	});
});

app.get('/formRespostaForum', function(req, res){
    var f = new Forum(); 
    
	f.listar(con, function(result){
		res.render('criarRespostaForum.ejs', {foruns: result});
	});
	
});

app.get('/formRamoEmpresa', function(req, res){
	res.sendFile(__dirname + '/views/criarRamoEmpresa.html');
});

app.get('/formEmpresa', function(req, res){
	var r = new RamoEmpresa();  
     
	r.listar(con, function(result){
		res.render('criarEmpresa.ejs', {ramosEmpresas: result});
	})
	
});

// FUNÇÕES CRIAR / SALVAR / INSERIR
app.post('/criarPapelUsuario', function(req, res){
	try {
		var p = new PapelUsuario();
		
		p.setNome(req.body.nome);
		p.setDescricao(req.body.descricao);
		
		var retorno = p.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarUsuarioPlataforma', function(req, res){
	try {
		var u = new UsuarioPlataforma();
		
		u.setApelido(req.body.apelido);
		u.setCpf(req.body.cpf);
		u.setNome(req.body.nome);
		u.setSobrenome(req.body.sobrenome);
		u.setPapel(req.body.papel);
		u.setEmail(req.body.email);
		u.setTelefone(req.body.telefone);
		u.setSenha(req.body.senha);
		
		var retorno = u.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarCategoriaComunidade', function(req, res){
	try {
		var c = new CategoriaComunidade();
		
		c.setNome(req.body.nome);
		c.setDescricao(req.body.descricao);
		c.setCriador(req.body.criador);
		
		var retorno = c.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarComunidade', function(req, res){
	try {
		var c = new Comunidade();
		
		c.setNome(req.body.nome);
		c.setDescricao(req.body.descricao);
		c.setCategoria(req.body.categoria);
		c.setDataCriacao(req.body.dataCriacao);
		c.setCriador(req.body.criador);
		c.setEstado(req.body.estado);
		
		var retorno = c.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarForum', function(req, res){
	try {
		var f = new Forum();
		
		f.setTitulo(req.body.titulo);
		f.setAssunto(req.body.assunto);
		f.setDataCriacao(req.body.dataCriacao);
		f.setAutor(req.body.autor);
		f.setComunidade(req.body.comunidade);
		f.setEstado(req.body.estado);
		
		var retorno = f.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarRespostaForum', function(req, res){
	try {
		var r = new RespostaForum();
		
		r.setMensagem(req.body.mensagem);
		r.setDataCriacao(req.body.dataCriacao);
		r.setAutor(req.body.autor);
		r.setForum(req.body.forum);
		
		var retorno = r.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarRamoEmpresa', function(req, res){
	try {
		var r = new RamoEmpresa();
		
		r.setNome(req.body.nome);
		r.setDescricao(req.body.descricao);
		
		var retorno = r.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});

app.post('/criarEmpresa', function(req, res){
	try {
		var e = new Empresa();
		
		e.setNome(req.body.nome);
		e.setCnpj(req.body.cnpj);
		e.setProprietario(req.body.proprietario);
		e.setRamo(req.body.ramo);
		e.setSobre(req.body.sobre);
		e.setFundacao(req.body.fundacao);
		e.setNumFuncionarios(req.body.numFuncionarios);
		e.setTelefone(req.body.telefone);
		e.setEmail(req.body.email);

		var retorno = e.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('resposta.ejs');
});
