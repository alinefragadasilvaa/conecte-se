module.exports = class Usuario { 
  constructor() {
    this.apelido = "";
    this.cpf = "";
    this.nome = "";
    this.sobrenome = "";
    this.papel = 0;
    this.email = "";
    this.telefone = "";
    this.senha= "";
  }
  
  setApelido(a) {
    this.apelido = a;
  }
  
  getApelido() {
    return this.apelido;  
  }
  
  setCpf(c) {
    this.cpf = c;
  }
  
  geCpf() {
    return this.cpf;  
  }
  
  setNome(n) {
    this.nome = n;
  }
  
  getNome() {
    return this.nome;  
  }
  
  setSobrenome(s) {
    this.sobrenome = s;
  }
  
  getSobrenome() {
    return this.sobrenome;  
  }

  setPapel(p) {
      this.papel = p;
    }
    
    getPapel() {
      return this.papel;  
    }

    setEmail(e) {
      this.email = e;
    }
    
    getEmail() {
      return this.email;  
    }

    setTelefone(t) {
      this.telefone = t;
    }
    
    getTelefone() {
      return this.telefone;  
    }

    setSenha(sn) {
      this.senha = sn;
    }
    
    getSenha() {
      return this.s;  
    }
          
  
  inserir(connection) {
    try {
        var sql = "INSERT INTO  usuarios_da_plataforma (apelido,cpf,nome,sobrenome,papel,email,telefone,senha) VALUES(?,?,?,?,?,?,?,?)";

        connection.query(sql, [this.apelido, this.cpf,  this.nome,  this.sobrenome, this.papel, this.email, this.telefone, this.senha ], function (err, result) {
          if (err) throw "teste";
          //if (err) console.error('err from callback: ' + err.stack);
          });
    } catch (e) {
        console.error('err from callback: ' + e.stack);
        throw e;
    }
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM usuarios_da_plataforma";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });    
  }
  
  pesquisar(connection, callback) {
    var sql = "SELECT * FROM usuarios_da_plataforma WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
        if (err) throw err;
        return callback(result);
    });    
  }
  
}