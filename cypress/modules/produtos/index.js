function verificarSeHomeFoiExibida() {
  cy.location("pathname").should("eq", "/");
  cy.get(".shop-menu").should("be.visible");
}

function acessarProdutos() {
  cy.get('.shop-menu a[href="/products"]').click();
}

function verificarPaginaDeProdutosFoiExibida() {
  cy.location("pathname").should("eq", "/products");
  cy.get("h2.title.text-center")
    .should("be.visible")
    .and("contain", "All Products");
}

function abrirPaginaDeProdutos() {
  cy.visit("/");
  verificarSeHomeFoiExibida();
  acessarProdutos();
  verificarPaginaDeProdutosFoiExibida();
}

function verificarListaDeProdutosEstaVisivel() {
  cy.get('a[href^="/product_details/"]')
    .should("have.length.greaterThan", 0)
    .first()
    .should("be.visible");
}

function abrirDetalheDoPrimeiroProduto() {
  cy.get('a[href^="/product_details/"]').first().click();
}

function verificarSePaginaDetalheDoProdutoFoiExibida() {
  cy.location("pathname").should("match", /^\/product_details\/\d+$/);
}

function verificarSeDetalhesDoProdutoEstaVisiveis(produto) {
  cy.contains("h2", produto.nome).should("be.visible");
  cy.contains("p", `Category: ${produto.categoria}`).should("be.visible");
  cy.contains("span", produto.preco).should("be.visible");
  cy.contains("p", `Availability: ${produto.disponibilidade}`).should(
    "be.visible",
  );
  cy.contains("p", `Condition: ${produto.condicao}`).should("be.visible");
  cy.contains("p", `Brand: ${produto.marca}`).should("be.visible");
}

function pesquisarProduto(termo) {
  cy.get("#search_product").type(termo);
  cy.get("#submit_search").click();
}

function verificarSeProdutosPesquisadosFoiExibido() {
  cy.get("h2.title.text-center")
    .should("be.visible")
    .and("contain", "Searched Products");
}

function verificarSeProdutosDaBuscaEstaoVisiveis(nomesEsperados) {
  cy.get(".features_items .product-image-wrapper").should(
    "have.length",
    nomesEsperados.length,
  );
  nomesEsperados.forEach((nome) => {
    cy.contains(".features_items .productinfo p", nome).should("be.visible");
  });
}

module.exports = {
  verificarSeHomeFoiExibida,
  acessarProdutos,
  verificarPaginaDeProdutosFoiExibida,
  abrirPaginaDeProdutos,
  verificarListaDeProdutosEstaVisivel,
  abrirDetalheDoPrimeiroProduto,
  verificarSePaginaDetalheDoProdutoFoiExibida,
  verificarSeDetalhesDoProdutoEstaVisiveis,
  pesquisarProduto,
  verificarSeProdutosPesquisadosFoiExibido,
  verificarSeProdutosDaBuscaEstaoVisiveis,
};
