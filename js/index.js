const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:38vh; left:39vw; background-color:#fff; width:200px; height:80px;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts++;
    index = 0;
  };

  const handleEnterKey = () => {
    let correctLetter = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const writeLetter = block.innerText;
      const answerLetter = answer[i];
      if (writeLetter === answerLetter) {
        block.style.background = "#6AAA64";
        correctLetter++;
      } else if (answer.includes(writeLetter)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "#fff";
    }
    if (correctLetter === 5) {
      gameOver();
    }
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index--;
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (event.key === "Enter") {
      handleEnterKey();
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();
    function setTimer() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString();
      const 초 = 흐른시간.getSeconds().toString();
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }
    timer = setInterval(setTimer, 1000);
    console.log(timer);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
