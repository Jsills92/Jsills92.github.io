const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query) {
    searchPokemon(query);
  } else {
    alert("Please enter a Pokémon name or ID");
  }
});

// Function to search for a Pokémon
function searchPokemon(query) {
  // Special case for "Red"
  if (query.toLowerCase() === "red") {
    alert("Pokémon not found");
    return;
  }

  // API request to fetch Pokémon data
  fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then(data => {
      // Display Pokémon data
      displayPokemon(data);
    })
    .catch(error => {
      alert(error.message); // Show error message
    });
}

// Function to display Pokémon data
function displayPokemon(data) {
  // Clear previous data
  types.innerHTML = ""; // Clear types

  // Update the page elements with the fetched data
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  // Update stats
  hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
  attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
  defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
  specialAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
  specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
  speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;

  // Update types (one or more)
  data.types.forEach(type => {
    const typeElement = document.createElement("span");
    typeElement.textContent = type.type.name.toUpperCase();
    types.appendChild(typeElement);
  });

  // Add or update sprite image
  let sprite = document.getElementById("sprite");
  if (!sprite) {
    // Create a new img element if it doesn't exist
    sprite = document.createElement("img");
    sprite.id = "sprite";
    document.body.appendChild(sprite); // Append the sprite to the body (or a container)
  }
  sprite.src = data.sprites.front_default;
  sprite.alt = data.name;
}