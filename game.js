let snake = [];
let food = { x: 0, y: 0 };
let direction = 'right';
let gameStarted = false;
let gameLoop;
let score = 0;
const gridSize = 20;
let gameSpeed = 100;

// 触摸控制相关变量
let touchStartX = 0;
let touchStartY = 0;
const minSwipeDistance = 30;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// 初始化蛇的位置
function initSnake() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    direction = 'right';
    score = 0;
    updateScore();
}

// 生成食物
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    
    // 确保食物不会生成在蛇身上
    for (let part of snake) {
        if (part.x === food.x && part.y === food.y) {
            generateFood();
            break;
        }
    }
}

// 更新分数
function updateScore() {
    scoreElement.textContent = `分数: ${score}`;
    finalScoreElement.textContent = score;
}

// 画蛇
function drawSnake() {
    ctx.fillStyle = '#4CAF50';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

// 画食物
function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();
    } else {
        snake.pop();
    }
    
    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
}

// 检查碰撞
function checkCollision(head) {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }
    
    // 检查自身碰撞
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    
    return false;
}

// 游戏主循环
function gameUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
}

// 开始游戏
function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    initSnake();
    generateFood();
    startButton.style.display = 'none';
    gameOverElement.style.display = 'none';
    gameLoop = setInterval(gameUpdate, gameSpeed);
}

// 游戏结束
function gameOver() {
    clearInterval(gameLoop);
    gameStarted = false;
    startButton.style.display = 'block';
    gameOverElement.style.display = 'block';
}

// 重新开始游戏
function restartGame() {
    gameOverElement.style.display = 'none';
    startGame();
}

// 处理触摸开始事件
function handleTouchStart(event) {
    if (!gameStarted) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

// 处理触摸结束事件
function handleTouchEnd(event) {
    if (!gameStarted) return;
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 确定滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (Math.abs(deltaX) >= minSwipeDistance) {
            if (deltaX > 0 && direction !== 'left') {
                direction = 'right';
            } else if (deltaX < 0 && direction !== 'right') {
                direction = 'left';
            }
        }
    } else {
        // 垂直滑动
        if (Math.abs(deltaY) >= minSwipeDistance) {
            if (deltaY > 0 && direction !== 'up') {
                direction = 'down';
            } else if (deltaY < 0 && direction !== 'down') {
                direction = 'up';
            }
        }
    }
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;
    
    switch(event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// 绑定触摸事件
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchend', handleTouchEnd, false);

// 阻止页面滚动
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// 绑定开始按钮事件
startButton.addEventListener('click', startGame);