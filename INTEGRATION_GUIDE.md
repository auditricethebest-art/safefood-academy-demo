# 🎯 Guide Rapide - Intégration des Questions Interactives

## Résumé

J'ai créé 3 nouveaux types de questions interactives pour vos quiz SafeFood Academy :

### 1️⃣ **Relier (Matching)**
Associer des termes à leurs définitions (ex: HACCP ↔ définition)
- Utilisateur clique sur gauche, puis sur droite pour créer des paires
- Format : `{ question: "terme", answer: "définition" }`

### 2️⃣ **Hiérarchiser (Ranking)**
Classer des éléments par ordre (ex: étapes de cuisson)
- Glisser-déposer pour réordonner
- Format : tableau d'éléments à ordonner

### 3️⃣ **Catégoriser (Drag-Drop)**
Placer des éléments dans les bonnes catégories (ex: dangers biologiques/physiques/chimiques)
- Glisser chaque élément dans sa catégorie
- Format : items à classer + noms des catégories

---

## 📂 Nouveaux fichiers créés

| Fichier | Contenu |
|---------|---------|
| `interactive-questions.js` | Bibliothèque JS (fonctions pour les 3 types) |
| `exemple-questions-interactives.html` | Démo fonctionnelle (testez-la !) |
| `INTERACTIVE_QUESTIONS.md` | Doc technique complète |
| `README.md` | Guide complet du projet |

---

## 🔗 Fichiers en ligne

Tous les fichiers sont maintenant sur GitHub :
👉 https://github.com/auditricethebest-art/safefood-academy-demo

---

## ✅ Comment tester

### Option 1 : Tester la démo
Ouvrez : `exemple-questions-interactives.html` dans votre navigateur
- Vous verrez 3 exemples de questions interactives
- Testez : relier, réordonner, drag-drop

### Option 2 : Voir le code
Ouvrez `interactive-questions.js` pour voir les fonctions

### Option 3 : Intégrer à votre site
(Voir étape suivante)

---

## 🚀 Intégration à `index.html` (optionnel)

Si vous voulez ajouter des questions interactives à votre site principal :

### Étape 1 : Ajouter le script
Dans `index.html`, avant `</body>`, ajoutez :
```html
<script src="interactive-questions.js"></script>
```

### Étape 2 : Créer un quiz avec questions interactives
Ajoutez un nouveau quiz dans la liste `quizzes` avec `type: 'matching'`, `'ranking'`, ou `'dragdrop'`.

Exemple complet :
```javascript
{
    id: 'termes-haccp',
    category: 'pro',
    title: 'Quiz Interactif HACCP',
    description: 'Testez votre connaissance avec des questions interactives',
    questionsCount: 1,
    duration: 5,
    badge: 'example',
    questions: [
        {
            type: 'matching',
            text: 'Associez chaque terme à sa définition',
            pairs: [
                { question: 'HACCP', answer: 'Hazard Analysis Critical Control Point' },
                { question: 'DLC', answer: 'Date Limite de Consommation' },
                { question: 'CCP', answer: 'Critical Control Point' }
            ],
            correct: { 0: 0, 1: 1, 2: 2 },
            topic: 'Acronymes HACCP'
        }
    ]
}
```

### Étape 3 : Adapter la fonction `displayQuestion()`
Modifiez la partie qui affiche les questions pour gérer les nouveaux types :

