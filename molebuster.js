const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 6000;
let timerId = null;

const randomSquare = () => {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  })
})

const moveMole = () => {
  timerId = setInterval(randomSquare, 600);
};



const tDown= () => {
 if (currentTime === 0) {
   clearInterval(countDownTimerId);
   clearInterval(timerId);
   alert('GAME OVER! Your final score is ' + result);
 }
 setTimeout(currentTime, 1000 * 6);
};

moveMole();
