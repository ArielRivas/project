const holesDiv = document.querySelector(".holes");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const startButton = document.querySelector(".button");
const display = document.querySelector(".game");
const highScore = document.querySelector(".highScore");
const gameOver = document.querySelector(".gameOver");

let timeLeft;
let scoreInit = 0;
let maxScore = 0;

for (let index = 1; index <= 16; index++) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  holesDiv.appendChild(hole);

  const dirt = document.createElement("img");
  dirt.classList.add("dirt");
  dirt.src = "../assets/dirt.png";
  hole.appendChild(dirt);

  const digglet = document.createElement("img");
  digglet.classList.add("digglet");
  digglet.src = "../assets/Diglett_EpEc.gif";
  digglet.setAttribute("name", "digglet");
  hole.appendChild(digglet);
};

window.addEventListener("click", (event)=>{
  if (event.target.name === "digglet"){
    //console.log(event.target)
    setTimeout(()=>{
      document.body.classList.toggle("flash")
    }, 100)
    document.body.classList.toggle("flash");
    scoreInit = scoreInit + 1; //cambialo a 15 por ejemplo
    score.textContent = scoreInit;
  }
});


startButton.addEventListener("click", () => {
  display.classList.add("close");
  timeLeft = 10; //cambialo a 60 cuando acabes
  scoreInit = 0;
  score.textContent = scoreInit;
  time.textContent = timeLeft;
  let timer = setInterval(() => {
    time.textContent = timeLeft;
    if (timeLeft === 0){ //porqué me sale 0-1?????
      clearInterval(timer);
    }else{
    timeLeft--;
    time.textContent = timeLeft < 10 ? "0" + timeLeft : timeLeft;
    const digglet = document.querySelectorAll(".digglet");
    let movDigglet = Math.floor(Math.random()*digglet.length);//crear animaciones dentro de los eventos
    digglet[movDigglet].style.pointerEvents = "all";
    digglet[movDigglet].style.animation = "faceup 2s ease";
    digglet[movDigglet].addEventListener("animationed", ()=>{
      digglet[movDigglet].style.pointerEvents = "all";
      digglet[movDigglet].style.animation = "facedown 0.5 ease";
      digglet[movDigglet].addEventListener("animationed", ()=>{
        digglet[movDigglet].style.pointerEvents = "none";
      })
    })
  }
  }, 900);
});
