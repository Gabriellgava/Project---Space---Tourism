/*
  ROUTER DO SITE
  Controla qual "página" está ativa
  Usa estado centralizado para resolver o problema de bindings imutáveis
*/

import { DATA } from "./data.js";

// Container principal
const conteudo = document.getElementById("conteudo");

// ========== ESTADO CENTRALIZADO ==========
export const estado = {
  paginaAtual: "home",
  abaAtual: null
};

/* =========================
   HOME
========================= */
function renderHome() {
  conteudo.innerHTML = `
    <section class="home">
      <div class="conteudo_texto">
        <p class="conteudo_texto_suptitulo">SO, YOU WANT TO TRAVEL TO</p>
        <h1 class="conteudo_texto_titulo">SPACE</h1>
        <p class="conteudo_texto_descricao">
          Let's face it; if you want to go to space, you might as well genuinely go to
          outer space and not hover kind of on the edge of it. Well sit back, and relax
          because we'll give you a truly out of this world experience!
        </p>
      </div>

      <div class="conteudo_botao">
        <a href="#" class="btn-explore" data-page="destination">
          <span>EXPLORE</span>
        </a>
      </div>
    </section>
  `;
}

/* =========================
   DESTINATION
========================= */
function renderDestination() {
  estado.abaAtual = "moon";
  const keys = Object.keys(DATA.destination);

  conteudo.innerHTML = `
    <section class="destination">
      <h2 class="page-title"><span>01</span> PICK YOUR DESTINATION</h2>

      <div class="destination-layout">
        <div class="destination-img-wrapper" id="dest-img"></div>

        <div class="destination-right">
          <div class="tabs tabs-text">
            ${keys.map(k =>
    `<button data-tab="${k}" class="${k === estado.abaAtual ? 'active' : ''}">${DATA.destination[k].name}</button>`
  ).join("")}
          </div>

          <div id="tab-content"></div>
        </div>
      </div>
    </section>
  `;

  renderTabContent();
}

/* =========================
   CREW
========================= */
function renderCrew() {
  estado.abaAtual = "commander";
  const keys = Object.keys(DATA.crew);

  conteudo.innerHTML = `
    <section class="crew">
      <h2 class="page-title"><span>02</span> MEET YOUR CREW</h2>

      <div class="crew-layout">
        <div class="crew-left">
          <div id="tab-content"></div>

          <div class="tabs tabs-dots">
            ${keys.map(k =>
    `<button data-tab="${k}" class="dot ${k === estado.abaAtual ? 'active' : ''}" aria-label="${DATA.crew[k].name}"></button>`
  ).join("")}
          </div>
        </div>

        <div class="crew-img-wrapper" id="crew-img"></div>
      </div>
    </section>
  `;

  renderTabContent();
}

/* =========================
   TECHNOLOGY
========================= */
function renderTechnology() {
  estado.abaAtual = "vehicle";
  const keys = Object.keys(DATA.technology);

  conteudo.innerHTML = `
    <section class="technology">
      <h2 class="page-title"><span>03</span> SPACE LAUNCH 101</h2>

      <div class="technology-layout">
        <div class="tech-img-wrapper" id="tech-img"></div>

        <div class="tech-bottom">
          <div class="tabs tabs-numbers">
            ${keys.map((k, i) =>
    `<button data-tab="${k}" class="${k === estado.abaAtual ? 'active' : ''}">${i + 1}</button>`
  ).join("")}
          </div>

          <div id="tab-content"></div>
        </div>
      </div>
    </section>
  `;

  renderTabContent();
}

/* =========================
   RENDERIZA CONTEÚDO DA ABA
========================= */
export function renderTabContent() {
  const container = document.getElementById("tab-content");
  if (!container) return;

  const page = estado.paginaAtual;
  const data = DATA[page]?.[estado.abaAtual];
  if (!data) return;

  // DESTINATION
  if (page === "destination") {
    const imgWrapper = document.getElementById("dest-img");
    if (imgWrapper) {
      imgWrapper.innerHTML = `<img src="${data.image}" alt="${data.name}" class="destination-planet">`;
    }

    container.innerHTML = `
      <div class="destination-info fade-in">
        <h3 class="dest-name">${data.name}</h3>
        <p class="dest-desc">${data.description}</p>

        <div class="destination-meta">
          <div>
            <span>AVG. DISTANCE</span>
            <strong>${data.distance}</strong>
          </div>
          <div>
            <span>EST. TRAVEL TIME</span>
            <strong>${data.travel}</strong>
          </div>
        </div>
      </div>
    `;
  }

  // CREW
  if (page === "crew") {
    const imgWrapper = document.getElementById("crew-img");
    if (imgWrapper) {
      imgWrapper.innerHTML = `<img src="${data.image}" alt="${data.name}" class="crew-photo">`;
    }

    container.innerHTML = `
      <div class="crew-info fade-in">
        <h4 class="crew-role">${data.role}</h4>
        <h3 class="crew-name">${data.name}</h3>
        <p class="crew-bio">${data.bio}</p>
      </div>
    `;
  }

  // TECHNOLOGY
  if (page === "technology") {
    const imgWrapper = document.getElementById("tech-img");
    if (imgWrapper) {
      // Usa landscape no mobile/tablet, portrait no desktop
      const isDesktop = window.innerWidth >= 1024;
      const imgSrc = isDesktop ? data.imagePortrait : data.imageLandscape;
      imgWrapper.innerHTML = `<img src="${imgSrc}" alt="${data.name}" class="tech-photo">`;
    }

    container.innerHTML = `
      <div class="technology-info fade-in">
        <p class="tech-subtitle">THE TERMINOLOGY…</p>
        <h3 class="tech-name">${data.name}</h3>
        <p class="tech-desc">${data.description}</p>
      </div>
    `;
  }

  // Marca aba ativa
  marcarAbaAtiva();
}

/*
  Marca visualmente a aba selecionada
*/
function marcarAbaAtiva() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === estado.abaAtual);
  });
}

/* =========================
   NAVEGAÇÃO PRINCIPAL
========================= */
export function navegar(page) {
  estado.paginaAtual = page;

  // Atualiza classe do body (fundos por página)
  document.body.className = "";
  document.body.classList.add(`page-${page}`);

  // Marca item ativo no menu
  document.querySelectorAll(".menu li[data-page]").forEach(li => {
    li.classList.toggle("active", li.dataset.page === page);
  });

  switch (page) {
    case "home":
      renderHome();
      break;
    case "destination":
      renderDestination();
      break;
    case "crew":
      renderCrew();
      break;
    case "technology":
      renderTechnology();
      break;
    default:
      conteudo.innerHTML = "<h1>Página não encontrada</h1>";
  }
}
