"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const typedCountry = document.querySelector("#typecountry");

// //

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

// // // //callback hell example 👇

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const neighbours = data.borders;

//     renderCountry(data);

//     if (!neighbours) {
//       return;
//     }

//     for (const neighbour of neighbours) {
//       const req = new XMLHttpRequest();
//       req.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       req.send();

//       req.addEventListener("load", function () {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, "neighbour");
//       });
//     }
//   });
// };

// // getCountryAndNeighbour("");

// //----promises and fetch api--------------//

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  //   countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Country not found! (${errorMsg})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found!"
  )
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
      const neighbours = data[0].borders;
      if (!neighbours) {
        throw new Error(`No neighbour found!`);
      }

      //showing neighbour country
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbours[0]}`,
        "Country not found!"
      );

      //   for (const neighbour of data[0].borders) {
      //     fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
      //       .then((response) => response.json())
      //       .then((d) => renderCountry(d[0], "neighbour"));
      //   }
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => renderError(err.message + "😔"))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const country = typedCountry.value;
  console.log(country);
  getCountryData(country);
});

// // // getCountryData("indiaaaa");

// const whereAmi = function (lat, lng) {
//   fetch(
//     `https://eu1.locationiq.com/v1/reverse?key=pk.2ef403297a24566cd8457e94268f7ad3&lat=${lat}   &lon=${lng}&format=json`
//   )
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Problem with geocoding ${res.status}`)
//       }
//       console.log(res);
//       return res.json();
//       //   return res;
//     })
//     .then((data) => {
//       console.log(data);
//       return data;
//     });
// };

// whereAmi(52.508, 13.381);

// console.log("Test Start");
// setTimeout(() => {
//   console.log("0 sec timer!");
// }, 0);

// //visualising the event loop

// Promise.resolve("Resolove promise 1").then((res) => console.log(res));
// Promise.resolve("Resolved promise 2").then((res) => {
//   for (let i = 0; i < 10000; i++) {}
//   console.log(res);
// });

// console.log("Test end");

// // Building promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//   //It is known as executor function
//   if (Math.random() >= 0.5) {
//     resolve("You won!"); //the resolved value of promise will be passed inside resolve() and then it will
//     //be later consumed with then method
//   } else {
//     reject(new Error("You lost your money!")); //the rejected value of promise will be passed inside reject() and then it will
//     //be later consumed with catch method
//   }
// });

// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// //Promisifying setTimeout()

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("1 second passed!");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("2 second passed!");
//     return wait(1);
//   }).then(() => {
//     console.log("3 second passed!");
//     return wait(1);
//   }).then(() => {
//     console.log("4 second passed!");
//     return wait(1);
//   }).then(() => {
//     console.log("5 second passed!");
//     return wait(1);
//   }).then(() => {
//     console.log("6 second passed!");
//   });

//Promisifying the geolocation api

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolove(position),
//     //   (err) => reject(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then((pos) => console.log(pos));

// //coding challenge

// const imgContainer = document.querySelector(".images");

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imgPath;

//     img.addEventListener("load", function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener("error", function () {
//       reject(new Error("Image not Found!"));
//     });
//   });
// };

// createImage("img/card.jpeg").then((img) => console.log("image loaded!"));

// const whereAmi = async function (country) {
//   await fetch(`https://restcountries.com/v3.1/name/${country}`);

// };
