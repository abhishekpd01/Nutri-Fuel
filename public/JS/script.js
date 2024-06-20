
// sign up form JS
const wrapper = document.querySelector(".wrapper");
const btnPop = document.querySelector(".btn-pop");
const signBtn = document.querySelector(".sign-up-btn");
const close = document.querySelector(".icon-close");
const nameField = document.querySelector(".fName");

btnPop.addEventListener("click", function(){
  wrapper.classList.add("active-pop");
});

signBtn.addEventListener("click", function(){
  wrapper.classList.add("active-pop");
});

close.addEventListener('click',function() {
  wrapper.classList.remove("active-pop");
});


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