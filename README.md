# Portfolio — Gwennaëlle

Portfolio professionnel en ligne pour le BTS Communication.
Stack moderne (React Router 7 framework, React 19, TS, Tailwind 4, Motion + GSAP + Lenis, Velite MDX + Zod, Resend), prête à déployer via Docker sur Dokploy.

---

## Développement local

```bash
# 1. Installer les dépendances (une seule fois)
pnpm install

# 2. Créer ton fichier d'env local à partir du template
cp .env.example .env

#    Puis remplir RESEND_API_KEY (clé sur https://resend.com)

# 3. Lancer le serveur de dev
pnpm dev
```

Le site tourne sur http://localhost:5173.

## Scripts

| Commande | Rôle |
|---|---|
| `pnpm dev` | Serveur de dev avec HMR (Vite + React Router) |
| `pnpm build` | Build de production (Velite → assets optimisés → build SSG) |
| `pnpm start` | Serveur Node de production (`react-router-serve`) |
| `pnpm typecheck` | Vérification TypeScript |

---

## Ajouter un nouveau projet

Chaque projet vit dans `content/projects/<slug>/` :

```
content/projects/mon-nouveau-projet/
├── index.mdx        # frontmatter avec tous les champs + body
├── cover.png        # image de couverture (landscape)
└── gallery/         # toutes les images du projet (numérotées)
    ├── 01.png
    ├── 02.png
    └── …
```

Le frontmatter doit respecter le schéma Zod défini dans [velite.config.ts](velite.config.ts) :

```yaml
---
id: 8                        # identifiant numérique unique
slug: mon-nouveau-projet     # doit matcher le nom du dossier
title: Titre du projet
subtitle: Sous-titre court
category: formation          # formation | entreprise | perso
year: "2026"
order: 80                    # ordre d'affichage (plus bas = plus haut dans la liste)
image: ./cover.png
brief:
  context: >-
    …
  mission: >-
    …
  result: >-
    …
objectives:
  - type: Cognitif
    icon: Brain                # doit être dans la map ICONS (voir app/lib/icons.ts)
    desc: …
targets:
  - type: Cible principale
    desc: …
gallery:
  - ./gallery/01.png
galleryFolders:
  reseauxSociaux: []
  videos: []
  print: []
  plus: []
---

Description libre, visible en bas de la page projet.
```

Après ajout, `pnpm dev` détecte automatiquement le nouveau projet (Velite en watch).
Pour la production : `pnpm build` régénère tout.

## Stack

- **React Router 7** (mode framework, SSG pré-rendu au build)
- **React 19** + **TypeScript 5**
- **Vite**
- **Tailwind v4** + fontes self-hosted (Playfair Display + Inter)
- **Motion** (Framer Motion) + **GSAP** (ScrollTrigger, SplitText) + **Lenis** (smooth scroll)
- **Embla Carousel** pour les galeries
- **Lucide** pour les icônes
- **Velite** (MDX + Zod) pour le contenu des projets, avec pipeline **Sharp** pour AVIF/WebP responsive
- **react-hook-form** + **Zod** côté formulaire, **Resend** côté envoi mail

## Structure

```
app/
├── components/          # UI (cherry/, layout/, hero/, project/, about/, contact/, motion/)
├── routes/              # pages (home, projects, project-detail, about, contact) + api.contact
├── lib/                 # colors, icons, cn, resend, contact-schema
├── styles/              # app.css (@theme) + globals
├── root.tsx             # layout racine (Navigation + Footer + CherryCursor + Lenis)
├── routes.ts            # config file-based des routes
├── entry.client.tsx
└── entry.server.tsx
content/
└── projects/
    ├── proxite/ · youtube/ · soleia/ · glowringa/ · lgm/ · musee/
public/                  # favicon, photo About, assets statiques
```

## Déploiement (Dokploy)

Le `Dockerfile` multi-stage est prêt à l'emploi :

```bash
docker build -t portfolio-gwen .
docker run -p 3000:3000 \
  -e RESEND_API_KEY=re_xxxx \
  -e CONTACT_TO_EMAIL=gwenmariamon@gmail.com \
  -e CONTACT_FROM_EMAIL="Portfolio <noreply@ton-domaine.fr>" \
  portfolio-gwen
```

Sur Dokploy :
1. Nouveau service → Application → type **Dockerfile**.
2. Repo git connecté, branch `main`.
3. Variables d'env : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Port exposé : **3000**.
5. Domaine custom + TLS auto (géré par le Traefik intégré à Dokploy).

Chaque push sur `main` = redéploiement automatique.

## Configuration Resend

1. Créer un compte sur [resend.com](https://resend.com).
2. **Dev** : utiliser `onboarding@resend.dev` comme expéditeur — les mails n'arrivent qu'à l'adresse du compte Resend, c'est suffisant pour tester.
3. **Prod** : vérifier un domaine dans Resend (ajouter les records DNS fournis), puis mettre `CONTACT_FROM_EMAIL="Portfolio <noreply@ton-domaine.fr>"`.
4. Copier la clé API dans les variables d'env Dokploy.
