const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;


const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomHole = (holes) => {
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
};

const getMole = () => {
    const time = randomTime(500, 1000); 
    const hole = randomHole(holes); 
    hole.classList.add('up'); 
    setTimeout(() => {
        hole.classList.remove('up'); 
        if(!timeUp) {
            getMole();
        }
    }, time);
};

const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    getMole();
    setInterval(() => timeUp = true, 30000); 
};

function hitMole (myScore){
    if(!myScore.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener('click', hitMole));
