module.exports = class CategoriaComunidade {
  constructor() {
    this.nome = "";
    this.descricao = "";
    this.criador = "";
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

  setCriador(c) {
    this.criador = c;
  }
  getCriador() {
    return this.criador;
  }
  inserir(connection) {
    try {
      var sql =
        "INSERT INTO  categorias_comunidades (nome, descricao,criador) VALUES(?,?,?)";

      connection.query(
        sql,
        [this.nome, this.descricao, this.criador],
        function (err, result) {
          if (err) throw "teste";
          //if (err) console.error('err from callback: ' + err.stack);
        }
      );
    } catch (e) {
      console.error("err from callback: " + e.stack);
      throw e;
    }
  }

  listar(connection, callback) {
    var sql = "SELECT * FROM categorias_comunidades";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM categorias_comunidades WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
};
