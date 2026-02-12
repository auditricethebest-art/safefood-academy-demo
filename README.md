# SafeFood Academy - Guide Complet

## 📚 Présentation

**SafeFood Academy** est une plateforme de formation interactive en sécurité alimentaire avec :
- 🏠 Page d'accueil explicative
- 🔐 Authentification utilisateur (démo locale)
- 📊 Tableau de bord utilisateur
- 📝 Quiz varié (questions classiques et interactives)
- 🏆 Système de badges et progression
- 👨‍💼 Panneau d'administration pour gérer les comptes

## 🎯 Fonctionnalités principales

### 1. **Accueil & Navigation**
- Page d'accueil expliquant l'objectif du site
- Navigation simple : Accueil → Se connecter → Tableau de bord
- Boutons d'action clairs (Se connecter, Voir le tableau)

### 2. **Authentification**
- Modale de connexion intégrée
- Comptes de démo : `admin` / `adminpass`
- Données stockées localement (localStorage - navigateur)

### 3. **Tableau de bord utilisateur**
- Vue d'ensemble : quiz complétés, score moyen, badges gagnés
- Onglets : Quiz Professionnels | Quiz Particuliers | Articles recommandés
- Suivi personnalisé de la progression
- 8 quiz disponibles (4 pro + 4 particuliers)

### 4. **Quiz avec types de questions**

#### Types classiques
- Questions à choix multiple (4 options)
- Réponse correcte = 1 point

#### Types interactifs (NOUVEAU)
- **Relier (Matching)** : Associer concepts ↔ définitions
- **Hiérarchiser (Ranking)** : Classer par ordre d'importance
- **Catégoriser (Drag-Drop)** : Placer dans les bonnes catégories

### 5. **Système de badges**
- 8 badges à débloquer (un par quiz)
- Condition : score ≥ 80%
- Affichage visuel avec icônes emoji

### 6. **Panneau d'administration**
- Visible pour les admins (compte `admin`)
- Lister les comptes
- Ajouter/Supprimer des comptes
- Vue : Nombre de comptes, formulaire de création

## 🚀 Comment utiliser

### Localement

1. Téléchargez/clonez le dépôt
2. Ouvrez `index.html` dans votre navigateur
3. Cliquez « Se connecter »
4. Identifiants démo :
   - **Admin** : admin / adminpass
   - **Utilisateur** : jeand / password

### En ligne (GitHub Pages)

Visitez : https://auditricethebest-art.github.io/safefood-academy-demo/

## 📁 Fichiers

| Fichier | Description |
|---------|-------------|
| `index.html` | Application principale (HTML + CSS + JS) |
| `interactive-questions.js` | Lib pour questions interactives (optionnel) |
| `exemple-questions-interactives.html` | Démo des 3 types de questions |
| `INTERACTIVE_QUESTIONS.md` | Documentation des types de questions |
| `README.md` | Ce fichier |

## 🔧 Intégration des questions interactives

Pour ajouter une question interactive dans le quiz :

### Étape 1 : Importer le script
Dans `index.html`, avant `</body>` :
```html
<script src="interactive-questions.js"></script>
```

### Étape 2 : Ajouter un quiz avec questions interactives

**Exemple :**
```javascript
{
    id: 'example-quiz',
    category: 'pro',
    title: 'Quiz Interactif',
    description: 'Un quiz avec 3 types de questions',
    questionsCount: 3,
    duration: 10,
    badge: 'example',
    questions: [
        // Question classique
        {
            type: 'multiple-choice',
            text: 'Que signifie HACCP ?',
            options: ['Option 1', 'Option 2', 'Hazard Analysis...', 'Option 4'],
            correct: 2,
            topic: 'Définitions'
        },
        
        // Question à relier
        {
            type: 'matching',
            text: 'Associez chaque terme à sa définition',
            pairs: [
                { question: 'HACCP', answer: 'Hazard Analysis Critical Control Point' },
                { question: 'DLC', answer: 'Date Limite de Consommation' }
            ],
            correct: { 0: 0, 1: 1 },
            topic: 'Acronymes'
        },
        
        // Question à hiérarchiser
        {
            type: 'ranking',
            text: 'Ordonnez les étapes',
            items: ['Étape 1', 'Étape 2', 'Étape 3'],
            correct: [0, 1, 2],
            topic: 'Procédures'
        }
    ]
}
```

### Étape 3 : Adapter la logique d'affichage

Dans `displayQuestion()`, ajouter le rendu selon le type :
```javascript
function displayQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    if (question.type === 'matching') {
        initMatchingQuestion('quizOptions', question.pairs);
    } else if (question.type === 'ranking') {
        initRankingQuestion('quizOptions', question.items);
    } else if (question.type === 'dragdrop') {
        initDragDropQuestion('quizOptions', question.categories, question.items);
    } else {
        // Choix multiple standard
        renderMultipleChoice(question);
    }
}
```

## 📊 Structure des données (localStorage)

### Comptes
```json
[
  {
    "username": "admin",
    "name": "Administrateur",
    "email": "admin@safefood.local",
    "role": "admin",
    "password": "adminpass"
  }
]
```

### Données utilisateur
```json
{
  "name": "Jean Dupont",
  "currentUser": "jeand",
  "isAdmin": false,
  "quizzes": {
    "haccp": { "completed": true, "score": 85, "attempts": 1 }
  },
  "badges": ["haccp", "hygiene"]
}
```

## 🎨 Personnalisation

### Couleurs (CSS)
Modifiez dans le `:root` :
```css
:root {
    --primary: #2d5016;        /* Vert foncé */
    --secondary: #ff6b35;      /* Orange */
    --accent: #f7b731;         /* Jaune */
}
```

### Textes
Modifiez dans les variables de contenu (hero, articles, etc.)

### Quiz
Ajoutez/modifiez la liste `quizzes` dans le script

## ⚠️ Limitations (démo)

- Authentification basique (pas de serveur)
- Mots de passe stockés en clair (démo uniquement)
- Données locales au navigateur (perdues en cache vidé)
- Aucune persistance entre appareils

## 🔒 Recommandations pour production

1. **Backend** : Implémenter une vraie authentification (JWT, OAuth)
2. **BD** : Utiliser une base de données (PostgreSQL, MongoDB)
3. **Sécurité** : HTTPS, hachage des mots de passe, validation côté serveur
4. **API** : Créer une API REST pour la gestion des utilisateurs et quiz
5. **Analytics** : Ajouter un système de suivi des résultats

## 📱 Responsivité

Le site est optimisé pour :
- 💻 Ordinateur (1024px+)
- 📱 Tablette (768px+)
- 📲 Mobile (360px+)

## 🆘 Dépannage

| Problème | Solution |
|----------|----------|
| Données perdues | Vérifiez le localStorage du navigateur |
| Connexion impossible | Essayez admin/adminpass |
| Quiz ne s'affiche pas | Vérifiez la console (F12) pour les erreurs |
| Page blanche | Videz le cache du navigateur |

## 🚀 Prochaines étapes

1. Ajouter plus de quiz
2. Intégrer une vraie API backend
3. Créer des profils utilisateur avancés
4. Ajouter des rapports de progression
5. Implémenter des certificats téléchargeables
6. Ajouter un forum/commentaires

## 📝 License

Projet éducatif - Libre d'utilisation et de modification

## 👨‍💻 Support

Pour des questions ou suggestions, consultez la documentation ou créez une issue sur GitHub.

---

**Bonne chance avec SafeFood Academy ! 🎓**
