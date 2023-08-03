const answer = "APPLE";

let index = 0;
let attempts = 0;

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts++;
    index = 0;
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
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

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (event.key === "Enter") {
      handleEnterKey();
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

appStart();
