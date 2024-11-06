const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// initial variables
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
];

// initialise the game 

function initializeGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initializeGame();
function swapTurn() {
    if(currentPlayer === "X")
        currentPlayer = "O";
    else
    currentPlayer = "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

function gameOverOrNot() {
    // newGameBtn.classList.add("active");
    let ans = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && 
            gameGrid[position[0]] === gameGrid[position[1]] && 
            gameGrid[position[1]] === gameGrid[position[2]])){
                if(gameGrid[position[0]] === "X"){
                    ans = "X";
                }
                else{
                    ans = "O";
                }
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                newGameBtn.classList.add("active");
                gameInfo.innerText = `Winner - ${ans}`;

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });
        }
        // if(ans !== "")
        //     return;
    });
    let notEmpty = true;
    gameGrid.forEach((box) => {
        if(box === ""){
            notEmpty = false;
            return;
        }
    })

    if(notEmpty === true){
        gameInfo.innerText = "Game Tied ! ";
        newGameBtn.classList.add("active");
    }

};

function handlClick(index) {

    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // change the current player
        swapTurn();
        // check game over or not
        gameOverOrNot();
    }

};

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handlClick(index);
    })
});

newGameBtn.addEventListener('click', initializeGame);
