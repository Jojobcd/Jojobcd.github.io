# Portfolio — N'dri Konan Jean Jaurès

Site une page, en HTML/CSS/JS pur : il n'y a rien à installer et aucune étape de build.

## Structure

```
portfolio-jaures/
├── index.html            Squelette des sections + balises SEO / Open Graph
├── assets/
│   ├── js/data.js        ← TOUT le contenu (textes, projets, expérience, liens)
│   ├── js/main.js        Rendu des sections + interactions
│   ├── css/styles.css    Tokens de couleur, thèmes clair/sombre, mise en page
│   └── img/              Captures (WebP), image Open Graph, favicon
├── netlify.toml          Configuration Netlify (en-têtes, cache)
└── vercel.json           Configuration Vercel (même chose)
```

## Modifier le contenu

Tout se passe dans `assets/js/data.js`. Les champs marqués `À COMPLÉTER` sont vides,
et l'élément correspondant reste masqué tant qu'ils ne sont pas remplis :

- `identity.linkedin` : l'URL de ton profil LinkedIn
- `identity.cv` : le chemin vers ton CV en PDF (ajoute un bouton « CV » dans le hero)
- `contact.formspreeId` : l'identifiant Formspree (voir plus bas)
- `experience[].period` : les dates à vérifier
- `projects[sankofa].result` : un chiffre mesuré chez le client, si tu en as un

**Ajouter un projet** : copie un objet dans `projects`. Pour `image`, utilise une capture en WebP
d'environ 960 px de large. Si tu laisses `image: ""`, une illustration est générée automatiquement.
Les chiffres « projets livrés » et « tableaux de bord » se recalculent tout seuls.

## Lancer en local

Un serveur local suffit (n'ouvre pas `index.html` en double-clic : certaines fonctions ne marchent pas en `file://`) :

```bash
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Tu peux aussi utiliser l'extension VS Code « Live Server ».

## Formulaire de contact (Formspree)

1. Crée un compte gratuit sur https://formspree.io (50 messages par mois).
2. Clique sur « New form » et copie l'identifiant, par exemple `xyzabcde` dans `https://formspree.io/f/xyzabcde`.
3. Colle-le dans `contact.formspreeId` dans `data.js`.

Tant que ce champ est vide, le bouton « Envoyer » ouvre la messagerie du visiteur avec le message déjà rempli.

## Déployer

### Netlify

- **Le plus simple** : glisse le dossier `portfolio-jaures` sur https://app.netlify.com/drop.
- **Avec GitHub** : pousse le dossier sur un dépôt, puis dans Netlify choisis « Add new site », « Import from Git », et sélectionne ce dépôt. Laisse la commande de build vide et le dossier de publication à `.`.

### Vercel

```bash
npm i -g vercel
vercel          # première fois : répondre aux questions, framework = "Other"
vercel --prod
```

Tu peux aussi passer par l'interface : « Add New Project », importer le dépôt GitHub, preset « Other ».

### Après le déploiement

Remplace `https://VOTRE-DOMAINE` par l'URL réelle dans `index.html` (balises `canonical`, `og:url`
et `og:image`), puis redéploie. Pour vérifier l'aperçu sur les réseaux sociaux : https://www.opengraph.xyz.

## Points d'attention

- **Liens GitHub** : vérifie que les dépôts `agricredit-ai` et `prediction-pauvrete-cote-ivoire` sont publics. Sinon, vide `links.github` pour ces projets.
- **Démo AgriCredit** : elle tourne sur l'offre gratuite de Render et met environ 1 minute à se réveiller.
  Pense à la réveiller avant d'envoyer le lien à quelqu'un.
- **Octobre Rose** : ne publie jamais les microdonnées DHS ; seuls les captures et le dashboard agrégé sont publics.
