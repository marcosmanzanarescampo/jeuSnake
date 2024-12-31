// DOM settings

const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// game settings

const boardSize = 10;
const gameSpeed = 100;

const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2    
};

const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};

// game variables

let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;


const FmoveSnake = () =>{
    const newSquare = String(Number(snake[snake.length-1])+directions[direction]).padStart(2, '0');
    const [row, column] = newSquare.split('');

    if(newSquare < 0 ||
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
        boardSquares[row][column] === squareTypes.snakeSquare)){
                FGameOver();
    }else{
        snake.push(newSquare);
        console.log(boardSquares[row][column]);
        if(boardSquares[row][column] === squareTypes.foodSquare){
            console.log("comidaaaaaaaaaaaa");
            FAddFood();
        }else{
            const emptySquare = snake.shift();
            FDrawSquare(emptySquare, 'emptySquare');
        }
        FDrawSnake();
    }
}

const FAddFood = ()=>{
    score++;
    FUpdateScore();
    FcreateRandomFood();
}

const FGameOver = () =>{
    gameOver.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}


const FSetDirection = newDirecion =>{
    direction = newDirecion;
}

const directionEvent = key=>{
    switch(key.code){
        case 'ArrowUp': 
            direction != 'ArrowDown' && FSetDirection(key.code);
            break;
        case 'ArrowDown': 
            direction != 'ArrowUp' && FSetDirection(key.code);
            break;
        case 'ArrowLeft': 
            direction != 'ArrowRight' && FSetDirection(key.code);
            break;
        case 'ArrowRight': 
            direction != 'ArrowLeft' && FSetDirection(key.code);
        break;
    }
}
const FcreateRandomFood = () =>{
    const randomEmptySquare = emptySquares[Math.floor(Math.random()*emptySquares.length)];
    FDrawSquare(randomEmptySquare, 'foodSquare');
}

const FUpdateScore = ()=>{
   scoreBoard.innerText = score; 
}
const FDrawSnake = () =>{
    snake.forEach(square => FDrawSquare(square, 'snakeSquare'));
} 

const FStartGame = ()=>{
    FSetGame();
    gameOverSign.style.display = "none";
    FStartGame.disabled = true;
    FDrawSnake();
    FUpdateScore();
    FcreateRandomFood();
    document.addEventListener("keydown", directionEvent);
    moveInterval = setInterval(() => FmoveSnake(), gameSpeed);
}

startButton.addEventListener("click", FStartGame);

// game functions

const FDrawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare'){
        emptySquares.push(square);        
    }else{
        if(emptySquares.indexOf(square) !== -1){
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }    
}

const FCreateBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}

const FSetGame = ()=>{
    snake = ["00","01","02","03"];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), ()=>Array(boardSize).fill(squareTypes.emptySquare));
    board.innerHTML = '';
    emptySquares = [];
    FCreateBoard();
}


