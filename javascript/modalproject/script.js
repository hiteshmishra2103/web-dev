"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");
const showModalBtn = document.querySelectorAll(".show-modal");

for (const showModal of showModalBtn) {
  showModal.addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}

const closeModel = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
     closeModel();
    }
  }
});

btnCloseModal.addEventListener("click", closeModel);
overlay.addEventListener("click", closeModel);
