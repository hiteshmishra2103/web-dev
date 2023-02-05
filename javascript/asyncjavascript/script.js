"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name["common"]}</h3>
              <h4 class="country__region">${data.region}</h4>
              
              <p class="country__row"><span>Capital: ${data.capital}</span></p>
              <p class="country__row"><span>👫</span>${
                (+data.population / 1000000).toFixed(1) + " million"
              } </p>
            </div>
          </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = "100%";
};

//callback hell example 👇

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const neighbours = data.borders;

    renderCountry(data);

    if (!neighbours) {
      return;
    }

    for (const neighbour of neighbours) {
      const req = new XMLHttpRequest();
      req.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
      req.send();

      req.addEventListener("load", function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, "neighbour");
      });
    }
  });
};

getCountryAndNeighbour("india");
