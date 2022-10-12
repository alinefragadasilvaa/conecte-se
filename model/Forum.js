module.exports = class Forum {
  constructor() {
    this.titulo = "";
    this.assunto = "";
    this.dataCriacao = "";
    this.autor = "";
    this.comunidade = 0;
    this.estado = 0;
  }
  setTitulo(t) {
    this.titulo = t;
  }
  getTitulo() {
    return this.titulo;
  }

  setAssunto(a) {
    this.assunto = a;
  }
  getAssunto() {
    return this.assunto;
  }

  setDataCriacao(d) {
    this.dataCriacao = d;
  }
  getDataCriacao() {
    return this.dataCriacao;
  }

  setAutor(a) {
    this.autor = a;
  }
  getAutor() {
    return this.autor;
  }

  setComunidade(c) {
    this.comunidade = c;
  }
  getComunidade() {
    return this.comunidade;
  }

  setEstado(e) {
    this.estado = e;
  }
  getEstado() {
    return this.estado;
  }

  inserir(connection) {
    try {
      var sql =
        "INSERT INTO foruns (titulo, assunto, data_criacao, autor, comunidade, estado) VALUES(?,?,?,?,?,?)";

      connection.query(
        sql,
        [
          this.titulo,
          this.assunto,
          this.dataCriacao,
          this.autor,
          this.comunidade,
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
    var sql = "SELECT * FROM foruns";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM foruns WHERE titulo like ?";

    connection.query(sql, [this.titulo], function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
};
