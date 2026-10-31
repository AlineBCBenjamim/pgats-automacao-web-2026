/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index.js');

describe("Automation Exercise", () => {
  //Cadastro
  it("Cadastrar um novo usuário com sucesso", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href*=login]").click();

    /** Iniciar Cadastro */
    cadastro.iniciarCadastro('PGATS Auto', `auto-pgats-test26-${Date.now()}@mail.com`);
    /** Iniciar Cadastro */

    /** Preencher Cadastro */
    cadastro.preencherCadastro();
    /** Preencher Cadastro */

    /** Verificar Cadastro Efetuado */
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    /** Verificar Cadastro Efetuado */
  });

  it("Efetuar Login de Usuário com email e senha corretos", () => {
    // Arrange
    /** Ter uma conta para efetuar o login
     **/
    // Acesso a página de login
    cy.visit("https://automationexercise.com/login");

    /** preencherLogin() */
    preencherLogin("auto-pgats-test26-1792162148636@mail.com", "12345");

    /** verificarSeLoginFoiEfetuadoComSucesso() */
    verificarSeLoginFoiEfetuadoComSucesso();
  }); 

  it("Efetuar Login de Usuário email e senha Incorretos", () => {
    cy.visit("https://automationexercise.com/login");

    //ActT
    preencherLogin("auto-pgats-test26-1792162148636@mail.com", "54321");
    /**  cy.get('[data-qa="login-email"]').type(
      "auto-pgats-test26-1792162148636@mail.com");
    cy.get('[data-qa="login-password"]').type("54321");

    cy.get('[data-qa="login-button"]').click();
    */
    /** verificarSeMensagemDeErroFoiExibidaNoLogin() */
    verificarSeMensagemDeErroFoiExibidaNoLogin();
    /** verificarSeMensagemDeErroFoiExibidaNoLogin() */
  });

  it("Efetuar Logout", () => {
    cy.visit("https://automationexercise.com/login");

    //ActT
    /**cy.get('[data-qa="login-email"]').type(
      "auto-pgats-test26-1792162148636@mail.com");
    cy.get('[data-qa="login-password"]').type("12345");
    cy.get('[data-qa="login-button"]').click();
    */
    preencherLogin("auto-pgats-test26-1792162148636@mail.com", "12345");

    // efetuarLogout
    efetuarLogout();
    // efetuarLogout

    // verificarSeOUsuarioFoiDeslogado
    verificarSeOUsuarioFoiDeslogado();
    //verificarSeOUsuarioFoiDeslogado
  });

  it("Tentar cadastrar Usuário com email já cadastrado", () => {
    cy.visit("https://automationexercise.com/");
    cy.get("a[href*=login]").click();

    cadastro.iniciarCadastro("PGATS Auto", `auto-pgats-test26-1792162148636@mail.com`);

    /**cy.get('[data-qa="signup-name"]').type(`PGATS Auto`);
    cy.get('[data-qa="signup-email"]').type(
      `auto-pgats-test26-1792162148636@mail.com`);
    cy.get('[data-qa="signup-button"]').click();
*/

    // verificarSeMensagemDeCadastroExistenteFoiExibida
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    // verificarSeMensagemDeCadastroExistenteFoiExibida
  });
}); 

// Cadastro
/*
function iniciarCadastro(nome, email) {

  cy.get('[data-qa="signup-name"]').type(nome);
  cy.get('[data-qa="signup-email"]').type(email)
  cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro() {
  cy.get("#id_gender2").check();

  cy.get('[data-qa="password"]').type("12345");

  // Selects e comboboxes -> select
  cy.get('[data-qa="days"]').select("10");
  cy.get('[data-qa="months"]').select("October");
  cy.get('[data-qa="years"]').select("1985");

  // checkboxes -> check
  cy.get("#newsletter").check();
  cy.get("#optin").check();

  cy.get('[data-qa="first_name"]').type("PGATS");
  cy.get('[data-qa="last_name"]').type("Auto");
  cy.get('[data-qa="company"]').type("PGATS");
  cy.get('[data-qa="address"]').type("Example Adress 123");

  cy.get('[data-qa="country"]').select("United States");
  cy.get('[data-qa="state"]').type("California");
  cy.get('[data-qa="city"]').type("San Francisco");
  cy.get('[data-qa="zipcode"]').type("12345");
  cy.get('[data-qa="mobile_number"]').type("999999999");

  cy.get('[data-qa="create-account"]').click();
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
    .should("be.visible")
    .and("contain", "Account Created!");
}
*/
// Login
function preencherLogin(email, senha) {
  /** preencherLogin() */
  //ActT
  /**cy.get('[data-qa="login-email"]').type(
    "auto-pgats-test26-1792162148636@mail.com",
  );
  cy.get('[data-qa="login-password"]').type("12345");
*/
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);

  cy.get('[data-qa="login-button"]').click();
}

function verificarSeLoginFoiEfetuadoComSucesso() {
  /** verificarSeLoginFoiEfetuadoComSucesso() */
  cy.contains(".navbar-nav li", "PGATS Auto");
  cy.get(".navbar-nav li").contains("PGATS Auto").should("be.visible");
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  /** verificarSeMensagemDeErroFoiExibidaNoLogin() */
  cy.get('form[action*="login"] > p')
    .should("exist")
    .should("be.visible")
    .should("contain", "Your email or password is incorrect!")
    .and("contain.text", "Your email or password is incorrect!");
}

function efetuarLogout() {
  // efetuarLogout
  cy.get('a[href*="logout"]').should("be.visible").click();
  // efetuarLogout
}

function verificarSeOUsuarioFoiDeslogado() {
  // verificarSeOUsuarioFoiDeslogado
  cy.get(".login-form > h2").should("be.visible");
  cy.get('a[href*="logout"]').should("not.exist");
  cy.get('[action*="login"]').should("be.visible");
  cy.url().should("include", "login");
  //verificarSeOUsuarioFoiDeslogado
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  // verificarSeMensagemDeCadastroExistenteFoiExibida
  cy.get("form[action*=signup] p")
    .should("exist")
    .should("be.visible")
    .should("contain", "Email Address already exist!")
    .and("contain.text", "Email Address already exist!");
  // verificarSeMensagemDeCadastroExistenteFoiExibida
}
