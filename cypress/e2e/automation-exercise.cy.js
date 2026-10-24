/// <reference types="cypress" />

describe("Automation Exercise", () => {
  //Cadastro
    it("Cadastrar um novo usuário com sucesso", () => {
    //cy.visit("https://automationexercise.com");
    cy.visit('/');
    cy.get("a[href*=login]").click();

    //const timestamp = new Date().getTime();

    cy.get('[data-qa="signup-name"]').type(`PGATS Auto`);
    //*cy.get('[data-qa="signup-email"]').type(`auto-pgats-test26-${timestamp}@mail.com`);
    cy.get('[data-qa="signup-email"]').type(`auto-pgats-test26-${Date.now()}@mail.com`);

    cy.get('[data-qa="signup-button"]').click();

    // radio buttons -> check
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
    /**
     * 1- IA gerando asserções tradicionais
     **/
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]') 
      .should("be.visible")    
      .and("contain", "Account Created!");
    
  });

  it("Efetuar Login de Usuário com email e senha corretos", () => {
    // Arrange
    /** Ter uma conta para efetuar o login
     **/
    // Acesso a página de login
    cy.visit('/login');

    //ActT
    cy.get('[data-qa="login-email"]').type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.get('[data-qa="login-password"]').type("12345");

    cy.get('[data-qa="login-button"]').click();
    //cy.contains('Login')

    //Assertion
    //cy.get('a').should('contain', 'PGATS Auto');
    //cy.get('a > b').should('contain', 'PGATS Auto')

    cy.contains(".navbar-nav li", "PGATS Auto");
    cy.get(".navbar-nav li").contains("PGATS Auto").should("be.visible");
  });

  it("Efetuar Login de Usuário email e senha Incorretos", () => {
    cy.visit('/login');

    //ActT
    cy.get('[data-qa="login-email"]').type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.get('[data-qa="login-password"]').type("54321");

    cy.get('[data-qa="login-button"]').click();

    cy.get('form[action*="login"] > p')
      .should("exist")
      .should("be.visible")
      .should("contain", "Your email or password is incorrect!")
      .and("contain.text", "Your email or password is incorrect!");
  });

  it("Efetuar Logout", () => {
    cy.visit('/login');

    //ActT
    cy.get('[data-qa="login-email"]').type(
      "auto-pgats-test26-1792162148636@mail.com",
    );
    cy.get('[data-qa="login-password"]').type("12345");

    cy.get('[data-qa="login-button"]').click();

    // assert do login
    cy.get('a[href*="logout"]').should("be.visible").click();

    cy.get(".login-form > h2").should("be.visible");
    cy.get('a[href*="logout"]').should("not.exist");
    cy.get('[action*="login"]').should("be.visible");
    cy.url().should("include", "login");
  });

  it("Tentar cadastrar Usuário com email já cadastrado", () => {
    cy.visit('/');
    cy.get("a[href*=login]").click();

    cy.get('[data-qa="signup-name"]').type(`PGATS Auto`);
    cy.get('[data-qa="signup-email"]').type(
      `auto-pgats-test26-1792162148636@mail.com`,
    );
    cy.get('[data-qa="signup-button"]').click();

    cy.get("form[action*=signup] p")
      .should("exist")
      .should("be.visible")
      .should("contain", "Email Address already exist!")
      .and("contain.text", "Email Address already exist!");
  });
});
