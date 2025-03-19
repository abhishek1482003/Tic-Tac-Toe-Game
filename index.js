const boxes = document.querySelectorAll(".box");
// sare boxes as a array aa gay 
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// variables needed to ek current player ke liy start x se hoga 
let currentPlayer;
// current state of grid ko define karne ke liy new game ke liy start empty hoga 
let gameGrid;
// predefined winning positions, total 8 hai 
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

//let's create a function to initialise the game
// basicaly this function would be called when new game starts
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        // boxes ke innertext ko ui se hta diya 
        box.innerText = "";
        // sare boxes ko phirse clickable bna diya 
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        // basically gar jeet gay ahi to green htana pdega 
        box.classList = `box box${index+1}`;
    });
    // game start hote hi new game button hide hojayega 
    newGameBtn.classList.remove("active");
    // jo upar kis player ki chance wala box hai uska update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// is function ka simple logic hai 
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// mujhe ui se koi phark nhi pdata main pan grid state variabel isiliy bna rkha hai 
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events nhi to age bhi click hota rhega 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        // winner player ka name show karo 
        gameInfo.innerText = `Winner Player - ${answer}`;
        // new game button ko show karo 
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    // jab sare cell fill ho chuke hai 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}
// yha ek sabse phle to box me current player ki value daalni hai 
// then grid state ko update karna hai 
// then us box ko unclickable bnana hai 
// turn ko swap karna hai 
// check krna hai kahi game over to nhi hogya 
function handleClick(index) {
    // agar box par phle se koi text hai to kuch hoga hi nhi 
    if(gameGrid[index] === "" ) {
        // ye line ui me change karegi 
        boxes[index].innerText = currentPlayer;
        // ye humare grid state variabe ko update karega 
        gameGrid[index] = currentPlayer;
        // ab is game ke liy is box par click nhi kar sakte hai 
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

// har box par click hosakta hai to har box ke upar event listener laga denge 
// boxes wale div me sare box array ke form me present hai 
// basicaly aary fo object ahi to maine har ek box uar unka index fetch kar liya   
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        // index se mujhe pta chalega konse box par click hua hai ye 0 based indexing hoga
        handleClick(index);
    })
});

// ye simple hai ki jab hi button click ho to game restart kardo 
newGameBtn.addEventListener("click", initGame);