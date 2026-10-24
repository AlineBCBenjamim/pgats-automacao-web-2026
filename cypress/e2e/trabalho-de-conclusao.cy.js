/// <reference types="cypress" />

const cadastro = require("../modules/cadastro/index.js");
const login = require("../modules/login/index.js");

describe("Automation Exercise - Trabalho de Conclusão", () => {
  
  const usuario = {
    nome: "PGATS Auto",
    email: `auto-pgats-conclusao-${Date.now()}@mail.com`,
    senha: "12345", 
  };

  before(() => {
    cy.visit("/");
    cy.get("a[href*=login]").click();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.preencherCadastro();
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    cy.clearCookies();
  });

  
  it("Cadastrar um novo usuário com sucesso", () => {
    cy.visit("/");
    cy.get("a[href*=login]").click();

  
    cadastro.iniciarCadastro(
      "PGATS Auto",
      `auto-pgats-test26-${Date.now()}@mail.com`,
    );
    cadastro.preencherCadastro();
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
  });


  it("Efetuar Login de Usuário com email e senha corretos", () => {
    cy.visit("/login");

    login.preencherLogin(usuario.email, usuario.senha);

    login.verificarSeLoginFoiEfetuadoComSucesso();
  });


  it("Efetuar Login de Usuário com email e senha incorretos", () => {
    cy.visit("/login");

    login.preencherLogin(usuario.email, "54321");

    login.verificarSeMensagemDeErroFoiExibidaNoLogin();
  });


  it("Efetuar Logout", () => {
    cy.visit("/login");

    login.preencherLogin(usuario.email, usuario.senha);

    login.efetuarLogout();
    login.verificarSeOUsuarioFoiDeslogado();
  });


  it("Tentar cadastrar Usuário com email já cadastrado", () => {
    cy.visit("/");
    cy.get("a[href*=login]").click();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
  });
});
