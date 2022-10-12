module.exports = class RespostaForum {
  constructor() {
    this.mensagem = "";
    this.dataCriacao = "";
    this.autor = "";
    this.forum = 0;
  }

  setMensagem(m) {
    this.mensagem = m;
  }
  getMensagem() {
    return this.mensagem;
  }

  setDataCriacao(dCr) {
    this.dataCriacao = dCr;
  }
  getDataCriacao() {
    return this.dataCriacao;
  }

  setAutor(aR) {
    this.autor = aR;
  }
  getAutor() {
    return this.autor;
  }

  setForum(f) {
    this.forum = f;
  }
  getForum() {
    return this.forum;
  }

  inserir(connection) {
    try {
      var sql =
        "INSERT INTO  respostas_foruns (mensagem, data_criacao, autor, forum) VALUES(?,?,?,?)";

      connection.query(
        sql,
        [this.mensagem, this.dataCriacao, this.autor, this.forum],
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
    var sql = "SELECT * FROM respostas_foruns";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM respostas_foruns WHERE mensagem like ?";

    connection.query(sql, [this.mensagem], function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
};
