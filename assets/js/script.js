'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/**
 * Image Slider
 */

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const thumbs = document.querySelectorAll(".grid-lightbox .thumb img");

  thumbs.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      caption.textContent = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});

/* DESTINATIONS TOGGLE */

const destBtn = document.getElementById("viewAllDestBtn");

if (destBtn) {
  destBtn.addEventListener("click", function () {

    const extras = document.querySelectorAll(".extra-dest");
    const isHidden = extras[0].style.display === "none";

    extras.forEach(el => {
      el.style.display = isHidden ? "block" : "none";
    });

    this.textContent = isHidden ? "Show Less" : "More Destinations";

  });
}

/* PACKAGE TOGGLE */

const pkgBtn = document.getElementById("viewAllBtn");

if (pkgBtn) {
  pkgBtn.addEventListener("click", function () {

    const extras = document.querySelectorAll(".extra-package");
    const isHidden = extras[0].style.display === "none";

    extras.forEach(el => {
      el.style.display = isHidden ? "block" : "none";
    });

    this.textContent = isHidden ? "Show Less" : "View All Packages";

  });
}

