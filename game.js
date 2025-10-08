class BoggleGame {
    constructor() {
        this.board = [];
        this.visited = [];
        this.wordsFound = new Set();
        this.currentSeed = null;
    }

    // Seeded random number generator
    seededRandom(seed) {
        let value = seed;
        return function() {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    generateBoard(seed) {
        this.currentSeed = seed;
        const random = this.seededRandom(seed);
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        this.board = [];
        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const randomIndex = Math.floor(random() * 26);
                row.push(letters[randomIndex]);
            }
            this.board.push(row);
        }

        this.resetVisited();
        return this.board;
    }

    resetVisited() {
        this.visited = Array(4).fill(null).map(() => Array(4).fill(false));
    }

    isValidWord(word) {
        if (!word || word.length === 0) return false;

        this.resetVisited();

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === word[0]) {
                    if (this.locateWord(word, i, j, 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    locateWord(word, row, col, index) {
        if (index === word.length) {
            return true;
        }

        if (row < 0 || row >= 4 || col < 0 || col >= 4 ||
            this.visited[row][col] || this.board[row][col] !== word[index]) {
            return false;
        }

        this.visited[row][col] = true;

        // Check all 4 directions (up, down, left, right)
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        for (const [dRow, dCol] of directions) {
            if (this.locateWord(word, row + dRow, col + dCol, index + 1)) {
                return true;
            }
        }

        // Backtrack
        this.visited[row][col] = false;
        return false;
    }

    getWordPath(word) {
        this.resetVisited();
        const path = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === word[0]) {
                    if (this.findPath(word, i, j, 0, path)) {
                        return path;
                    }
                }
            }
        }
        return [];
    }

    findPath(word, row, col, index, path) {
        if (index === word.length) {
            return true;
        }

        if (row < 0 || row >= 4 || col < 0 || col >= 4 ||
            this.visited[row][col] || this.board[row][col] !== word[index]) {
            return false;
        }

        this.visited[row][col] = true;
        path.push([row, col]);

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        for (const [dRow, dCol] of directions) {
            if (this.findPath(word, row + dRow, col + dCol, index + 1, path)) {
                return true;
            }
        }

        this.visited[row][col] = false;
        path.pop();
        return false;
    }

    isPalindrome(word) {
        return this.checkPalindrome(word, 0, word.length - 1);
    }

    checkPalindrome(word, left, right) {
        if (left >= right) {
            return true;
        }
        if (word[left] !== word[right]) {
            return false;
        }
        return this.checkPalindrome(word, left + 1, right - 1);
    }
}

// UI Controller
const game = new BoggleGame();

const setupSection = document.getElementById('setupSection');
const gameSection = document.getElementById('gameSection');
const seedInput = document.getElementById('seedInput');
const startBtn = document.getElementById('startBtn');
const boardElement = document.getElementById('board');
const wordInput = document.getElementById('wordInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const messageElement = document.getElementById('message');
const wordsFoundElement = document.getElementById('wordsFound');
const currentSeedElement = document.getElementById('currentSeed');

function renderBoard(highlightPath = []) {
    boardElement.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = game.board[i][j];

            // Check if this cell is in the highlight path
            if (highlightPath.some(([row, col]) => row === i && col === j)) {
                cell.classList.add('highlight');
            }

            boardElement.appendChild(cell);
        }
    }
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;

    setTimeout(() => {
        messageElement.className = 'message';
        messageElement.textContent = '';
    }, 5000);
}

function startGame() {
    const seed = parseInt(seedInput.value);

    if (isNaN(seed)) {
        alert('Please enter a valid number for the seed!');
        return;
    }

    game.generateBoard(seed);
    game.wordsFound.clear();

    setupSection.style.display = 'none';
    gameSection.style.display = 'block';

    currentSeedElement.textContent = seed;
    wordsFoundElement.textContent = '0';

    renderBoard();
}

function submitWord() {
    const word = wordInput.value.trim().toUpperCase();

    if (!word) {
        showMessage('Please enter a word!', 'error');
        return;
    }

    if (!/^[A-Z]+$/.test(word)) {
        showMessage('Please use only uppercase letters!', 'error');
        return;
    }

    if (game.wordsFound.has(word)) {
        showMessage('You already found this word!', 'info');
        return;
    }

    if (game.isValidWord(word)) {
        game.wordsFound.add(word);
        wordsFoundElement.textContent = game.wordsFound.size;

        const path = game.getWordPath(word);
        renderBoard(path);

        const isPalin = game.isPalindrome(word);
        const palindromeMsg = isPalin ? ' It\'s also a palindrome! 🎉' : '';

        showMessage(`Nice job! "${word}" is valid!${palindromeMsg}`, 'success');

        wordInput.value = '';

        // Reset board highlighting after 2 seconds
        setTimeout(() => {
            renderBoard();
        }, 2000);
    } else {
        const isPalin = game.isPalindrome(word);
        const palindromeMsg = isPalin ? ` The word "${word}" is a palindrome.` : ` The word "${word}" is not a palindrome.`;

        showMessage(`I don't see that word. Are we looking at the same board?${palindromeMsg}`, 'error');
    }
}

function resetGame() {
    setupSection.style.display = 'block';
    gameSection.style.display = 'none';
    seedInput.value = '';
    wordInput.value = '';
    messageElement.textContent = '';
    messageElement.className = 'message';
}

// Event listeners
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', submitWord);
resetBtn.addEventListener('click', resetGame);

wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitWord();
    }
});

seedInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});

// Auto-uppercase as user types
wordInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});
