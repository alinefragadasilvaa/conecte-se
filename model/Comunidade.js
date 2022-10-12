module.exports = class Comunidade {
  constructor() {
    this.nome = "";
    this.descricao = "";
    this.categoria = 0;
    this.criador = "";
    this.estado = 0;
    this.dataCriacao = "";
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

  setCategoria(c) {
    this.categoria = c;
  }
  getCategoria() {
    return this.categoria;
  }

  setCriador(c) {
    this.criador = c;
  }
  getCriador() {
    return this.criador;
  }

  setEstado(e) {
    this.estado = e;
  }
  getEstado() {
    return this.estado;
  }

  setDataCriacao(dc) {
    this.dataCriacao = dc;
  }
  getDataCriacao(dCc) {
    return this.dataCriacao;
  }

  inserir(connection) {
    try {
      var sql =
        "INSERT INTO comunidades (nome, descricao,categoria, data_criacao, criador, estado ) VALUES(?,?,?,?,?)";

      connection.query(
        sql,
        [
          this.nome,
          this.descricao,
          this.categoria,
          this.dataCriacao,
          this.criador,
          this.estado,
        ],
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
    var sql = "SELECT * FROM comunidades";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM comunidades WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
};
