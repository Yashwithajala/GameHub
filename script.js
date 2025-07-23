// Main Game Hub Controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all games
    initTicTacToe();
    initRockPaperScissors();
    initMemoryGame();
    initSnakeGame();
});

function loadGame(gameName) {
    // Hide all game screens first
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Hide placeholder
    document.querySelector('.placeholder').style.display = 'none';
    
    // Show selected game
    const gameScreen = document.getElementById(`${gameName}-screen`);
    if (gameScreen) {
        gameScreen.classList.add('active');
    }
    
    // Reset/initialize the specific game if needed
    switch(gameName) {
        case 'tictactoe':
            resetTicTacToe();
            break;
        case 'rps':
            // Rock Paper Scissors doesn't need reset
            break;
        case 'memory':
            startMemoryGame();
            break;
        case 'snake':
            resetSnakeGame();
            break;
    }
}

// Tic Tac Toe Game
function initTicTacToe() {
    const container = document.querySelector('.game-container');
    
    const ticTacToeHTML = `
        <div class="game-screen" id="tictactoe-screen">
            <h2 class="game-title">Tic Tac Toe</h2>
            <div class="tic-tac-toe-board">
                <div class="row">
                    <div class="cell" data-index="0"></div>
                    <div class="cell" data-index="1"></div>
                    <div class="cell" data-index="2"></div>
                </div>
                <div class="row">
                    <div class="cell" data-index="3"></div>
                    <div class="cell" data-index="4"></div>
                    <div class="cell" data-index="5"></div>
                </div>
                <div class="row">
                    <div class="cell" data-index="6"></div>
                    <div class="cell" data-index="7"></div>
                    <div class="cell" data-index="8"></div>
                </div>
            </div>
            <div class="game-status" id="tic-tac-toe-status">Player X's turn</div>
            <button class="reset-btn" onclick="resetTicTacToe()">Reset Game</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', ticTacToeHTML);
    
    // Add CSS for Tic Tac Toe
    const style = document.createElement('style');
    style.textContent = `
        .tic-tac-toe-board {
            display: inline-block;
            border: 4px solid var(--accent);
            background-color: var(--dark);
            margin: 0 auto;
        }
        
        .row {
            display: flex;
        }
        
        .cell {
            width: 80px;
            height: 80px;
            border: 2px solid var(--secondary);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .cell:hover {
            background-color: rgba(147, 112, 219, 0.2);
        }
        
        .game-status {
            margin: 20px 0;
            font-size: 1.2rem;
            color: var(--accent);
            text-align: center;
        }
        
        .reset-btn {
            background-color: var(--primary);
            color: var(--light);
            border: none;
            padding: 10px 20px;
            font-family: 'Press Start 2P', cursive;
            cursor: pointer;
            display: block;
            margin: 0 auto;
            transition: all 0.2s;
        }
        
        .reset-btn:hover {
            background-color: var(--accent);
            color: var(--dark);
        }
    `;
    
    document.head.appendChild(style);
}

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    if (currentPlayer === 'X') {
        clickedCell.style.color = '#ff6b6b';
    } else {
        clickedCell.style.color = '#4ecdc4';
    }
    
    checkResult();
}

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    let roundWon = false;
    
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        document.getElementById('tic-tac-toe-status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    let roundDraw = !gameState.includes('');
    
    if (roundDraw) {
        document.getElementById('tic-tac-toe-status').textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('tic-tac-toe-status').textContent = `Player ${currentPlayer}'s turn`;
}

function resetTicTacToe() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('tic-tac-toe-status').textContent = `Player ${currentPlayer}'s turn`;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

// Add event listeners after DOM is loaded
setTimeout(() => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}, 100);

