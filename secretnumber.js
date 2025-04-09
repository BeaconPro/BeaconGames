let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");

checkButton.addEventListener("click", () => {
    const guess = parseInt(guessInput.value, 10);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    if (guess === secretNumber) {
        message.textContent = `Congratulations! You guessed it in ${attempts} attempts.`;
        message.style.color = "green";
        checkButton.disabled = true;
    } else if (guess < secretNumber) {
        message.textContent = "Too low! Try again.";
        message.style.color = "blue";
    } else {
        message.textContent = "Too high! Try again.";
        message.style.color = "orange";
    }
});

restartButton.addEventListener("click", () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = "";
    attemptsText.textContent = "Attempts: 0";
    guessInput.value = "";
    checkButton.disabled = false;
});