```javascript
function displayQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    // Déterminer le type
    if (question.type === 'matching') {
        // Vider quizOptions
        document.getElementById('quizOptions').innerHTML = '';
        // Initialiser la question de relier
        initMatchingQuestion('quizOptions', question.pairs);
    } 
    else if (question.type === 'ranking') {
        document.getElementById('quizOptions').innerHTML = '';
        initRankingQuestion('quizOptions', question.items);
    } 
    else if (question.type === 'dragdrop') {
        document.getElementById('quizOptions').innerHTML = '';
        initDragDropQuestion('quizOptions', question.categories, question.items);
    } 
    else {
        // Questions classiques (choix multiple)
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="quiz-option" onclick="selectOption(${index})">
                ${option}
            </div>
        `).join('');
    }
    
    // Afficher la question...
    document.getElementById('questionText').textContent = question.text;
}
```

### Étape 4 : Adapter la fonction `selectOption()`
Pour les questions interactives, vous devez capturer les réponses différemment :

```javascript
function selectOption(optionIndex) {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    if (question.type === 'multiple-choice') {
        // Code existant...
        userAnswers[currentQuestionIndex] = optionIndex;
    }
    // Les questions interactives gèrent leur propre capture via getMatchingAnswers(), getRankingAnswers(), getDragDropAnswers()
}
```

### Étape 5 : Adapter `finishQuiz()`
Évaluer les réponses correctement :

```javascript
function finishQuiz() {
    let correctAnswers = 0;
    
    currentQuiz.questions.forEach((question, index) => {
        if (question.type === 'matching') {
            const answers = getMatchingAnswers();
            if (JSON.stringify(answers) === JSON.stringify(question.correct)) {
                correctAnswers++;
            }
        } 
        else if (question.type === 'ranking') {
            const answers = getRankingAnswers();
            if (JSON.stringify(answers) === JSON.stringify(question.correct)) {
                correctAnswers++;
            }
        } 
        else if (question.type === 'dragdrop') {
            const answers = getDragDropAnswers();
            let isCorrect = true;
            for (let i = 0; i < question.correct.length; i++) {
                if (answers[i] !== question.correct[i]) {
                    isCorrect = false;
                    break;
                }
            }
            if (isCorrect) correctAnswers++;
        }
        else {
            // Choix multiple
            if (userAnswers[index] === question.correct) {
                correctAnswers++;
            }
        }
    });
    
    const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    // Continuer avec le reste...
}
```

---

## 🎨 Personnalisation

### Ajouter du CSS personnalisé
Modifiez les classes dans `index.html` :
- `.matching-item` : style des éléments à relier
- `.ranking-item` : style des éléments à réordonner
- `.draggable-item` : style des éléments à glisser

### Adapter les émojis/textes
Modifiez les templates HTML dans `interactive-questions.js`

---

## 💡 Exemples supplémentaires

### Question Matching avancée
```javascript
{
    type: 'matching',
    text: 'Associez les zones du réfrigérateur à leur température',
    pairs: [
        { question: 'Zone supérieure', answer: '4-8°C' },
        { question: 'Rayon viande', answer: '0-2°C' },
        { question: 'Porte', answer: '8-10°C' }
    ],
    correct: { 0: 1, 1: 0, 2: 2 },
    topic: 'Températures'
}
```

### Question Ranking
```javascript
{
    type: 'ranking',
    text: 'Ordonnez les étapes de nettoyage CORRECT',
    items: [
        'Retirer les résidus visibles',
        'Laver à l\'eau + détergent',
        'Rincer',
        'Désinfecter',
        'Laisser sécher'
    ],
    correct: [0, 1, 2, 3, 4],
    topic: 'Procédures'
}
```

### Question Drag-Drop
```javascript
{
    type: 'dragdrop',
    text: 'Classez les aliments par zone du réfrigérateur',
    categories: ['Congeleur', 'Zone froide (0-2°C)', 'Zone moyenne (4-8°C)', 'Porte'],
    items: [
        'Viande crue', 'Lait', 'Condiments', 'Glace',
        'Poisson', 'Oeufs', 'Fromage', 'Beurre'
    ],
    correct: {
        0: 'Zone froide (0-2°C)',   // Viande
        1: 'Zone moyenne (4-8°C)',   // Lait
        2: 'Porte',                   // Condiments
        3: 'Congeleur',               // Glace
        4: 'Zone froide (0-2°C)',   // Poisson
        5: 'Zone moyenne (4-8°C)',   // Oeufs
        6: 'Zone moyenne (4-8°C)',   // Fromage
        7: 'Porte'                    // Beurre
    }
}
```

---

## ⚠️ Notes importantes

1. **localStorage** : Tout est stocké localement (pas de serveur)
2. **Compatible** : Fonctionne sur tous les navigateurs modernes
3. **Mobile-friendly** : Glisser-déposer adapté au tactile
4. **Accessible** : Focus clavier, ARIA labels

---

## 🎓 Prochaines étapes

- [ ] Tester la démo (`exemple-questions-interactives.html`)
- [ ] Intégrer à `index.html` (optionnel)
- [ ] Créer vos propres quiz avec types interactifs
- [ ] Personnaliser les couleurs/textes

---

## 📞 Besoin d'aide ?

Consultez :
- `INTERACTIVE_QUESTIONS.md` (doc technique)
- `README.md` (guide complet)
- `exemple-questions-interactives.html` (code fonctionnel)

**Bonne chance ! 🚀**
