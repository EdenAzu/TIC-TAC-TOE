const PLAYER_X = 'x'
const PLAYER_O = 'o'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const PlayerTurnTextElement = document.getElementById('playerTurnText')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

gameStart()

restartButton.addEventListener('click', gameStart)

function gameStart(){
    isPlayer_O_Turn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(PLAYER_O)
        cell.classList.remove(PLAYER_X)
        cell.removeEventListener('click', userSelection)
        cell.addEventListener('click', userSelection, {once: true})
    })
    resetBoard()
    winningMessageElement.classList.remove('show')
}

function userSelection(e){
    const cell = e.target
    const currentClass= isPlayer_O_Turn? PLAYER_O : PLAYER_X
    if(currentClass=="o"){
        PlayerTurnTextElement.innerText = "Player X turn";
    }
    else{
        PlayerTurnTextElement.innerText = "Player O turn";
    }
    cell.classList.add(currentClass)
    if(WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })){
        gameEnd(false)
    }else if(isTie()){
        gameEnd(true)
    }else{
        isPlayer_O_Turn = !isPlayer_O_Turn
    }
    

}

function gameEnd(flag){
    if (flag) {
        winningMessageTextElement.innerHTML ="Its a tie!"
    }
    else {
            const currentClass= isPlayer_O_Turn? PLAYER_O : PLAYER_X
            if(currentClass=="o"){
                winningMessageTextElement.innerHTML="Player O won!"
            }
            else{
                winningMessageTextElement.innerHTML="Player X won!"
            }
    }
    setTimeout(() => {
        winningMessageElement.classList.add('show')
    }, 3000);
}

function isTie(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(PLAYER_X)||cell.classList.contains(PLAYER_O)
    })
}


function resetBoard(){
    boardElement.classList.remove(PLAYER_O)
    boardElement.classList.remove(PLAYER_X)
    if(isPlayer_O_Turn){
        boardElement.classList.add(PLAYER_O)
    }else{
        boardElement.classList.add(PLAYER_X)
    }
    winningMessageTextElement.innerHTML=""

}