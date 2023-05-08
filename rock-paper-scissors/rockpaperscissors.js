let score = JSON.parse(localStorage.getItem('score'))
    || {
    wins: 0,
    loses: 0,
    ties: 0
}

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if(!isAutoPlaying) {
        autoPlayElement.innerHTML = "Stop Playing";
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1500);
        isAutoPlaying = true;
    } else {
        autoPlayElement.innerHTML = "Auto Play";
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

const autoPlayElement = document.querySelector(".js-auto-button");
autoPlayElement.addEventListener("click", () => {
    autoPlay();
});

const resetElement = document.querySelector(".js-reset-button");
resetElement.addEventListener("click", () => {
    displayResetConfirmation();
})

const rockElement = document.querySelector(".js-rock-button");
rockElement.addEventListener("click", () => {
    playGame("rock");
});

const paperElement = document.querySelector(".js-paper-button");
paperElement.addEventListener("click", () => {
    playGame("paper");
});

const scissorsElement = document.querySelector(".js-scissors-button");
scissorsElement.addEventListener("click", () => {
    playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
    if(event.key === "r")
        playGame("rock");
    else if(event.key === "p")
        playGame("paper");
    else if(event.key === "s")
        playGame("scissors");
    else if(event.key === "a")
        autoPlay();
    else if(event.key === "Backspace")
        displayResetConfirmation();
        //resetScore();
});

function displayResetConfirmation() {
    const resetElement = document.querySelector(".js-reset-confirmation");
    resetElement.classList.add("reset-confirmation");
    resetElement.innerHTML = `
        <p class="confirm-message">Are you sure?</p>
        <button class="confirm-button-yes js-confirm-button-yes">Yes</button>
        <button class="confirm-button-no js-confirm-button-no">No</button>
    `

    document.querySelector(".js-confirm-background").classList.add("confirm-background");

    document.querySelector(".js-confirm-button-yes").addEventListener("click", () => {
        resetScore();
        hideResetConfirmation();
    })

    document.querySelector(".js-confirm-button-no").addEventListener("click", () => {
        hideResetConfirmation();
    })
}

function hideResetConfirmation() {
    const resetElement = document.querySelector(".js-reset-confirmation");
    resetElement.classList.remove("reset-confirmation");
    resetElement.innerHTML = "";
    document.querySelector(".js-confirm-background").classList.remove("confirm-background");
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if(playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win!';
        }
    } else if(playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    } else if(playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win!';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if(result === 'You win!') {
        score.wins += 1
    } else if (result === 'You lose.') {
        score.loses += 1
    } else if (result === 'Tie.') {
        score.ties += 1
    }

    //localStorage only supports strings
    localStorage.setItem('score', JSON.stringify(score));

    updateWinner(result);
    updatePlayerMove(playerMove, computerMove);
    updateScoreElement();

    /*alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`)*/
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber <= 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function updateWinner(result) {
    document.querySelector('.js-winner').innerHTML = result;
}

function updatePlayerMove(playerMove, compMove) {
    document.querySelector('.js-player-moves')
        .innerHTML = `You 
        <img src="rockpaperscissors-images/${playerMove}-emoji.png" class="move-icon">
        <img src="rockpaperscissors-images/${compMove}-emoji.png" class="move-icon"> 
        Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-scoreboard')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}