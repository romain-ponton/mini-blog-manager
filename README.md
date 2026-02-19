 Mini Blog Manager
Application React moderne permettant la gestion complète d’un mini-blog avec authentification, CRUD et interface éditoriale inspirée d’un design magazine.

 Objectif du projet
Ce projet a pour but de développer une application React complète intégrant :
    • Authentification utilisateur
    • Gestion des articles (CRUD)
    • Navigation protégée
    • Architecture propre et modulaire
    • Interface moderne type magazine

 Fonctionnalités implémentées
 Authentification
    • Connexion via API (/auth/login)
    • Gestion du token
    • Contexte global d’authentification
    • Routes protégées
    • Redirection automatique

 Gestion des articles (CRUD)
    •  Liste paginée des articles
    •  Détail d’un article
    •  Création d’article
    •  Modification d’article
    •  Suppression d’article
    •  Optimistic update côté UI
    •  Navigation vers détail via carte cliquable

 Interface moderne
    • HeroEditorialCarousel animé (Swiper)
    • Layout magazine asymétrique
    • Cards uniformisées
    • Design responsive (4 colonnes desktop)
    • Pagination (12 articles par page)
    • Page de connexion centrée et moderne

 Architecture
src/
│
├── components/
│   ├── PostCard.jsx
│   ├── PostForm.jsx
│   ├── HeroEditorialCarousel.jsx
│   └── Loader.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── BlogPage.jsx
│   ├── PostDetailPage.jsx
│   └── LoginPage.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── services/
│   └── api.js
│
└── App.jsx


 Stack technique
    • React 19
    • React Router
    • MUI v6 (Grid v2)
    • Swiper.js
    • Axios
    • DummyJSON API


 UI / UX
    • Design inspiré de Dribbble (Magazine layout)
    • Hero animé avec article principal dominant
    • Cards cliquables
    • Suppression uniquement en page détail
    • Interface cohérente sur toutes les pages
