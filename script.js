/* =========================
   CARROSSEL 3D DE PROJETOS
========================= */

const projectsCarousel = document.getElementById("projectsCarousel");

const projectsRing = document.getElementById("projectsRing");

/* CADASTRO DE PROJETOS: edite somente estes 6 objetos e coloque as capas
   em assets/images/projetos/. Use URL completa https://... ou deixe "".
   Imagens ausentes usam o placeholder automaticamente. */
const PROJECTS = [
  {
    name: { pt: "RukiWP", en: "RukiWP" },
    images: [
     "projetos/projeto-1-1.png",
      "projetos/projeto-1-2.png",
    ],
    description: {
      pt: "Projeto em desenvolvimento. Detalhes em breve.",
      en: "Project currently in development. More details coming soon.",
    },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
  {
    name: { pt: "Projeto 2", en: "Project 2" },
    images: [
      "projetos/projeto-2-1.png",
      "projetos/projeto-2-2.png",
    ],
    description: { pt: "Descrição ", en: "Description " },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
  {
    name: { pt: "Projeto 3", en: "Project 3" },
    images: [
      "projetos/projeto-3-1.png",
      "projetos/projeto-3-2.png",
    ],
    description: { pt: "Descrição ", en: "Description " },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
  {
    name: { pt: "Projeto 4", en: "Project 4" },
    images: [
      "assets/images/projetos/projeto-4-1.png",
      "projetos/projeto-4-2.png",
    ],
    description: { pt: "Descrição ", en: "Description " },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
  {
    name: { pt: "Projeto 5", en: "Project 5" },
    images: [
      "/projetos/projeto-5-1.png",
      "projetos/projeto-5-2.png",
    ],
    description: { pt: "Descrição .", en: "Description ." },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
  {
    name: { pt: "Projeto 6", en: "Project 6" },
    images: [],
    description: {
      pt: "Descrição curta do projeto a cadastrar.",
      en: "Short description of the project to be added.",
    },
    technologies: {
      pt: "Tecnologias a informar",
      en: "Technologies to be announced",
    },
    url: "",
  },
];
/* TRADUÇÕES DA INTERFACE: acrescente chaves aqui e use data-i18n no HTML.
   Textos dos projetos ficam nos pares pt/en do array PROJECTS. */
const TRANSLATIONS = {
  about: {
    pt: "SOBRE MIM",
    en: "ABOUT ME",
  },
  services: {
    pt: "SERVIÇOS",
    en: "SERVICES",
  },
  contact: {
    pt: "CONTATO",
    en: "CONTACT",
  },
  aboutIntro: {
    pt: "Desenvolvimento web e edição de vídeo para experiências digitais que se destacam.",
    en: "Web development and video editing for digital experiences that stand out.",
  },
  heroAboutText: {
    pt: "Crio sites e vídeos combinando qualidade, criatividade e atenção aos detalhes.",
    en: "I create websites and videos by combining quality, creativity, and attention to detail.",
  },
  serviceWebTitle: {
    pt: "Desenvolvimento Web",
    en: "Web Development",
  },
  serviceWebText: {
    pt: "Sites modernos, responsivos e focados em experiência.",
    en: "Modern, responsive websites focused on user experience.",
  },
  serviceVideoTitle: {
    pt: "Edição de Vídeo",
    en: "Video Editing",
  },
  serviceVideoText: {
    pt: "Edição com ritmo, acabamento e identidade visual.",
    en: "Video editing with rhythm, polish, and visual identity.",
  },
  contactIntro: {
    pt: "Vamos trabalhar juntos?",
    en: "Shall we work together?",
  },
  email: {
    pt: "E-mail",
    en: "Email",
  },
  viewProject: {
    pt: "VER PROJETO ↗",
    en: "VIEW PROJECT ↗",
  },
  comingSoon: {
    pt: "EM BREVE",
    en: "COMING SOON",
  },
  openMenu: {
    pt: "Abrir menu",
    en: "Open menu",
  },
  closeMenu: {
    pt: "Fechar menu",
    en: "Close menu",
  },
  openPhoto: {
    pt: "Ampliar foto de perfil",
    en: "Enlarge profile photo",
  },
  closePhoto: {
    pt: "Fechar foto",
    en: "Close photo",
  },
  navigationLabel: {
    pt: "Navegação principal",
    en: "Main navigation",
  },
  heroPhotoProfession: {
    pt: "DESENVOLVEDOR WEB · EDITOR DE VÍDEO",
    en: "WEB DEVELOPER · VIDEO EDITOR",
  },
  professionalPhoto: {
    pt: "Foto profissional",
    en: "Professional portrait",
  },
  coverLabel: {
    pt: "Capa de {name}",
    en: "Cover of {name}",
  },
  selectPortuguese: {
    pt: "Selecionar português",
    en: "Select Portuguese",
  },
  selectEnglish: {
    pt: "Selecionar inglês",
    en: "Select English",
  },
  pageTitle: {
    pt: "Davi Silva | Desenvolvedor Web & Editor de Vídeo",
    en: "Davi Silva | Web Developer & Video Editor",
  },
  pageDescription: {
    pt: "Portfólio de Davi Silva, desenvolvedor web e editor de vídeo. Desenvolvimento de sites modernos, responsivos e edição de vídeo.",
    en: "Davi Silva's portfolio, web developer and video editor. Modern, responsive website development and video editing.",
  },
};
const LANGUAGE_STORAGE_KEY = "portfolio-language";
let currentLanguage = "pt";
try {
  if (localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en")
    currentLanguage = "en";
} catch {
  // O site continua funcionando se o navegador bloquear armazenamento.
}

function translate(key, parameters = {}) {
  const entry = TRANSLATIONS[key];
  let text = entry?.[currentLanguage] ?? entry?.pt ?? key;
  for (const [name, value] of Object.entries(parameters)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}

function projectText(value) {
  // Strings continuam aceitas para nomes próprios e tecnologias iguais em PT/EN.
  return typeof value === "string"
    ? value
    : (value?.[currentLanguage] ?? value?.pt ?? "");
}

function updateProjectCardText(card, project) {
  const name = projectText(project.name);
  for (const [selector, value] of [
    [".project-title", name],
    [".project-description", projectText(project.description)],
    [".project-technologies", projectText(project.technologies)],
  ]) {
    const element = card.querySelector(selector);
    element.textContent = value;
    element.title = value;
  }
  card.querySelectorAll(".project-cover img").forEach((image) => {
    image.alt = translate("coverLabel", { name });
  });
  const action = card.querySelector(".project-action");
  action.textContent = translate(action.dataset.i18n);
}
/* =========================
   CONFIGURAÇÃO
========================= */

const PROJECT_GAP = 1.15;
const CAROUSEL_TILT = -6;
const DRAG_SENSITIVITY = 0.3;
const AUTO_SPEED = 0.08;

const numberOfProjects = PROJECTS.length;

const step = 360 / numberOfProjects;

const cards = [];
const projectSlides = new WeakMap();
const PROJECT_IMAGE_INTERVAL = 5000;

// Um único timer atende os seis cards; imagens inválidas nunca entram na lista.
function advanceProjectImages() {
  if (document.hidden) return;
  cards.forEach((card) => {
    const slides = projectSlides.get(card);
    if (!slides || slides.images.length < 2) return;
    const next =
      (slides.images.indexOf(slides.current) + 1) % slides.images.length;
    slides.current.classList.remove("is-active");
    slides.current = slides.images[next];
    slides.current.classList.add("is-active");
  });
}

/* =========================
   CRIAR CARDS
========================= */
// Apenas URLs absolutas HTTP/HTTPS habilitam a ação do card.
function getProjectUrl(value) {
  try {
    const url = new URL(typeof value === "string" ? value.trim() : "");
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  const cover = document.createElement("div");
  cover.className = "project-cover";
  const placeholder = document.createElement("div");
  placeholder.className = "project-placeholder";
  placeholder.textContent = String(index + 1).padStart(2, "0");
  placeholder.setAttribute("aria-hidden", "true");
  cover.appendChild(placeholder);

  const slides = { images: [], current: null };
  projectSlides.set(card, slides);
  const sources = Array.isArray(project.images)
    ? [
        ...new Set(
          project.images.filter(
            (source) => typeof source === "string" && source.trim(),
          ),
        ),
      ]
    : [];
  sources.forEach((source, sourceIndex) => {
    const image = document.createElement("img");
    image.className = "project-slide";
    image.dataset.slideIndex = String(sourceIndex);
    image.alt = translate("coverLabel", { name: projectText(project.name) });
    image.draggable = false;
    image.hidden = true;
    image.addEventListener(
      "load",
      () => {
        image.hidden = false;
        slides.images.push(image);
        slides.images.sort(
          (a, b) => Number(a.dataset.slideIndex) - Number(b.dataset.slideIndex),
        );
        if (!slides.current) {
          slides.current = image;
          image.classList.add("is-active");
        }
        placeholder.hidden = true;
      },
      { once: true },
    );
    image.addEventListener(
      "error",
      () => {
        image.remove();
        placeholder.hidden = slides.images.length > 0;
      },
      { once: true },
    );
    image.src = source;
    cover.appendChild(image);
  });
  card.appendChild(cover);

  const info = document.createElement("div");
  info.className = "project-info";
  for (const [tag, className, text] of [
    ["h3", "project-title", project.name],
    ["p", "project-description", project.description],
    ["p", "project-technologies", project.technologies],
  ]) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = projectText(text);
    element.title = projectText(text);
    info.appendChild(element);
  }

  const url = getProjectUrl(project.url);
  const action = document.createElement(url ? "a" : "button");
  action.className = "project-action";
  if (url) {
    action.href = url;
    action.target = "_blank";
    action.rel = "noopener noreferrer";
    action.dataset.i18n = "viewProject";
  } else {
    action.type = "button";
    action.disabled = true;
    action.dataset.i18n = "comingSoon";
  }
  action.textContent = translate(action.dataset.i18n);
  info.appendChild(action);
  card.appendChild(info);
  return card;
}

PROJECTS.forEach((project, index) => {
  const card = createProjectCard(project, index);
  projectsRing.appendChild(card);
  cards.push(card);
});
setInterval(advanceProjectImages, PROJECT_IMAGE_INTERVAL);
/* =========================
   RAIO DO CARROSSEL
========================= */

let radius = 0;

function computeRadius() {
  const cardWidth = parseFloat(getComputedStyle(projectsRing).width);

  radius = (cardWidth / 2 / Math.tan(Math.PI / numberOfProjects)) * PROJECT_GAP;
}

/* =========================
   MOVIMENTO
========================= */

let angle = 0;
let autoDirection = -1;
let velocity = -AUTO_SPEED;
const FRAME_DURATION = 1000 / 60;
let lastFrameTime = null;

let dragging = false;
let lastX = 0;
let activePointerId = null;
let lastMoveTime = 0;
let pointerStartX = 0;
let pointerStartY = 0;
let gestureMoved = false;
let suppressPointerClick = false;
let captureElement = null;
const CLICK_DRAG_THRESHOLD = 6;

function renderCarousel() {
  projectsRing.style.transform = `translateZ(${-radius}px)
     rotateX(${CAROUSEL_TILT}deg)
     rotateY(${angle}deg)`;

  cards.forEach((card, index) => {
    const cardAngle = index * step;

    card.style.transform = `rotateY(${cardAngle}deg)
       translateZ(${radius}px)`;

    const radians = ((cardAngle + angle) * Math.PI) / 180;

    const facing = (Math.cos(radians) + 1) / 2;

    card.style.filter = `brightness(${0.3 + 0.7 * facing})`;
  });
}

/* =========================
   ANIMAÇÃO
========================= */

function carouselLoop(timestamp) {
  const frameScale =
    lastFrameTime === null
      ? 1
      : Math.min((timestamp - lastFrameTime) / FRAME_DURATION, 3);
  lastFrameTime = timestamp;
  if (!dragging) {
    // Retoma a rotação automática no último sentido escolhido pelo arraste.
    const autoVelocity = autoDirection * AUTO_SPEED;
    velocity =
      autoVelocity + (velocity - autoVelocity) * Math.pow(0.95, frameScale);
    angle += velocity * frameScale;
  }

  renderCarousel();

  requestAnimationFrame(carouselLoop);
}

/* =========================
   ARRASTAR COM MOUSE / TOUCH / CANETA
========================= */

projectsCarousel.addEventListener("pointerdown", (event) => {
  if (
    activePointerId !== null ||
    !event.isPrimary ||
    event.button !== 0 ||
    event.target.closest(".carousel-nav")
  ) {
    return;
  }

  const link = event.target.closest("a.project-action");
  if (!link) event.preventDefault();
  dragging = true;
  activePointerId = event.pointerId;
  velocity = 0;
  lastX = event.clientX;
  lastMoveTime = event.timeStamp;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  gestureMoved = false;
  suppressPointerClick = false;
  captureElement = link || projectsCarousel;

  projectsCarousel.classList.add("dragging");

  captureElement.setPointerCapture(event.pointerId);
});

projectsCarousel.addEventListener("pointermove", (event) => {
  if (!dragging || event.pointerId !== activePointerId) return;

  const movementX = event.clientX - lastX;
  if (
    Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY) >
    CLICK_DRAG_THRESHOLD
  ) {
    gestureMoved = true;
  }

  lastX = event.clientX;
  if (movementX === 0) return;

  angle += movementX * DRAG_SENSITIVITY;
  autoDirection = Math.sign(movementX);

  const elapsed = Math.max(event.timeStamp - lastMoveTime, 1);
  lastMoveTime = event.timeStamp;
  velocity = Math.max(
    -12,
    Math.min(12, (movementX * DRAG_SENSITIVITY * FRAME_DURATION) / elapsed),
  );
  renderCarousel();
});

// Impede o arraste nativo de imagens/texto de assumir o gesto do carrossel.
projectsCarousel.addEventListener("dragstart", (event) =>
  event.preventDefault(),
);

function stopDragging(event) {
  if (event.pointerId !== activePointerId) return;
  if (event.type === "pointercancel" || event.timeStamp - lastMoveTime > 100) {
    velocity = 0;
  }
  const pointerId = activePointerId;
  suppressPointerClick = gestureMoved || event.type !== "pointerup";
  activePointerId = null;
  dragging = false;
  projectsCarousel.classList.remove("dragging");
  if (captureElement && captureElement.hasPointerCapture(pointerId)) {
    captureElement.releasePointerCapture(pointerId);
  }
  captureElement = null;
}

// O clique de teclado (detail === 0) continua acessível; arrastar nunca navega.
function guardProjectClick(event) {
  if (
    event.target.closest("a.project-action") &&
    event.detail !== 0 &&
    suppressPointerClick
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
projectsCarousel.addEventListener("click", guardProjectClick, true);
projectsCarousel.addEventListener("auxclick", guardProjectClick, true);

projectsCarousel.addEventListener("pointerup", stopDragging);

projectsCarousel.addEventListener("pointercancel", stopDragging);
projectsCarousel.addEventListener("lostpointercapture", stopDragging);

/* =========================
   REDIMENSIONAMENTO
========================= */

window.addEventListener("resize", computeRadius);

computeRadius();

requestAnimationFrame(carouselLoop);

/* =========================
   IDIOMAS - PT / EN
========================= */

const languageButtons = document.querySelectorAll(".language-btn");

function changeLanguage(language, persist = true) {
  currentLanguage = language === "en" ? "en" : "pt";
  document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  for (const attribute of ["aria-label", "alt", "content"]) {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
      element.setAttribute(
        attribute,
        translate(element.getAttribute(`data-i18n-${attribute}`)),
      );
    });
  }
  cards.forEach((card, index) => updateProjectCardText(card, PROJECTS[index]));
  languageButtons.forEach((button) => {
    const selected = button.dataset.language === currentLanguage;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  setMobileMenuOpen(mobileMenuButton.getAttribute("aria-expanded") === "true");
  if (persist) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch {}
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () =>
    changeLanguage(button.dataset.language),
  );
});
const openProfilePhoto = document.getElementById("openProfilePhoto");
const closeProfilePhoto = document.getElementById("closeProfilePhoto");
const profileModal = document.getElementById("profileModal");

function openProfileModal() {
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
}

function closeProfileModal() {
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
}

openProfilePhoto.addEventListener("click", openProfileModal);
closeProfilePhoto.addEventListener("click", closeProfileModal);

profileModal.addEventListener("click", (event) => {
  if (event.target === profileModal) {
    closeProfileModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfileModal();
    if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
      setMobileMenuOpen(false);
      mobileMenuButton.focus();
    }
  }
});

/* MENU MOBILE: reutiliza a navegação e a tradução existentes. */
const mobileMenuButton = document.getElementById("mobileMenuButton");
const primaryNavigation = document.getElementById("primaryNavigation");
const mobileViewport = window.matchMedia("(max-width: 768px)");

function setMobileMenuOpen(open) {
  const expanded = open && mobileViewport.matches;
  primaryNavigation.classList.toggle("is-open", expanded);
  mobileMenuButton.setAttribute("aria-expanded", String(expanded));
  mobileMenuButton.setAttribute(
    "aria-label",
    translate(expanded ? "closeMenu" : "openMenu"),
  );
}

mobileMenuButton.addEventListener("click", () => {
  setMobileMenuOpen(mobileMenuButton.getAttribute("aria-expanded") !== "true");
  if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
    const selectedButton = primaryNavigation.querySelector(
      '[aria-pressed="true"]',
    );
    (
      selectedButton || primaryNavigation.querySelector("[data-hero-panel]")
    ).focus();
  }
});

const heroNavigationButtons =
  primaryNavigation.querySelectorAll("[data-hero-panel]");
const heroPanels = document.querySelectorAll(".hero-panel");
const heroDetails = document.querySelector(".hero-details");

function selectHeroPanel(button) {
  heroNavigationButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
    item.setAttribute("aria-expanded", String(selected));
  });
  heroPanels.forEach((panel) => {
    panel.hidden = !button || panel.id !== button.getAttribute("aria-controls");
  });
  heroDetails.hidden = !button;
}

primaryNavigation.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hero-panel]");
  if (button && primaryNavigation.contains(button)) {
    const closing = button.getAttribute("aria-pressed") === "true";
    selectHeroPanel(closing ? null : button);
    const wasOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
    setMobileMenuOpen(false);
    if (wasOpen) {
      const focusTarget = closing
        ? mobileMenuButton
        : document.getElementById(button.getAttribute("aria-controls"));
      focusTarget.focus({ preventScroll: true });
    }
  }
});

selectHeroPanel(null);
mobileViewport.addEventListener("change", () => setMobileMenuOpen(false));

document.addEventListener("click", (event) => {
  if (
    !primaryNavigation.contains(event.target) &&
    !mobileMenuButton.contains(event.target)
  ) {
    const focusInMenu = primaryNavigation.contains(document.activeElement);
    setMobileMenuOpen(false);
    if (focusInMenu && mobileViewport.matches) mobileMenuButton.focus();
  }
});

primaryNavigation.addEventListener("focusout", (event) => {
  if (
    !primaryNavigation.contains(event.relatedTarget) &&
    event.relatedTarget !== mobileMenuButton
  ) {
    setMobileMenuOpen(false);
  }
});

// Aplica a preferência salva após inicializar os controles, sem reconstruir cards.
changeLanguage(currentLanguage, false);
