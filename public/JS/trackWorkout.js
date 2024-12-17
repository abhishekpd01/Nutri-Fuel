const animationContainer = document.getElementsByClassName("calories")[0];

let startTime = Date.now();
const duration = 1000; // 2 seconds
const endValue = parseInt(document.getElementsByClassName("calories")[0].innerHTML, 10);

function updateNumber() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < duration) {
        // Generate a random number between 0 and 399
        const randomNumber = Math.floor(Math.random() * 400);
        animationContainer.textContent = randomNumber;
        requestAnimationFrame(updateNumber);
    } else {
        // Animation duration has passed, display "400"
        animationContainer.textContent = endValue;
    }
}

window.onload = function(){
    updateNumber();
}