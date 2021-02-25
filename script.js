const resultPara = document.querySelector('#result');
const roundResultPara = document.querySelector('#round-result');
const resultsContainer = document.querySelector('#results-container');
const endResultPara = document.createElement('p');
const restartButton = document.createElement('button');
const pedraBtn = document.querySelector('#pedra');
const papelBtn = document.querySelector('#papel');
const tesouraBtn = document.querySelector('#tesoura');
let playerWins = 0; 
let computerWins = 0;


endResultPara.setAttribute('id', 'end-result'); 
restartButton.setAttribute('class', 'btn');
restartButton.textContent = 'RESTART';

pedraBtn.addEventListener('click', playRound);
papelBtn.addEventListener('click', playRound);
tesouraBtn.addEventListener('click',  playRound);
restartButton.addEventListener('click', () => {
    playerWins = 0;
    computerWins = 0;
    roundResultPara.textContent = '-';
    resultPara.textContent = '-';
    endResultPara.textContent = '';
    restartButton.style.display = 'none';
});


// FUNCTIONS
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function computerPlay (){
    let moves = ['pedra', 'papel', 'tesoura'];
    return moves[random(0, 2)];
}

function getResult(playerSelection, computerSelection){
    const computerWon = (playerSelection === 'tesoura' && computerSelection === 'pedra') || 
            (playerSelection === 'pedra' && computerSelection ==='papel') ||
            (playerSelection === 'papel' && computerSelection === 'tesoura');
    const tie = playerSelection === computerSelection;

    if (computerWon){
        return 'computador ganhou';
    } else if (tie) {
        return 'empate';
    } else {
        return 'jogador ganhou';
    }
}

function playRound(){
    if (playerWins >= 5 || computerWins >= 5) { return; }
    const playerSelection = this.id;
    const computerSelection = computerPlay();
    const result = getResult(playerSelection, computerSelection);

    if (result === 'computador ganhou') { 
        computerWins++; 
    } else if (result === 'jogador ganhou'){ 
        playerWins++; 
    }

    resultPara.innerHTML = `${playerSelection.toUpperCase()} vs ${computerSelection.toUpperCase()} -- ${result.toUpperCase()}`;
    roundResultPara.textContent = `JOGADOR      ${playerWins} - ${computerWins}      COMPUTADOR`;
    
    if (playerWins === 5) {
        endResultPara.textContent = 'JOGADOR GANHOU';
        resultsContainer.appendChild(endResultPara);
        restartButton.style.display = 'inline-block';
        resultsContainer.appendChild(restartButton);
    } else if (computerWins === 5){
        endResultPara.textContent = 'COMPUTADOR GANHOU';
        resultsContainer.appendChild(endResultPara);
        restartButton.style.display = 'inline-block';
        resultsContainer.appendChild(restartButton);
    }
}
