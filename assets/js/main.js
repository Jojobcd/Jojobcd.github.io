/**
 * Portfolio — rendu et interactions.
 * Le contenu vient de window.PORTFOLIO (assets/js/data.js).
 * Chaque section est rendue par une petite fonction « composant »
 * qui renvoie du HTML ; les interactions sont branchées ensuite.
 */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const PROJECTS = D.projects.filter((p) => !p.hidden);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilitaires ---------- */

  // Échappe le texte avant insertion dans le HTML
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const CATEGORY_LABELS = { data: "Data", fullstack: "Full Stack" };

  // Icônes SVG (trait, style Feather) — une seule source pour tout le site
  const ICONS = {
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 20V9"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
    external: '<path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  };
  const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const externalLink = (href, label, iconName = "external") =>
    href
      ? `<a class="link-arrow" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${icon(iconName)}${esc(label)}</a>`
      : "";

  const chips = (items = []) =>
    items.length
      ? `<ul class="chips">${items.map((it, i) => `<li class="chip" style="--ci:${i}">${esc(it)}</li>`).join("")}</ul>`
      : "";

  // Découpe un texte en mots animables (révélation mot par mot du hero)
  const words = (text) =>
    String(text)
      .split(" ")
      .map((w, i) => `<span class="word"><span style="--i:${i}">${esc(w)}</span></span>`)
      .join(" ");

  const CONFIDENTIAL_NOTE = "Projet en entreprise · code confidentiel";

  /**
   * Illustration générée quand un projet n'a pas de capture d'écran.
   * Variante choisie par p.cover ("chart", "app", "network", "qr", "sheet") ;
   * par défaut : graphique pour un projet data, fenêtre d'application sinon.
   * Déterministe (même projet = même image).
   */
  function coverSVG(p, scope) {
    const gid = `g-${scope}-${p.id}`; // id unique : la même illustration peut être dans la carte et la modale
    let seed = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0);
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const kind = p.cover || (p.categories[0] === "data" ? "chart" : "app");

    // Couleurs via les classes .cv-* (styles.css) pour suivre le thème clair/sombre
    const bars = Array.from({ length: 9 }, (_, i) => {
      const h = 40 + rnd() * 120;
      return `<rect class="cv-bar" x="${236 + i * 30}" y="${300 - h}" width="18" height="${h}" rx="3" opacity="${(0.25 + (i / 9) * 0.6).toFixed(2)}"/>`;
    }).join("");

    const app = `
      <rect class="cv-panel" x="150" y="70" width="340" height="230" rx="12"/>
      <circle class="cv-dot" cx="172" cy="92" r="4"/><circle class="cv-dot" cx="186" cy="92" r="4"/><circle class="cv-dot" cx="200" cy="92" r="4"/>
      <rect class="cv-bg" x="166" y="118" width="70" height="166" rx="6"/>
      <rect class="cv-hi" x="250" y="118" width="224" height="52" rx="6"/>
      <rect class="cv-bg" x="250" y="182" width="108" height="102" rx="6"/>
      <rect class="cv-bg" x="366" y="182" width="108" height="102" rx="6"/>
      <path class="cv-line" d="M262 262 L290 236 L312 248 L346 210"/>`;

    const chart = `
      <line class="cv-axis" x1="220" y1="300" x2="520" y2="300"/>
      ${bars}
      <path class="cv-line cv-dash" d="M232 230 C 300 200, 360 150, 500 110"/>`;

    // Réseau : un serveur central relié à 8 sites
    const network = `
      ${Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = (320 + Math.cos(a) * 190).toFixed(0), y = (185 + Math.sin(a) * 120).toFixed(0);
        return `<line class="cv-axis" x1="320" y1="185" x2="${x}" y2="${y}"/><rect class="cv-panel" x="${x - 22}" y="${y - 15}" width="44" height="30" rx="7"/><circle class="cv-bar" cx="${x}" cy="${y}" r="4" opacity=".7"/>`;
      }).join("")}
      <rect class="cv-hi" x="276" y="155" width="88" height="60" rx="12"/>
      <path class="cv-line" d="M298 178h44M298 192h30"/>`;

    // QR code (motif pseudo-aléatoire) + notification
    const cells = [];
    for (let r = 0; r < 11; r++)
      for (let c = 0; c < 11; c++) {
        const finder = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
        if (finder || rnd() > 0.55) cells.push(`<rect class="cv-bar" x="${170 + c * 16}" y="${92 + r * 16}" width="14" height="14" rx="2" opacity="${finder ? 0.9 : 0.6}"/>`);
      }
    const qr = `
      <rect class="cv-panel" x="154" y="76" width="208" height="208" rx="14"/>
      ${cells.join("")}
      <rect class="cv-hi" x="392" y="112" width="120" height="44" rx="10"/>
      <circle class="cv-bar" cx="414" cy="134" r="6"/><path class="cv-line" d="M430 128h60M430 140h40"/>
      <rect class="cv-panel" x="392" y="170" width="120" height="44" rx="10"/>
      <path class="cv-line cv-dash" d="M410 192h84"/>`;

    // Tableur → rapport
    const grid = Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => `<rect class="${r === 0 ? "cv-hi" : "cv-bg"}" x="${120 + c * 42}" y="${100 + r * 28}" width="38" height="24" rx="3"/>`).join("")
    ).join("");
    const reportBars = Array.from({ length: 5 }, (_, i) => {
      const h = 30 + rnd() * 80;
      return `<rect class="cv-bar" x="${402 + i * 22}" y="${262 - h}" width="14" height="${h}" rx="2" opacity="${(0.4 + i * 0.12).toFixed(2)}"/>`;
    }).join("");
    const sheet = `
      <rect class="cv-panel" x="104" y="84" width="200" height="196" rx="10"/>
      ${grid}
      <path class="cv-line" d="M322 182h44M352 170l14 12-14 12"/>
      <rect class="cv-panel" x="384" y="84" width="152" height="196" rx="10"/>
      <path class="cv-line" d="M402 110h80"/>
      ${reportBars}`;

    // Procès-verbal + résultat de vote (pour / contre / abstention)
    const vote = `
      <rect class="cv-panel" x="130" y="64" width="190" height="236" rx="10"/>
      <path class="cv-line" d="M152 96h90"/>
      <path class="cv-axis" d="M152 124h146M152 144h146M152 164h120M152 196h146M152 216h100"/>
      <rect class="cv-hi" x="152" y="240" width="96" height="34" rx="6"/>
      <path class="cv-line" d="M168 257l8 8 16-16"/>
      <rect class="cv-panel" x="352" y="96" width="170" height="172" rx="10"/>
      <rect class="cv-bar" x="372" y="124" width="118" height="18" rx="4" opacity=".85"/>
      <rect class="cv-bar" x="372" y="166" width="42" height="18" rx="4" opacity=".5"/>
      <rect class="cv-bar" x="372" y="208" width="22" height="18" rx="4" opacity=".3"/>`;

    const shapes = { app, chart, network, qr, sheet, vote };

    return `<svg viewBox="0 0 640 360" role="img" aria-label="Illustration du projet ${esc(p.title)}" preserveAspectRatio="xMidYMid ${scope === "modal" ? "meet" : "slice"}">
      <defs><radialGradient id="${esc(gid)}" cx="75%" cy="20%" r="80%"><stop class="cv-stop" offset="0" stop-opacity=".22"/><stop class="cv-stop" offset="1" stop-opacity="0"/></radialGradient></defs>
      <rect class="cv-bg" width="640" height="360"/>
      <rect width="640" height="360" fill="url(#${esc(gid)})"/>
      ${shapes[kind] || app}
    </svg>`;
  }

  const visual = (p, eager = false) =>
    p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" width="960" height="540" ${eager ? "" : 'loading="lazy"'} decoding="async" />`
      : coverSVG(p, eager ? "modal" : "card");

  /* ---------- Composants de section ---------- */

  function Hero(id) {
    return `
      <p class="status reveal"><span class="status-dot" aria-hidden="true"></span>
        <span>${esc(id.location)} · Disponible : ${esc(id.availability.join(", "))}</span></p>
      <h1 id="hero-title" class="hero-name">${words(id.name)}</h1>
      <p class="hero-title reveal" style="--delay:120ms">${esc(id.title)}</p>
      <p class="hero-tagline reveal" style="--delay:180ms">${esc(id.tagline)}</p>
      <div class="hero-actions reveal" style="--delay:240ms">
        <a class="btn btn-primary btn-nudge-down" href="#projets">Voir mes projets${icon("arrowDown")}</a>
        <a class="btn btn-ghost btn-nudge-right" href="#contact">Me contacter${icon("arrowRight")}</a>
        ${id.cv ? `<a class="btn btn-ghost" href="${esc(id.cv)}" download>${icon("file")}CV</a>` : ""}
      </div>
      <div class="hero-stack reveal" style="--delay:300ms">
        <p class="sr-only">Technologies principales :</p>
        ${chips(id.heroStack || [])}
      </div>`;
  }

  function About(a) {
    return `
      <div class="about-grid">
        <div class="about-text reveal">
          ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
          <p class="about-quote">${esc(a.differentiator)}</p>
        </div>
        <ol class="approach">
          ${a.approach
            .map((s, i) => `<li class="card reveal" style="--delay:${i * 80}ms"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
            .join("")}
        </ol>
      </div>`;
  }

  const SkillCard = (s, i) => `
    <article class="card skill-card reveal" style="--delay:${i * 70}ms">
      <div class="skill-head"><span class="skill-icon">${icon(s.icon)}</span><h3>${esc(s.domain)}</h3></div>
      ${chips(s.items)}
    </article>`;

  const ProjectCard = (p, i) => `
    <article class="card project-card reveal" style="--delay:${(i % 3) * 70}ms" data-categories="${esc(p.categories.join(" "))}" aria-labelledby="pt-${esc(p.id)}">
      <div class="project-visual">${visual(p)}</div>
      <div class="project-body">
        <div class="project-tags">${p.categories.map((c) => `<span class="tag">${esc(CATEGORY_LABELS[c] || c)}</span>`).join("")}</div>
        <div>
          <h3 id="pt-${esc(p.id)}">${esc(p.title)}</h3>
          <p class="project-subtitle">${esc(p.subtitle)}</p>
          ${p.context ? `<p class="project-context">${esc(p.context)}</p>` : ""}
        </div>
        <p class="project-problem"><b>Problème · </b>${esc(p.problem)}</p>
        <p class="result"><strong>${esc(p.result.value)}</strong><span>${esc(p.result.label)}</span></p>
        ${chips(p.stack)}
        <div class="project-foot">
          <button class="btn btn-ghost" type="button" data-open-project="${esc(p.id)}" aria-haspopup="dialog">Voir le détail</button>
          ${externalLink(p.links.demo, "Démo")}
          ${externalLink(p.links.github, "Code", "github")}
          ${p.confidential ? `<span class="confidential">${icon("lock")}Code confidentiel</span>` : ""}
        </div>
      </div>
    </article>`;

  function ProjectDetail(p) {
    const section = (title, body) => `<section class="modal-section"><h3>${title}</h3>${body}</section>`;
    return `
      <div class="modal-visual">${visual(p, true)}</div>
      <div class="modal-body">
        <div class="modal-head">
          <div>
            <div class="project-tags">${p.categories.map((c) => `<span class="tag">${esc(CATEGORY_LABELS[c] || c)}</span>`).join("")}</div>
            <h2 id="modal-title">${esc(p.title)}</h2>
            <p class="project-subtitle">${esc(p.subtitle)}</p>
            ${p.context ? `<p class="project-context">${esc(p.context)}</p>` : ""}
          </div>
          <button class="modal-close" type="button" data-close-modal aria-label="Fermer">${icon("close")}</button>
        </div>
        ${section("Problème", `<p>${esc(p.problem)}</p>`)}
        ${section("Solution", `<p>${esc(p.solution)}</p>`)}
        ${section("Résultat", `<p class="result"><strong>${esc(p.result.value)}</strong><span>${esc(p.result.label)}</span></p>`)}
        ${p.highlights?.length ? section("Points clés", `<ul class="modal-list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`) : ""}
        ${p.stack?.length ? section("Stack", chips(p.stack)) : ""}
        ${p.confidential
          ? `<p class="confidential-note">${icon("lock")}<span>${CONFIDENTIAL_NOTE}. Le code et les données appartiennent à l'entreprise ; l'illustration est un schéma de principe. Je peux détailler l'architecture et la démarche en entretien.</span></p>`
          : ""}
        ${p.links.demo || p.links.github
          ? `<div class="modal-links">${externalLink(p.links.demo, "Voir la démo")}${externalLink(p.links.github, "Voir le code", "github")}</div>`
          : ""}
      </div>`;
  }

  const TimelineItem = (x, i) => `
    <li class="card timeline-item reveal" style="--delay:${i * 80}ms">
      <div>
        <h3>${esc(x.role)}</h3>
        <p class="timeline-meta"><span>${esc(x.context)}</span><span>${esc(x.period)}</span>${x.duration ? `<span class="duration">${esc(x.duration)}</span>` : ""}</p>
      </div>
      <div class="timeline-cols">
        <div><h4>Missions</h4><ul>${x.missions.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>
        <div><h4>Résultats</h4><ul>${x.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
      </div>
    </li>`;

  const EducationItem = (e, i) => `
    <li class="edu-item reveal" style="--delay:${i * 70}ms">
      <div>
        <h4>${esc(e.degree)}</h4>
        <p class="timeline-meta"><span>${esc(e.school)}</span></p>
      </div>
      <p class="edu-period">${e.status ? `<span class="edu-status">${esc(e.status)}</span>` : ""}${esc(e.period)}</p>
    </li>`;

  // Valeur d'un chiffre clé : fixe, ou calculée depuis la liste des projets
  function statValue(s) {
    if (s.from === "projects") return PROJECTS.length;
    if (s.from === "dashboards") return PROJECTS.filter((p) => p.dashboard).length + (s.plus || 0);
    return s.value;
  }

  const StatItem = (s, i) => `
    <li class="stat reveal" style="--delay:${i * 70}ms">
      <span class="stat-value" data-count="${statValue(s)}" data-suffix="${esc(s.suffix || "")}">${statValue(s)}${esc(s.suffix || "")}</span>
      <span class="stat-label">${esc(s.label)}</span>
    </li>`;

  function ContactLinks(id) {
    const items = [
      id.email && { href: `mailto:${id.email}`, label: id.email, icon: "mail", ext: false },
      id.linkedin && { href: id.linkedin, label: "LinkedIn", icon: "linkedin", ext: true },
      id.github && { href: id.github, label: "GitHub", icon: "github", ext: true },
    ].filter(Boolean);
    return items
      .map(
        (l) => `<li><a href="${esc(l.href)}"${l.ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${icon(l.icon)}<span>${esc(l.label)}</span></a></li>`
      )
      .join("");
  }

  /* ---------- Rendu ---------- */

  function render() {
    const id = D.identity;
    $$("[data-slot]").forEach((el) => (el.textContent = id[el.dataset.slot] ?? ""));
    $("#hero").innerHTML = Hero(id);
    $("#about").innerHTML = About(D.about);
    $("#skills").innerHTML = D.skills.map(SkillCard).join("");
    $("#projects").innerHTML = PROJECTS.map(ProjectCard).join("");
    $("#timeline").innerHTML = D.experience.map(TimelineItem).join("");
    $("#education").innerHTML = (D.education || []).map(EducationItem).join("");
    $("#stats").innerHTML = D.stats.map(StatItem).join("");
    $("#contact-intro").textContent = D.contact.intro;
    $("#contact-links").innerHTML = ContactLinks(id);
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Thème clair / sombre ---------- */

  function setupTheme() {
    const btn = $("#theme-toggle");
    const meta = $('meta[name="theme-color"]');
    const apply = (t) => {
      document.documentElement.dataset.theme = t;
      btn.setAttribute("aria-label", t === "dark" ? "Passer en mode clair" : "Passer en mode sombre");
      meta.setAttribute("content", t === "dark" ? "#0B0B0F" : "#FAFAFC");
    };
    apply(document.documentElement.dataset.theme || "dark");
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

      // Transition circulaire depuis le bouton (View Transitions API), sinon bascule directe
      if (!document.startViewTransition || reducedMotion) {
        apply(next);
      } else {
        const b = btn.getBoundingClientRect();
        const x = b.left + b.width / 2, y = b.top + b.height / 2;
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.startViewTransition(() => apply(next)).ready.then(() =>
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 550, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
          )
        );
      }
      try { localStorage.setItem("theme", next); } catch (e) { /* stockage indisponible : sans conséquence */ }
    });
  }

  /* ---------- Navigation : menu mobile, ombre, section active ---------- */

  function setupNav() {
    const header = $("#site-header");
    const toggle = $(".nav-toggle");
    const list = $("#nav-list");
    const links = $$("a", list);

    const closeMenu = () => {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && list.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });

    // Barre de progression de lecture, en bas du header
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    header.append(progress);

    // Au scroll : ombre, progression, et header masqué quand on descend (réaffiché en remontant)
    let lastY = scrollY;
    let ticking = false;
    const update = () => {
      const y = scrollY;
      header.classList.toggle("is-scrolled", y > 8);
      if (!reducedMotion && !list.classList.contains("is-open") && Math.abs(y - lastY) > 6) {
        header.classList.toggle("is-hidden", y > lastY && y > 320);
        lastY = y;
      }
      if (y < 320) header.classList.remove("is-hidden");
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden")); // navigation clavier
    update();

    // Indicateur qui glisse vers le lien de la section active (desktop)
    const indicator = document.createElement("li");
    indicator.className = "nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    list.append(indicator);
    list.classList.add("has-indicator");
    const moveIndicator = () => {
      const a = list.querySelector('a[aria-current="true"]');
      indicator.style.opacity = a ? "1" : "0";
      if (!a) return;
      indicator.style.width = `${a.offsetWidth}px`;
      indicator.style.transform = `translateX(${a.parentElement.offsetLeft}px)`;
    };
    addEventListener("resize", moveIndicator);
    document.fonts?.ready.then(moveIndicator);

    // Section active : celle qui traverse le milieu de l'écran
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.removeAttribute("aria-current"));
          byId.get(e.target.id)?.setAttribute("aria-current", "true");
        });
        moveIndicator();
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main section[id]").forEach((s) => io.observe(s));
  }

  /* ---------- Filtres de projets ---------- */

  function setupFilters() {
    const buttons = $$("#filters .filter");
    const cards = $$(".project-card");
    const status = $("#filter-status");

    // Nombre exact de projets par filtre, calculé depuis les données
    const count = (f) => (f === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(f)).length);
    buttons.forEach((b) =>
      b.insertAdjacentHTML("beforeend", ` <span class="filter-count">${count(b.dataset.filter)}</span>`)
    );

    // Pastille qui glisse sous le filtre sélectionné
    const group = $("#filters");
    const pill = document.createElement("span");
    pill.className = "filter-pill";
    pill.setAttribute("aria-hidden", "true");
    group.prepend(pill);
    group.classList.add("has-pill");
    const movePill = () => {
      const b = buttons.find((x) => x.getAttribute("aria-pressed") === "true");
      pill.style.width = `${b.offsetWidth}px`;
      pill.style.transform = `translateX(${b.offsetLeft - 4}px)`; // 4px = padding du groupe
    };
    movePill();
    addEventListener("resize", movePill);
    document.fonts?.ready.then(movePill);

    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        movePill();
        let shown = 0;
        cards.forEach((c) => {
          const match = f === "all" || c.dataset.categories.split(" ").includes(f);
          c.hidden = !match;
          if (!match) return;
          c.classList.add("is-visible");
          if (!reducedMotion) {
            // Relance l'animation d'entrée, en cascade
            c.classList.remove("card-in");
            void c.offsetWidth;
            c.style.setProperty("--k", shown);
            c.classList.add("card-in");
          }
          shown++;
        });
        status.textContent = `${shown} projet${shown > 1 ? "s" : ""} affiché${shown > 1 ? "s" : ""}`;
      })
    );
  }

  /* ---------- Modale de détail ---------- */

  function setupModal() {
    const modal = $("#project-modal");
    const content = $("#modal-content");
    let opener = null;

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-project]");
      if (!btn) return;
      const p = PROJECTS.find((x) => x.id === btn.dataset.openProject);
      if (!p) return;
      opener = btn;
      content.innerHTML = ProjectDetail(p);
      modal.showModal();
      modal.scrollTop = 0;
      $("[data-close-modal]", modal).focus();
    });

    // Fermeture animée (fondu), immédiate si les animations sont réduites
    const closeModal = () => {
      if (!modal.open || modal.classList.contains("is-closing")) return;
      if (reducedMotion) return modal.close();
      modal.classList.add("is-closing");
      setTimeout(() => {
        modal.classList.remove("is-closing");
        modal.close();
      }, 200); // = durée de l'animation modal-out
    };

    modal.addEventListener("click", (e) => {
      // Clic sur le bouton fermer, ou sur le fond (en dehors du contenu)
      if (e.target.closest("[data-close-modal]") || e.target === modal) closeModal();
    });
    modal.addEventListener("cancel", (e) => {
      e.preventDefault(); // touche Échap : on passe par l'animation
      closeModal();
    });
    modal.addEventListener("close", () => opener?.focus());
  }

  /* ---------- Apparition au scroll + compteurs ---------- */

  function setupReveal() {
    const items = $$(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  }

  function setupCounters() {
    if (reducedMotion) return; // les valeurs finales sont déjà affichées
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target;
          const end = Number(el.dataset.count);
          const suffix = el.dataset.suffix;
          const t0 = performance.now();
          const dur = 900;
          const step = (t) => {
            const k = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
      { threshold: 0.6 }
    );
    $$("[data-count]").forEach((el) => io.observe(el));
  }

  /* ---------- Micro-interactions ---------- */

  function setupMotion() {
    if (reducedMotion) return;

    // Halo qui suit la souris sur le contour des cartes projet
    if (matchMedia("(hover: hover)").matches) {
      $("#projects").addEventListener("pointermove", (e) => {
        const card = e.target.closest(".project-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }

    // Timeline : la ligne se dessine au scroll et chaque poste s'allume quand on l'atteint
    const tl = $("#timeline");
    const items = $$(".timeline-item", tl);
    let ticking = false;
    const update = () => {
      const mid = innerHeight * 0.6;
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      tl.style.setProperty("--progress", p.toFixed(3));
      items.forEach((it) => it.classList.toggle("is-reached", it.getBoundingClientRect().top + 30 < mid));
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Formulaire de contact ---------- */

  function setupForm() {
    const form = $("#contact-form");
    const status = $("#form-status");
    const submit = $("button[type=submit]", form);
    const MESSAGES = {
      name: "Indiquez votre nom.",
      email: "Indiquez une adresse email valide.",
      message: "Écrivez votre message.",
    };

    const setStatus = (msg, kind) => {
      status.textContent = msg;
      status.className = "form-status" + (kind ? ` is-${kind}` : "");
    };

    // Affiche ou retire l'erreur d'un champ ; renvoie true si valide
    function check(field) {
      const valid = field.value.trim() !== "" && field.checkValidity();
      const errId = `${field.id}-error`;
      let err = document.getElementById(errId);
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !err) {
        err = document.createElement("p");
        err.id = errId;
        err.className = "field-error";
        field.after(err);
        field.setAttribute("aria-describedby", errId);
      }
      if (err) err.textContent = valid ? "" : MESSAGES[field.name];
      return valid;
    }

    const fields = $$("input[required], textarea[required]", form);
    fields.forEach((f) => f.addEventListener("blur", () => f.value && check(f)));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !check(f));
      if (invalid.length) { invalid[0].focus(); return; }

      const data = new FormData(form);
      if (data.get("_gotcha")) return; // robot

      // Sans Formspree configuré : on ouvre la messagerie de l'utilisateur
      if (!D.contact.formspreeId) {
        const body = `${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`;
        location.href = `mailto:${D.identity.email}?subject=${encodeURIComponent("Contact depuis le portfolio")}&body=${encodeURIComponent(body)}`;
        setStatus("Votre messagerie s'ouvre avec le message prérempli.", "ok");
        return;
      }

      submit.disabled = true;
      setStatus("Envoi en cours…");
      try {
        const res = await fetch(`https://formspree.io/f/${encodeURIComponent(D.contact.formspreeId)}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        fields.forEach((f) => f.removeAttribute("aria-invalid"));
        setStatus("Merci, votre message est bien parti. Je reviens vers vous rapidement.", "ok");
      } catch (err) {
        setStatus(`L'envoi a échoué. Écrivez-moi directement à ${D.identity.email}.`, "error");
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ---------- Démarrage ---------- */

  render();
  setupTheme();
  setupNav();
  setupFilters();
  setupModal();
  setupReveal();
  setupCounters();
  setupMotion();
  setupForm();
})();
