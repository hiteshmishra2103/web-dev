"use strict";

const tabs = document.querySelectorAll(".tab");

const tabContainer = document.querySelector(".tab-container");

const tabContent = document.querySelectorAll(".tab-content");

//Creating the tabbed component

tabContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".tab");

  if (!clicked) {
    return;
  }

  //removing the active tab classes

  tabs.forEach((t) => t.classList.remove("tab__active"));

  //removing the active content classes
  tabContent.forEach((content) =>
    content.classList.remove("tab-content__active")
  );

  //active tab
  if (clicked) {
    clicked.classList.add("tab__active");
  }

  //Active content area

  document
    .querySelector(`.tab-content-${clicked.dataset.tab}`)
    .classList.add("tab-content__active");
});

//------------------------Slider-------------------------

