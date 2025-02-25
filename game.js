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

// 画蛇和绘制网格函数组合体，绘制网格函数写在画蛇函数之前，画蛇写在之后，画食物写在最后，实现蛇吃到食物的效果，碰撞检测，碰撞检测碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞碰撞