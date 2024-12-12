// track water JS
let counter = 0;
const maxCount = 6;

function incrementCounter() {
  if (counter < maxCount) {
    counter++;
    const water = document.getElementById('water');
    const counterDisplay = document.getElementById('counter-display');

    // Update water height (percentage of glass height)
    const waterHeight = (counter / maxCount) * 100;
    water.style.height = waterHeight + '%';

    // Update counter display
    counterDisplay.textContent = `Glass Count: ${counter}`;

    // If glass is full
    if (counter === maxCount) {
      alert('The glass is completely filled!');
    }
  } else {
    alert('You have completed your daily quota!');
  }
}

// swiper JS
var swiper = new Swiper(".slide-content", {
  slidesPreview: 3,
  spaceBetween: 25,
  centerSlide: 'true',
  fade: 'true',
  gragCursor: 'true',
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.8,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});