// Appliqué avant l'affichage pour éviter un flash : thème clair/sombre + profil affiché
(function () {
  var root = document.documentElement;
  var t = null;
  try { t = localStorage.getItem("theme"); } catch (e) {}
  if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  root.dataset.theme = t;

  // Lien ciblé : ?vue=data ou ?vue=dev ouvre directement le bon profil
  var v = null;
  try { v = new URLSearchParams(location.search).get("vue"); } catch (e) {}
  root.dataset.lens = v === "data" || v === "dev" ? v : "both";

  root.classList.add("js");
})();
