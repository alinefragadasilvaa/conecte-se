module.exports = class Empresa {
    constructor() {
      this.nome = "";
      this.cnpj = "";
      this.proprietario = "";
      this.ramo = 0;
      this.sobre = "";
      this.fundacao = "";
      this.numFuncionarios = 0;
      this.telefone = "";
      this.email = "";
    }
  
    setNome(n) {
      this.nome = n;
    }
    getNome() {
      return this.nome;
    }
  
    setCnpj(c) {
      this.cnpj = c;
    }
    getCnpj() {
      return this.cnpj;
    }
  
    setProprietario(p) {
      this.proprietario = p;
    }
    getProprietario() {
      return this.proprietario;
    }
  
    setRamo(r) {
      this.ramo = r;
    }
    getRamo() {
      return this.ramo;
    }
  
    setSobre(s) {
      this.sobre = s;
    }
    getSobre() {
      return this.sobre;
    }
  
    setFundacao(f) {
      this.fundacao = f;
    }
    getFundacao() {
      return this.fundacao;
    }
  
    setNumFuncionarios(n) {
      this.numFuncionarios = n;
    }
    getNumFuncionarios() {
      return this.numFuncionarios;
    }
  
    setTelefone(t) {
      this.telefone = t;
    }
    getTelefone() {
      return this.telefone;
    }
  
    setEmail(e) {
      this.email = e;
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
            this.fundacao,
            this.numFuncionarios,
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