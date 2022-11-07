//Root elements
let searchInput = document.querySelector("input");
const loadPokemonCardsDiv = document.querySelector(".loadPokemonCards");
const loadMore = document.querySelector("button");
const loader = document.querySelector(".loader");
let j = -1;
let elementArray = new Array();

// Consts

const API = function loadImages(dane) {
  for (i = 0; i < 4; i++) {
    j += 1;
    let mainDiv = document.createElement("div");
    let nameDiv = document.createElement("div");
    let pokedexNumberDiv = document.createElement("div");
    let supertypeDiv = document.createElement("div");
    let subtypeDiv = document.createElement("div");
    let rarityDiv = document.createElement("div");
    let img = document.createElement("img");
    nameDiv.innerText = dane[j].name;
    nameDiv.classList.add("cardNameText");
    pokedexNumberDiv.innerText = "Nr: " + dane[j].nationalPokedexNumbers[0];
    pokedexNumberDiv.classList.add("cardNumber");
    supertypeDiv.innerHTML =
      "Supertype: " + "<span>" + dane[j].supertype + "</span>";
    supertypeDiv.classList.add("cardCharacteristicText");
    subtypeDiv.innerHTML =
      "Subtype: " + "<span>" + dane[j].subtypes[0] + "</span>";
    subtypeDiv.classList.add("cardCharacteristicText");
    rarityDiv.innerHTML = "Rarity: " + "<span>" + dane[j].rarity + "</span>";
    rarityDiv.classList.add("cardCharacteristicText");
    img.src = dane[j].images.small;
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(pokedexNumberDiv);
    mainDiv.appendChild(img);
    mainDiv.appendChild(supertypeDiv);
    mainDiv.appendChild(subtypeDiv);
    mainDiv.appendChild(rarityDiv);
    loadPokemonCardsDiv.appendChild(mainDiv);
  }
};

function loadMoreImages(dane) {
  loadMore.addEventListener("click", () => {
    loadImages(dane);
  });
}
function search(dane, searchingText) {
  elementArray.length = 0;
  searchingText = searchingText.toLowerCase();
  dane.forEach((element) => {
    let name = element.name.toLowerCase();
    let types = element.types[0].toLowerCase();
    if (name.includes(searchingText) || types.includes(searchingText)) {
      elementArray.push(element);
    }
  });
  loadImages(elementArray);
}

function deleteChild() {
  let child = loadPokemonCardsDiv.lastElementChild;
  while (child) {
    loadPokemonCardsDiv.removeChild(child);
    child = loadPokemonCardsDiv.lastElementChild;
  }
}

// start app
window.onload = async function () {
  loadMore.style.display = "none";
  let info = await axios({
    method: "get",
    url: "https://api.pokemontcg.io/v2/cards",
    responseType: "json",
  })
    .then(function (response) {
      loadMore.style.display = "block";
      loader.remove();
      console.log(response.status);
      let dane = response.data.data;
      console.log(dane);
      let searchingText = searchInput.value;
      if (searchingText == "") {
        elementArray.length = 0;
        loadImages(dane);
        dane.forEach((element) => {
          elementArray.push(element);
        });
      } else {
        elementArray.length = 0;
        search(dane, searchingText);
      }

      searchInput.addEventListener("change", () => {
        j = -1;
        deleteChild();
        searchingText = searchInput.value;
        search(dane, searchingText);
      });
      loadMoreImages(elementArray);
    })
    .catch((err) => console.log(err));
};
