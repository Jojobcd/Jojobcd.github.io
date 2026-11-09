# Portfolio — N'dri Konan Jean Jaurès

Développeur Python Full Stack & Data Analyst · Abidjan, Côte d'Ivoire

🌐 **En ligne : [jojobcd.github.io](https://jojobcd.github.io/)**

## Technique

Site une page en HTML, CSS et JavaScript natifs, sans framework ni étape de build.

- Tout le contenu (textes, projets, expérience) vient d'un seul fichier de données : `assets/js/data.js`.
- Thème clair et sombre, navigation qui suit la section active, projets filtrables avec une fenêtre de détail.
- Accessibilité : navigation au clavier, `<dialog>` natif, et respect de `prefers-reduced-motion`.
- Sécurité : Content Security Policy stricte sur les scripts, échappement de tout le contenu injecté et filtrage des liens.

## Lancer en local

```bash
python -m http.server 8000 --bind 127.0.0.1
# puis ouvrir http://localhost:8000
```

## Structure

```
index.html            Squelette des sections, SEO et Open Graph
assets/js/data.js     Contenu du site
assets/js/main.js     Rendu des sections et interactions
assets/js/theme.js    Thème appliqué avant l'affichage
assets/css/styles.css Design tokens, thèmes, mise en page
assets/img/           Captures (WebP), image Open Graph, favicon
```
