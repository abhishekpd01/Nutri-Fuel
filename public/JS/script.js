// navbar responsiveness
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
})


// Page Load Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          const animation = entry.target.dataset.animation;
          entry.target.classList.add('visible', 'animate__animated', animation);
      }
  })
});
// Select all elements to animate
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach((element) => observer.observe(element));


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