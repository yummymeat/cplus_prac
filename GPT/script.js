const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const rankingList = document.getElementById('ranking');
const startButton = document.getElementById('start-button');

let score = 0;
let timeLeft = 60;
let timerInterval;
let targetTimeout;
let targetElement;
let rankings = [];

// 3x3 격자판 생성
function createGrid() {
  gridContainer.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    gridContainer.appendChild(cell);
  }
}

// 과녁을 랜덤 위치에 생성
function spawnTarget() {
  clearTarget();
  
  const cells = document.querySelectorAll('.cell');
  const randomIndex = Math.floor(Math.random() * cells.length);
  targetElement = cells[randomIndex];
  targetElement.classList.add('target');

  // 3초 타이머 설정: 클릭되지 않으면 점수 감소 후 새로운 과녁 생성
  targetTimeout = setTimeout(() => {
    updateScore(-5);
    spawnTarget();
  }, 3000);
}

// 과녁을 클릭한 경우
function handleTargetClick(event) {
  if (event.target.classList.contains('target')) {
    updateScore(10);
    spawnTarget();
  }
}

// 점수 업데이트
function updateScore(points) {
  score += points;
  scoreDisplay.innerText = `점수: ${score}`;
}

// 과녁 삭제
function clearTarget() {
  if (targetElement) {
    targetElement.classList.remove('target');
  }
  clearTimeout(targetTimeout);
}

// 게임 시작
function startGame() {
  score = 0;
  timeLeft = 60;
  scoreDisplay.innerText = `점수: ${score}`;
  timerDisplay.innerText = `남은 시간: ${timeLeft}초`;

  createGrid();
  spawnTarget();
  gridContainer.addEventListener('click', handleTargetClick);
  
  startButton.disabled = true;

  // 1분 타이머 시작
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `남은 시간: ${timeLeft}초`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// 게임 종료
function endGame() {
  clearInterval(timerInterval);
  clearTarget();
  gridContainer.removeEventListener('click', handleTargetClick);
  startButton.disabled = false;

  // 점수를 랭킹에 추가
  updateRanking(score);
}

// 점수 랭킹 업데이트
function updateRanking(newScore) {
  rankings.push(newScore);
  rankings.sort((a, b) => b - a);
  rankings = rankings.slice(0, 5);

  rankingList.innerHTML = '';
  rankings.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = `${index + 1}위: ${score}점`;
    rankingList.appendChild(listItem);
  });
}

startButton.addEventListener('click', startGame);
