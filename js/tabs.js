/*
  CONTROLE DAS ABAS (TABS)
  Destination / Crew / Technology
  Usa estado centralizado do router
*/

import { estado, renderTabContent } from "./router.js";

/*
  Ativa os cliques nas abas
  Usa event delegation para evitar re-binding
*/
export function ativarTabs() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Atualiza aba no estado centralizado
      estado.abaAtual = btn.dataset.tab;

      // Renderiza novo conteúdo
      renderTabContent();
    });
  });
}
