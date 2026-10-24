// login/logout.

function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);

  cy.get('[data-qa="login-button"]').click();
}

function verificarSeLoginFoiEfetuadoComSucesso() {
  cy.contains(".navbar-nav li", "PGATS Auto");
  cy.get(".navbar-nav li").contains("PGATS Auto").should("be.visible");
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p')
    .should("exist")
    .should("be.visible")
    .should("contain", "Your email or password is incorrect!")
    .and("contain.text", "Your email or password is incorrect!");
}

function efetuarLogout() {
  cy.get('a[href*="logout"]').should("be.visible").click();
}

function verificarSeOUsuarioFoiDeslogado() {
  cy.get(".login-form > h2").should("be.visible");
  cy.get('a[href*="logout"]').should("not.exist");
  cy.get('[action*="login"]').should("be.visible");
  cy.url().should("include", "login");
}

module.exports = {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  efetuarLogout,
  verificarSeOUsuarioFoiDeslogado
};
