module.exports = class PapelUsuario { 
    constructor() {
      this.nome = "";
      this.descricao = "";
    }
    
    setNome(n) {
      this.nome = n;
    }
    
    getNome() {
      return this.nome;  
    }
    
    setDescricao(d) {
      this.descricao = d;
    }
    
    getDescricao() {
      return this.descricao;  
    }
    
    inserir(connection) {
      try {
          var sql = "INSERT INTO papeis_usuario (nome, descricao) VALUES(?, ?)";
  
          connection.query(sql, [this.nome, this.descricao], function (err, result) {
            if (err) throw "teste";
            //if (err) console.error('err from callback: ' + err.stack);
            });
      } catch (e) {
          console.error('err from callback: ' + e.stack);
          throw e;
      }
    }
    
    listar(connection, callback) {
      var sql = "SELECT * FROM papeis_usuario";
  
      connection.query(sql, function (err, result) {
          if (err) throw err;
          return callback(result);
      });    
    }
    
    pesquisar(connection, callback) {
      var sql = "SELECT * FROM papeis_usuario WHERE nome like ?";
  
      connection.query(sql, [this.nome], function (err, result) {
          if (err) throw err;
          return callback(result);
      });    
    }
    
  }