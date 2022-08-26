const randomDogElement = document.getElementById("randomDog");

function randomDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((json) => {
      randomDogElement.innerHTML = `<img src="${json.message}" height=400px width=400px alt="randomDog"/>`;
    });
}
