# SafeFood Academy - Amélioration : Types de Questions Interactives

## Nouvelles fonctionnalités

Trois types de questions interactives ont été ajoutés pour rendre les quiz plus engageants :

### 1. **Questions à Relier** (Matching)
Associer des termes ou concepts à leurs définitions/réponses.
- Exemple : "HACCP" ↔ "Hazard Analysis Critical Control Point"
- L'utilisateur clique sur un élément à gauche, puis à droite pour créer une paire.

### 2. **Questions à Hiérarchiser** (Ranking)
Classer des éléments par ordre d'importance ou d'étapes.
- Exemple : Ordonner les étapes d'une cuisson correcte.
- Glisser-déposer (drag & drop) pour réordonner les items.

### 3. **Questions de Catégorisation** (Drag-Drop)
Placer des éléments dans les bonnes catégories.
- Exemple : Classer les dangers alimentaires (biologiques, physiques, chimiques).
- Glisser chaque élément dans la bonne boîte de catégorie.

## Comment utiliser

### Ajouter le script dans `index.html`
Avant la balise `</body>`, ajoutez :
```html
<script src="interactive-questions.js"></script>
```

### Exemples d'utilisation dans les quiz

#### Question à Relier
```javascript
{
    type: 'matching',
    text: 'Associez chaque acronyme à sa signification',
    pairs: [
        { question: 'HACCP', answer: 'Hazard Analysis Critical Control Point' },
        { question: 'DLC', answer: 'Date Limite de Consommation' },
        { question: 'FIFO', answer: 'First In First Out' }
    ],
    correct: { 0: 0, 1: 1, 2: 2 }  // Index des bonnes paires
}
```

#### Question à Hiérarchiser
```javascript
{
    type: 'ranking',
    text: 'Ordonnez les étapes de refroidissement correct',
    items: [
        'Refroidir de 70°C à 10°C en moins de 2h',
        'Placer au réfrigérateur',
        'Laisser refroidir à température ambiante'
    ],
    correct: [0, 2, 1]  // Ordre correct (index des items)
}
```

#### Question de Catégorisation
```javascript
{
    type: 'dragdrop',
    text: 'Classez les dangers par type',
    categories: ['Biologique', 'Physique', 'Chimique'],
    items: [
        'Bactéries pathogènes',
        'Verre cassé',
        'Pesticides',
        'Listeria',
        'Fragment métallique',
        'Détergent'
    ],
    correct: {
        0: 'Biologique',
        1: 'Physique',
        2: 'Chimique',
        3: 'Biologique',
        4: 'Physique',
        5: 'Chimique'
    }
}
```

## Intégration au système de scoring

Les réponses sont automatiquement évaluées :
- **Matching** : Vérifie si toutes les paires sont correctes.
- **Ranking** : Vérifie si l'ordre est exact.
- **Drag-Drop** : Vérifie si chaque item est dans la bonne catégorie.

## Avantages

✅ Plus interactif et engageant
✅ Favorise la rétention d'information
✅ Adaptation pédagogique (tests variés)
✅ Meilleure UX sur mobile
✅ Accessibilité améliorée

## Notes techniques

- Tous les fichiers JavaScript s'exécutent côté client (localStorage).
- Aucun serveur n'est requis.
- Compatible avec tous les navigateurs modernes.
