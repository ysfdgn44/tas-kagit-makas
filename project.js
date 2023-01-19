const yourChoice = document.getElementById("your-choice");
const pcChoice = document.getElementById("pc-choice");
const select = document.querySelector(".select");
let userSelect;
let pcRandom;
//? score yazabilmek için
const scoreYou = document.getElementById("you");
const scorePc = document.getElementById("pc");
//? modal sellectors
const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");
const final = document.getElementById("final");
const topScoreDom = document.querySelector(".top-score");
//! kötü örnek
// const tasImg = document.querySelector(".tas");
// const kagitImg = document.querySelector(".kagit");
// const makasImg = document.querySelector(".makas");

// tasImg.addEventListener("click", () => {
//   yourChoice.innerHTML = `<img src="./assets/tas.png"></img>`;
// });
// kagitImg.addEventListener("click", () => {
//   yourChoice.innerHTML = `<img src="./assets/kagit.png"></img>`;
// });
// makasImg.addEventListener("click", () => {
//   yourChoice.innerHTML = `<img src="./assets/makas.png"></img>`;
// });

select.addEventListener("click", (e) => {
  //   console.log(e);
  //   console.log(e.target.className);
  //   console.log(e.target.getAttribute("alt"));
  if (e.target.getAttribute("alt")) {
    userSelect = e.target.getAttribute("alt"); //! 'alt' alt attribute ismidir class'i da eşitleyebiliriz
    yourChoice.innerHTML = `<img src="./assets/${userSelect}.png"></img>`;
    pc();
  }
});
const pcArr = ["tas", "kagit", "makas"];
function pc() {
  pcRandom = pcArr[Math.floor(Math.random() * 3)];
  console.log(pcRandom);
  pcChoice.innerHTML = `<img src="./assets/${pcRandom}.png"></img>`;
  result();
}
function result() {
  switch (userSelect) {
    case "tas":
      if (pcRandom === "kagit") {
        lost();
      } else if (pcRandom === "makas") {
        win();
      }
      break;
    case "kagit":
      if (pcRandom === "makas") {
        lost();
      } else if (pcRandom == "tas") {
        win();
      }
      break;
    case "makas":
      if (pcRandom === "tas") {
        lost();
      } else if (pcRandom == "kagit") {
        win();
      }
    default:
      break;
  }
  if (userSelect == pcRandom) {
    resultDiv.classList.add("active");
    resultDiv.innerHTML = "It's a draw";
    containerEl.style.boxShadow = "3px 3px 10px 1px #ffc538";
    resultDiv.style.backgroundColor = "#ffc538";
  }

  if (scoreYou.innerText == "10") {
    final.innerHTML = "💃You win🕺";
    document.querySelector(".modal").style.backgroundColor = "#5ab7ac";
    modalBtn.style.color = "5ab7ac";
    topScoreCheck();
  }
  if (scoreYou.innerText == "10" || scorePc.innerText == "10") {
    modal();
  }
}
function win() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You win";
  containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#5AB7AC";
  scoreYou.innerText++;
}
function lost() {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You lost";
  containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
  resultDiv.style.backgroundColor = "#fb778b";
  scorePc.innerText++;
}
//?modal kullanımı
function modal() {
  modalEl.classList.add("show");
}
modalBtn.addEventListener("click", () => {
  modalEl.style.display = "none";
  //   document.querySelector(".top-score").innerText++;
  // modalEl.classList.remove('show')
  window.location.reload();
});
let storagedScore = localStorage.getItem("highScore");
let topScore;
if (storagedScore) {
  topScore = `10-${storagedScore}`;
} else {
  topScore = "0 - 0";
}
//!topScor u doma yazdırma
topScoreDom.innerText = topScore;

function topScoreCheck() {
  storagedScore || localStorage.setItem("highScore", +scorePc.innerText);
  if (storagedScore >= scorePc.innerText) {
    localStorage.setItem("highScore", +scorePc.innerText);
  }
}
console.log(storagedScore);
