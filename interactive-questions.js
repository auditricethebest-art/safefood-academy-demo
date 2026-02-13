// Interactive Question Types for SafeFood Academy
// Support for: matching, ranking, drag-drop

// Matching Questions - Associate pairs (left ↔ right)
function initMatchingQuestion(containerId, pairs) {
    const container = document.getElementById(containerId);
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'matching-column';
    right.className = 'matching-column';

    let leftItems = [];
    let rightItems = [];
    let pairMap = {}; // Store the original pairs data

    // Handle two formats: array of objects or direct pairs array
    let pairsArray = [];
    if (Array.isArray(pairs) && pairs.length > 0) {
        if (pairs[0].question !== undefined) {
            // Format: array of objects with question/answer
            pairsArray = pairs;
        } else {
            pairsArray = pairs;
        }
    } else {
        pairsArray = pairs;
    }

    pairsArray.forEach((pair, idx) => {
        const question = pair.question || pair;
        const answer = pair.answer || pair;
        
        pairMap[question] = answer;

        const leftItem = document.createElement('div');
        leftItem.className = 'matching-item';
        leftItem.textContent = question;
        leftItem.id = `left-${idx}`;
        leftItem.dataset.pairKey = question;
        leftItem.onclick = () => selectLeft(idx, question);
        left.appendChild(leftItem);
        leftItems.push(leftItem);

        const rightItem = document.createElement('div');
        rightItem.className = 'matching-item';
        rightItem.textContent = answer;
        rightItem.id = `right-${idx}`;
        rightItem.dataset.pairValue = answer;
        rightItem.onclick = () => selectRight(idx, question, answer);
        right.appendChild(rightItem);
        rightItems.push(rightItem);
    });

    container.innerHTML = '';
    const matchingContainer = document.createElement('div');
    matchingContainer.className = 'matching-container';
    matchingContainer.appendChild(left);
    matchingContainer.appendChild(right);
    container.appendChild(matchingContainer);

    let selectedLeft = null;
    let selectedLeftKey = null;
    let connections = {};

    window.selectLeft = (idx, key) => {
        leftItems.forEach(i => i.classList.remove('selected'));
        leftItems[idx].classList.add('selected');
        selectedLeft = idx;
        selectedLeftKey = key;
    };

    window.selectRight = (idx, key, value) => {
        if (selectedLeft !== null) {
            connections[selectedLeftKey] = value;
            leftItems[selectedLeft].classList.remove('selected');
            leftItems[selectedLeft].classList.add('connected');
            rightItems[idx].classList.add('connected');
            selectedLeft = null;
            selectedLeftKey = null;
        }
    };

    window.getMatchingAnswers = () => connections;
}

// Ranking Questions - Reorder items by priority
function initRankingQuestion(containerId, items) {
    const container = document.getElementById(containerId);
    const rankingList = document.createElement('div');
    rankingList.className = 'ranking-list';
    rankingList.id = `ranking-${containerId}`;

    let itemsState = [...items].map((item, idx) => ({ text: item, id: idx, order: idx }));

    function render() {
        rankingList.innerHTML = '';
        itemsState.forEach((item, position) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'ranking-item';
            itemEl.draggable = true;
            itemEl.id = `rank-item-${item.id}`;
            itemEl.innerHTML = `
                <span class="ranking-item-drag-handle">⋮⋮</span>
                <span class="ranking-item-number">${position + 1}</span>
                <span>${item.text}</span>
            `;
            itemEl.ondragstart = (e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', item.id); };
            itemEl.ondragover = (e) => { e.preventDefault(); itemEl.style.opacity = '0.7'; };
            itemEl.ondragleave = () => { itemEl.style.opacity = '1'; };
            itemEl.ondrop = (e) => {
                e.preventDefault();
                const sourceId = parseInt(e.dataTransfer.getData('text/plain'));
                const sourceIdx = itemsState.findIndex(i => i.id === sourceId);
                const targetIdx = itemsState.findIndex(i => i.id === item.id);
                if (sourceIdx !== -1 && targetIdx !== -1) {
                    [itemsState[sourceIdx], itemsState[targetIdx]] = [itemsState[targetIdx], itemsState[sourceIdx]];
                    render();
                }
            };
            rankingList.appendChild(itemEl);
        });
    }

    container.innerHTML = '';
    container.appendChild(rankingList);
    render();

    window.getRankingAnswers = () => itemsState.map(item => item.id);
}

// Drag-Drop Questions - Place items into categories
function initDragDropQuestion(containerId, categories, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-container';

    const categoryBoxes = {};
    categories.forEach(cat => {
        const catBox = document.createElement('div');
        catBox.className = 'category-box';
        catBox.id = `cat-${cat}`;
        catBox.innerHTML = `<div class="category-box-title">${cat}</div>`;
        catBox.ondragover = (e) => { e.preventDefault(); catBox.classList.add('drag-over'); };
        catBox.ondragleave = () => { catBox.classList.remove('drag-over'); };
        catBox.ondrop = (e) => {
            e.preventDefault();
            catBox.classList.remove('drag-over');
            const itemId = e.dataTransfer.getData('text/plain');
            const itemEl = document.getElementById(`drag-item-${itemId}`);
            if (itemEl) {
                catBox.appendChild(itemEl);
                itemEl.dataset.category = cat;
            }
        };
        categoryContainer.appendChild(catBox);
        categoryBoxes[cat] = catBox;
    });

    const itemsBox = document.createElement('div');
    itemsBox.className = 'category-box';
    itemsBox.innerHTML = '<div class="category-box-title">Éléments à classer</div>';
    items.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'draggable-item';
        itemEl.id = `drag-item-${idx}`;
        itemEl.textContent = item;
        itemEl.draggable = true;
        itemEl.dataset.index = idx;
        itemEl.ondragstart = (e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', idx); };
        itemEl.ondragend = () => { itemEl.classList.remove('dragging'); };
        itemsBox.appendChild(itemEl);
    });

    container.appendChild(itemsBox);
    container.appendChild(categoryContainer);

    window.getDragDropAnswers = () => {
        const answers = {};
        items.forEach((_, idx) => {
            const itemEl = document.getElementById(`drag-item-${idx}`);
            const category = itemEl.dataset.category || 'non-classé';
            answers[String(idx)] = category;
        });
        return answers;
    };
}