// Rock Paper Scissors Game
function initRockPaperScissors() {
    const container = document.querySelector('.game-container');
    
    const rpsHTML = `
        <div class="game-screen" id="rps-screen">
            <h2 class="game-title">Rock Paper Scissors</h2>
            <div class="rps-game-area">
                <div class="rps-choices">
                    <button class="rps-choice" data-choice="rock">✊</button>
                    <button class="rps-choice" data-choice="paper">✋</button>
                    <button class="rps-choice" data-choice="scissors">✌</button>
                </div>
                <div class="rps-result">
                    <div class="rps-player">
                        <div class="rps-choice-display" id="player-choice">?</div>
                        <p>You</p>
                    </div>
                    <div class="rps-vs">VS</div>
                    <div class="rps-computer">
                        <div class="rps-choice-display" id="computer-choice">?</div>
                        <p>Computer</p>
                    </div>
                </div>
                <div class="rps-outcome" id="rps-outcome">Make your choice!</div>
                <div class="rps-score">
                    <p>Wins: <span id="rps-wins">0</span></p>
                    <p>Losses: <span id="rps-losses">0</span></p>
                    <p>Ties: <span id="rps-ties">0</span></p>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', rpsHTML);
    
    // Add CSS for Rock Paper Scissors
    const style = document.createElement('style');
    style.textContent = `
        .rps-game-area {
            text-align: center;
        }
        
        .rps-choices {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .rps-choice {
            background-color: var(--primary);
            border: none;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .rps-choice:hover {
            transform: scale(1.1);
            background-color: var(--accent);
        }
        
        .rps-result {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            margin-bottom: 20px;
        }
        
        .rps-choice-display {
            width: 100px;
            height: 100px;
            background-color: var(--dark);
            border: 4px solid var(--secondary);
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
            margin-bottom: 10px;
        }
        
        .rps-vs {
            font-size: 1.5rem;
            color: var(--accent);
        }
        
        .rps-outcome {
            font-size: 1.2rem;
            color: var(--accent);
            margin-bottom: 20px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .rps-score {
            display: flex;
            justify-content: center;
            gap: 30px;
        }
        
        .rps-score p {
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add event listeners for RPS buttons
    document.querySelectorAll('.rps-choice').forEach(button => {
        button.addEventListener('click', playRockPaperScissors);
    });
}

let rpsWins = 0;
let rpsLosses = 0;
let rpsTies = 0;

function playRockPaperScissors(e) {
    const playerChoice = e.target.getAttribute('data-choice');
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Display choices
    document.getElementById('player-choice').textContent = 
        playerChoice === 'rock' ? '✊' : 
        playerChoice === 'paper' ? '✋' : '✌';
    
    document.getElementById('computer-choice').textContent = 
        computerChoice === 'rock' ? '✊' : 
        computerChoice === 'paper' ? '✋' : '✌';
    
    // Determine winner
    let result;
    
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
        rpsTies++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You win!";
        rpsWins++;
    } else {
        result = "Computer wins!";
        rpsLosses++;
    }
    
    document.getElementById('rps-outcome').textContent = result;
    document.getElementById('rps-wins').textContent = rpsWins;
    document.getElementById('rps-losses').textContent = rpsLosses;
    document.getElementById('rps-ties').textContent = rpsTies;
}

// Memory Card Game
function initMemoryGame() {
    const container = document.querySelector('.game-container');
    
    const memoryHTML = `
        <div class="game-screen" id="memory-screen">
            <h2 class="game-title">Memory Cards</h2>
            <div class="memory-controls">
                <button class="memory-start" onclick="startMemoryGame()">Start Game</button>
                <div class="memory-stats">
                    <span>Moves: <span id="memory-moves">0</span></span>
                    <span>Pairs found: <span id="memory-pairs">0</span>/8</span>
                </div>
            </div>
            <div class="memory-board" id="memory-board"></div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', memoryHTML);
    
    // Add CSS for Memory Game
    const style = document.createElement('style');
    style.textContent = `
        .memory-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .memory-start {
            background-color: var(--primary);
            color: var(--light);
            border: none;
            padding: 10px 20px;
            font-family: 'Press Start 2P', cursive;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .memory-start:hover {
            background-color: var(--accent);
            color: var(--dark);
        }
        
        .memory-stats {
            display: flex;
            gap: 20px;
            font-size: 0.8rem;
        }
        
        .memory-board {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            perspective: 1000px;
        }
        
        .memory-card {
            width: 100%;
            height: 100px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s;
            cursor: pointer;
        }
        
        .memory-card.flipped {
            transform: rotateY(180deg);
        }
        
        .memory-card-front, .memory-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
        }
        
        .memory-card-back {
            background-color: var(--primary);
            transform: rotateY(180deg);
        }
        
        .memory-card-front {
            background-color: var(--secondary);
            color: var(--dark);
        }
        
        .memory-card.matched {
            visibility: hidden;
        }
    `;
    
    document.head.appendChild(style);
}

let memoryCards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let pairsFound = 0;

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const cardBack = '❓';

function startMemoryGame() {
    // Reset game state
    moves = 0;
    pairsFound = 0;
    document.getElementById('memory-moves').textContent = moves;
    document.getElementById('memory-pairs').textContent = pairsFound;
    
    // Create card pairs
    const cards = [...emojis, ...emojis];
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Create HTML for cards
    const memoryBoard = document.getElementById('memory-board');
    memoryBoard.innerHTML = '';
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="memory-card-front">${emoji}</div>
            <div class="memory-card-back">${cardBack}</div>
        `;
        
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
    
    memoryCards = Array.from(document.querySelectorAll('.memory-card'));
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flipped');
    
    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    // Second click
    secondCard = this;
    moves++;
    document.getElementById('memory-moves').textContent = moves;
    
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    
    if (isMatch) {
        disableCards();
        pairsFound++;
        document.getElementById('memory-pairs').textContent = pairsFound;
        
        if (pairsFound === emojis.length) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves!`);
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Snake Game
function initSnakeGame() {
    const container = document.querySelector('.game-container');
    
    const snakeHTML = `
        <div class="game-screen" id="snake-screen">
            <h2 class="game-title">Snake</h2>
            <div class="snake-game-area">
                <canvas id="snake-canvas" width="400" height="400"></canvas>
                <div class="snake-controls">
                    <div class="snake-score">Score: <span id="snake-score">0</span></div>
                    <button class="snake-start" onclick="resetSnakeGame()">Start/Restart</button>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', snakeHTML);
    
    // Add CSS for Snake Game
    const style = document.createElement('style');
    style.textContent = `
        .snake-game-area {
            text-align: center;
        }
        
        #snake-canvas {
            border: 4px solid var(--accent);
            background-color: var(--dark);
            margin-bottom: 10px;
        }
        
        .snake-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .snake-score {
            font-size: 1rem;
        }
        
        .snake-start {
            background-color: var(--primary);
            color: var(--light);
            border: none;
            padding: 10px 20px;
            font-family: 'Press Start 2P', cursive;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .snake-start:hover {
            background-color: var(--accent);
            color: var(--dark);
        }
    `;
    
    document.head.appendChild(style);
}

let snakeCanvas, snakeCtx;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let gameSpeed = 150;
let gameLoop;

function resetSnakeGame() {
    // Clear any existing game loop
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    // Initialize canvas
    snakeCanvas = document.getElementById('snake-canvas');
    snakeCtx = snakeCanvas.getContext('2d');
    
    // Reset game state
    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200}
    ];
    
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    document.getElementById('snake-score').textContent = score;
    
    // Create first food
    createFood();
    
    // Start game loop
    gameLoop = setInterval(gameStep, gameSpeed);
    
    // Add keyboard controls
    document.removeEventListener('keydown', changeDirection);
    document.addEventListener('keydown', changeDirection);
}

function changeDirection(e) {
    const key = e.keyCode;
    
    if (key === 37 && direction !== 'right') {
        nextDirection = 'left';
    } else if (key === 38 && direction !== 'down') {
        nextDirection = 'up';
    } else if (key === 39 && direction !== 'left') {
        nextDirection = 'right';
    } else if (key === 40 && direction !== 'up') {
        nextDirection = 'down';
    }
}

function gameStep() {
    direction = nextDirection;
    
    // Calculate new head position
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch(direction) {
        case 'up':
            head.y -= 10;
            break;
        case 'down':
            head.y += 10;
            break;
        case 'left':
            head.x -= 10;
            break;
        case 'right':
            head.x += 10;
            break;
    }
    
    // Check for collisions
    if (
        head.x < 0 || head.x >= snakeCanvas.width ||
        head.y < 0 || head.y >= snakeCanvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameLoop);
        alert(`Game Over! Your score: ${score}`);
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('snake-score').textContent = score;
        createFood();
        
        // Increase speed slightly every 50 points
        if (score % 50 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    } else {
        // Remove tail if no food was eaten
        snake.pop();
    }
    
    // Draw everything
    drawGame();
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (snakeCanvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (snakeCanvas.height / 10)) * 10
    };
    
    // Make sure food doesn't appear on snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food.x = Math.floor(Math.random() * (snakeCanvas.width / 10)) * 10;
        food.y = Math.floor(Math.random() * (snakeCanvas.height / 10)) * 10;
    }
}

function drawGame() {
    // Clear canvas
    snakeCtx.fillStyle = '#1a1a2e';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            snakeCtx.fillStyle = '#06d6a0';
        } else {
            // Body
            snakeCtx.fillStyle = '#4ecdc4';
        }
        
        snakeCtx.fillRect(segment.x, segment.y, 10, 10);
        
        // Add border to segments
        snakeCtx.strokeStyle = '#1a1a2e';
        snakeCtx.strokeRect(segment.x, segment.y, 10, 10);
    });
    
    // Draw food
    snakeCtx.fillStyle = '#ff006e';
    snakeCtx.beginPath();
    snakeCtx.arc(food.x + 5, food.y + 5, 5, 0, Math.PI * 2);
    snakeCtx.fill();
}