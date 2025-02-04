import { pokemons } from "./pokemons.js";

let main = document.querySelector("main");

function createPokemon(params) {
  let card = document.createElement("div");
  card.classList.add("card");
  main.appendChild(card);

  let p_index = document.createElement("p");
  p_index.classList.add("index");
  p_index.innerHTML = params?.num;
  card.appendChild(p_index);

  let h2 = document.createElement("h2");
  h2.innerHTML = params?.name;
  card.appendChild(h2);

  let img = document.createElement("img");
  img.src = params?.img;
  card.appendChild(img);

  let h3 = document.createElement("h3");
  h3.innerHTML = `${params?.type[0] || ""} ${params?.type[1] || ""}`;
  card.appendChild(h3);

  let candy = document.createElement("p");
  candy.classList.add("card_p");
  candy.innerHTML = `Candy count: ${params?.candy_count || "?"}`;
  card.appendChild(candy);

  let weight = document.createElement("p");
  weight.classList.add("card_p");
  if (params?.weight.includes(".")) {
    params.weight = params.weight.replace(".", ",");
  }
  weight.innerHTML = `${params?.weight}`;
  card.appendChild(weight);

  let h4 = document.createElement("h4");
  h4.innerHTML = `${params?.weaknesses[0] || ""} ${
    params?.weaknesses[1] || ""
  } ${params?.weaknesses[2] || ""} ${params?.weaknesses[3] || ""} ${
    params?.weaknesses[4] || ""
  } ${params?.weaknesses[5] || ""} ${params?.weaknesses[6] || ""} ${
    params?.weaknesses[7] || ""
  }`;
  card.appendChild(h4);

  let spawn = document.createElement("p");
  spawn.classList.add("spawn");
  spawn.innerHTML = `${params?.spawn_time}`;
  card.appendChild(spawn);
}

pokemons.forEach((pokemon) => {
  createPokemon(pokemon);
});

let input = document.getElementById("pokemon_search");
let from = document.getElementById("from");
let to = document.getElementById("to");
let all = document.getElementById("all");
let search = document.getElementById("search");
let select = document.getElementById("select");

function filterAndSortPokemons() {
  let filteredPokemons = pokemons;

  if (input.value) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(input.value.toLowerCase())
    );
  }

  if (from.value && to.value) {
    filteredPokemons = filteredPokemons.filter(
      (pokemon) =>
        pokemon.num >= parseInt(from.value) && pokemon.num <= parseInt(to.value)
    );
  }

  if (all.value !== "all") {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.weaknesses.includes(all.value.charAt(0).toUpperCase() + all.value.slice(1))
    );
  }

  if (select.value === "default") {
    filteredPokemons = filteredPokemons.sort((a, b) => a?.num - b?.num);
  } else if (select.value === "az") {
    filteredPokemons = filteredPokemons.sort((a, b) =>
      a?.name.localeCompare(b?.name)
    );
  } else if (select.value === "za") {
    filteredPokemons = filteredPokemons.sort((a, b) =>
      b?.name.localeCompare(a?.name)
    );
  } else if (select.value === "low") {
    filteredPokemons = filteredPokemons.sort(
      (a, b) =>
        parseFloat(a?.weight.replace(",", ".")) -
        parseFloat(b?.weight.replace(",", "."))
    );
  } else if (select.value === "high") {
    filteredPokemons = filteredPokemons.sort(
      (a, b) =>
        parseFloat(b?.weight.replace(",", ".")) -
        parseFloat(a?.weight.replace(",", "."))
    );
  }

  main.innerHTML = "";
  filteredPokemons.forEach((pokemon) => {
    createPokemon(pokemon);
  });
}

search.addEventListener("click", filterAndSortPokemons);
select.addEventListener("input", filterAndSortPokemons);
all.addEventListener("input", filterAndSortPokemons);
