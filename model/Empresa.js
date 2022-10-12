module.exports = class Empresa {
  constructor() {
    this.nome = "";
    this.cnpj = "";
    this.proprietario = "";
    this.ramo = 0;
    this.sobre = "";
    this.dataFundacao = "";
    this.numeroFuncionarios = 0;
    this.telefone = "";
    this.email = "";
  }

  setNome(nE) {
    this.nome = nE;
  }
  getNome() {
    return this.nome;
  }

  setCnpj(cE) {
    this.cnpj = cE;
  }
  getCnpj() {
    return this.cnpj;
  }

  setProprietario(pE) {
    this.proprietario = pE;
  }
  getProprietario() {
    return this.proprietario;
  }

  setRamo(rM) {
    this.ramo = rM;
  }
  getRamo() {
    return this.ramo;
  }

  setSobre(sE) {
    this.sobre = sE;
  }
  getSobre() {
    return this.sobre;
  }

  setDataFundacao(dFe) {
    this.dataFundacao = dFe;
  }
  getDataFundacao() {
    return this.dataFundacao;
  }

  setNumeroFuncionarios(nFe) {
    this.numeroFuncionarios = nFe;
  }
  getNumeroFuncionarios() {
    return this.numeroFuncionarios;
  }

  setTelefone(tE) {
    this.telefone = tE;
  }
  getTelefone() {
    return this.telefone;
  }

  setEmail(eE) {
    this.email = eE;
  }
  getEmail() {
    return this.email;
  }

  inserir(connection) {
    try {
      var sql =
        "INSERT INTO  empresas (nome, cnpj, proprietario, ramo, sobre_empresa, fundacao, numero_funcionarios, telefone, email) VALUES(?,?,?,?,?,?,?,?,?)";

      connection.query(
        sql,
        [
          this.nome,
          this.cnpj,
          this.proprietario,
          this.ramo,
          this.sobre,
          this.dataFundacao,
          this.numeroFuncionarios,
          this.telefone,
          this.email,
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
    var sql = "SELECT * FROM empresas";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM empresas WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  }
};
