/*
  ARQUIVO PRINCIPAL DA APLICAÇÃO
  Ponto de entrada do site — usa event delegation
*/

import { navegar } from "./router.js";
import { ativarTabs } from "./tabs.js";

/*
  Event delegation — captura cliques em qualquer [data-page]
  mesmo os criados dinamicamente (ex: botão EXPLORE)
*/
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-page]");
  if (!el) return;

  e.preventDefault();

  const page = el.dataset.page;
  navegar(page);

  // Fecha menu mobile se estiver aberto
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) menuToggle.checked = false;

  // Se a página tiver abas, ativa elas
  if (page !== "home") {
    ativarTabs();
  }
});

/*
  Inicialização do site
*/
function init() {
  navegar("home");
}

init();
