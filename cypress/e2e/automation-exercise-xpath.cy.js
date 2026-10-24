/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("Automation Exercise", () => {
  //Cadastro
  it("Cadastrar um novo usuário com sucesso", () => {
    cy.visit("https://automationexercise.com/");
    cy.xpath("//a[contains(@href,'login')]").click();

    /** Iniciar Cadastro */
    cy.xpath("//*[@data-qa='signup-name']").type("PGATS Auto");
    cy.xpath("//*[@data-qa='signup-email']").type(
      `auto-pgats-test26-${Date.now()}@mail.com`,
    );
    cy.xpath("//*[@data-qa='signup-button']").click();

    /** Preencher Cadastro */
    cy.xpath("//*[@id='id_gender2']").check();

    cy.xpath("//*[@data-qa='password']").type("12345");

    // Selects e comboboxes -> select
    cy.xpath("//*[@data-qa='days']").select("10");
    cy.xpath("//*[@data-qa='months']").select("October");
    cy.xpath("//*[@data-qa='years']").select("1985");

    // checkboxes -> check
    cy.xpath("//*[@id='newsletter']").check();
    cy.xpath("//*[@id='optin']").check();

    cy.xpath("//*[@data-qa='first_name']").type("PGATS");
    cy.xpath("//*[@data-qa='last_name']").type("Auto");
    cy.xpath("//*[@data-qa='company']").type("PGATS");
    cy.xpath("//*[@data-qa='address']").type("Example Adress 123");

    cy.xpath("//*[@data-qa='country']").select("United States");
    cy.xpath("//*[@data-qa='state']").type("California");
    cy.xpath("//*[@data-qa='city']").type("San Francisco");
    cy.xpath("//*[@data-qa='zipcode']").type("12345");
    cy.xpath("//*[@data-qa='mobile_number']").type("999999999");

    cy.xpath("//*[@data-qa='create-account']").click();

    /** Verificar Cadastro Efetuado */
    cy.xpath("//*[@data-qa='account-created']")
      .should("be.visible")
      .and("contain", "Account Created!");
  });

  it("Efetuar Login de Usuário com email e senha corretos", () => {
    // Arrange
    /** Ter uma conta para efetuar o login
     **/
    // Acesso a página de login
    cy.visit("https://automationexercise.com/login");

    //ActT
    cy.xpath("//*[@data-qa='login-email']").type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.xpath("//*[@data-qa='login-password']").type("12345");
    cy.xpath("//*[@data-qa='login-button']").click();

    /** Verificar Login Efetuado */
    cy.xpath(
      "//*[contains(@class,'navbar-nav')]//li[contains(.,'PGATS Auto')]",
    ).should("exist");
    cy.xpath(
      "//*[contains(@class,'navbar-nav')]//li//*[contains(text(),'PGATS Auto')]",
    ).should("be.visible");
  });

  it("Efetuar Login de Usuário email e senha Incorretos", () => {
    cy.visit("https://automationexercise.com/login");

    //ActT
    cy.xpath("//*[@data-qa='login-email']").type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.xpath("//*[@data-qa='login-password']").type("54321");
    cy.xpath("//*[@data-qa='login-button']").click();

    /** Verificar Mensagem de Erro no Login */
    cy.xpath("//form[contains(@action,'login')]/p")
      .should("exist")
      .should("be.visible")
      .should("contain", "Your email or password is incorrect!")
      .and("contain.text", "Your email or password is incorrect!");
  });

  it("Efetuar Logout", () => {
    cy.visit("https://automationexercise.com/login");

    //ActT
    cy.xpath("//*[@data-qa='login-email']").type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.xpath("//*[@data-qa='login-password']").type("12345");
    cy.xpath("//*[@data-qa='login-button']").click();

    // efetuarLogout
    cy.xpath("//a[contains(@href,'logout')]").should("be.visible").click();

    // verificarSeOUsuarioFoiDeslogado
    cy.xpath("//*[contains(@class,'login-form')]/h2").should("be.visible");
    cy.xpath("//a[contains(@href,'logout')]").should("not.exist");
    cy.xpath("//*[contains(@action,'login')]").should("be.visible");
    cy.url().should("include", "login");
  });

  it("Tentar cadastrar Usuário com email já cadastrado", () => {
    cy.visit("https://automationexercise.com/");
    cy.xpath("//a[contains(@href,'login')]").click();

    cy.xpath("//*[@data-qa='signup-name']").type("PGATS Auto");
    cy.xpath("//*[@data-qa='signup-email']").type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.xpath("//*[@data-qa='signup-button']").click();

    // verificarSeMensagemDeCadastroExistenteFoiExibida
    cy.xpath("//form[contains(@action,'signup')]//p")
      .should("exist")
      .should("be.visible")
      .should("contain", "Email Address already exist!")
      .and("contain.text", "Email Address already exist!");
  });
});
