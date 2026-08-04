const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header-nav");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-open");
    headerNav.classList.toggle("is-open");
});