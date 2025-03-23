//variables
const squirtle = document.getElementById("squirtle");
const charmander = document.getElementById("charmander");
const bulbasaur = document.getElementById("bulbasaur");
const pokeballImage = "img/pokeball.png";
const introScreenDOM = document.getElementById("introScreen");
const battleScreenDOM = document.getElementById("battleScreen");
const gameoverScreenDOM = document.getElementById("gameoverScreen");

 //pokemon data
const squirtleData = {
  name: "Squirtle",
  selectedSprite: "img/squirtleSelected.gif", //artist: gatekid3
  battleSpriteP1: "img/squirtleBack.gif", //https://static.wikia.nocookie.net/pokemon/images/b/bc/0007Squirtle_Back_V.gif/revision/latest/smart/width/300/height/300?cb=20110523222342
  battleSpriteP2: "img/squirtleFront.gif", //https://320ave.carrd.co/assets/images/gallery01/e90cccbb.gif?v12829326493651
  attack: ["Bubble"],
}
const wartortleData = {
  name: "Wartortle",
  battleSpriteP1: "img/wartortleBack.png", 
  battleSpriteP2: "img/wartortleFront.gif", //https://66.media.tumblr.com/tumblr_ma4fusgAB01rfjowdo1_500.gif
  attack: ["Bubble", "Water Gun"],
}

const blastoiseData = {
  name: "Blastoise",
  battleSpriteP1: "img/blastoiseBack.gif", //https://static.wikia.nocookie.net/pokemon/images/5/5a/0009Blastoise_Back_V.gif/revision/latest/smart/width/300/height/300?cb=20110523222907
  battleSpriteP2: "img/blastoiseFront.gif", //https://super-smash-raze.fandom.com/wiki/Blastoise_(SSBPV)?file=Tumblr_o6rxakd7lg1txe8e9o1_500.gif
  attack: ["Bubble", "Water Gun", "Hydro Pump"],
}

const charmanderData = {
  name: "Charmander",
  selectedSprite: "img/charmanderSelected.gif", //artist: gatekid3
  battleSpriteP1: "img/charmanderBack.png", //https://pokemon-floral-tempus.fandom.com/wiki/Charmander?file=004b.png#Sprites
  battleSpriteP2: "img/charmanderFront.gif", //https://320ave.carrd.co/assets/images/gallery02/027c38cb.gif?v12829326493651
  attack: ["Ember"],	
}

const charmeleonData = {
  name: "Charmeleon",
  battleSpriteP1: "img/charmeleonBack.png", //https://static.wikia.nocookie.net/pokemon-opalo-por-ericlostie/images/5/59/005b.png/revision/latest?cb=20220314185004&path-prefix=es
  battleSpriteP2: "img/charmeleonFront.png", //https://static.wikia.nocookie.net/pokemon-magma/images/2/20/005.png/revision/latest?cb=20200506095950
  attack: ["Ember", "Fire Fang"],
}

const charizardData = {
  name: "Charizard",
  battleSpriteP1: "img/charizardBack.png", //https://static.wikia.nocookie.net/pokemon/images/7/7a/0006Charizard_Back_V.gif/revision/latest?cb=20110523221653
  battleSpriteP2: "img/charizardFront.gif", //https://static.wikia.nocookie.net/pokemon/images/c/c9/0006Charizard_BW.gif/revision/latest?cb=20120627233613
  attack: ["Ember", "Fire Fang", "Flamethrower"],
}

const bulbasaurData = {
  name: "Bulbasaur",
  selectedSprite: "img/bulbasaurSelected.gif", //artist: gatekid3
  battleSpriteP1: "img/bulbasaurBack.png", //https://art.pixilart.com/7e8988e96886ddd.png
  battleSpriteP2: "img/bulbasaurFront.gif", //https://320ave.carrd.co/assets/images/gallery02/50999c7c.gif?v12829326493651
  attack: ["Razor Leaf"],
}

const ivysaurData = {
  name: "Ivysaur",
  battleSpriteP1: "img/ivysaurBack.png", //no image
  battleSpriteP2: "img/ivysaurFront.png", //https://static.wikia.nocookie.net/pokemon-radiance/images/7/7b/227_Ivysaur.png/revision/latest?cb=20201127011428
  attack: ["Razor Leaf", "Vine Whip"],
}

const venusaurData = {
  name: "Venusaur",
  battleSpriteP1: "img/venusaurBack.png", //no image
  battleSpriteP2: "img/venusaurFront.png", //https://static.wikia.nocookie.net/pokemon-radiance/images/e/ec/228_Venusaur.png/revision/latest?cb=20201127011125
  attack: ["Razor Leaf", "Vine Whip", "Solar Beam"],
} 

// define evolutions
const evolutionData = {
  Squirtle: { evolves: "Wartortle", data: wartortleData },
  Wartortle: { evolves: "Blastoise", data: blastoiseData },
  Charmander: { evolves: "Charmeleon", data: charmeleonData },
  Charmeleon: { evolves: "Charizard", data: charizardData },
  Bulbasaur: { evolves: "Ivysaur", data: ivysaurData },
  Ivysaur: { evolves: "Venusaur", data: venusaurData },
}

let health = null;
let p1Pokemon = null;
let p2Pokemon = null;
let previousPokemon = null;
let p1HealthDOM = document.getElementById("p1HealthAmount");
let p2HealthDOM = document.getElementById("p2HealthAmount");
let currentTurn = "p1"; 
let textAttack = document.getElementById("textAttack");

// --- screens ---
function loadIntro() {
  introScreenDOM.style.display = "block";
  battleScreenDOM.style.display = "none";
  gameoverScreenDOM.style.display = "none";
}

function loadBattle() {
  introScreenDOM.style.display = "none";
  battleScreenDOM.style.display = "block"; 
  gameoverScreenDOM.style.display = "none";

  updateBattleLog(`What will PLAYER 1 do?`);

  health = 100;
  SetHealth(p1HealthDOM, health);
  SetHealth(p2HealthDOM, health);

  updateBattleScreen(p1Pokemon, "p1");
  updateBattleScreen(p2Pokemon, "p2");
  
}

function loadGameover(){
  introScreenDOM.style.display = "none";
  battleScreenDOM.style.display = "none";
  gameoverScreenDOM.style.display = "inline-block";
}

function startAudio() {
  let audio = document.getElementById("audio"); // Correct the reference to the audio element
  audio.play(); // Play the audio when the user clicks the button
}

function handleSelection(pokemon, squirtleData, charmanderData, bulbasaurData, player) {
  if (pokemon === squirtle) {
    updateSelection(squirtle, squirtleData, player);
  } else if (pokemon === charmander) {
    updateSelection(charmander, charmanderData, player);
  } else if (pokemon === bulbasaur) {
    updateSelection(bulbasaur, bulbasaurData, player);
  }
}

function updateSelection(selectedPokemon, pokemonData, player) {
  console.log(`${player} selected ${pokemonData.name}`); 
  //update header with chosen pokémon
  if (player === "p1") {
    document.getElementById("headerChoose").textContent = `Player 1: I choose you ${pokemonData.name}!`;
    p1Pokemon = pokemonData;
    } else if (player === "p2") {
      document.getElementById("headerChoose").textContent = `Player 2: I choose you ${pokemonData.name}!`;
      p2Pokemon = pokemonData;

        if (!document.getElementById("startButton")) {
          const startButton = document.createElement("button");

          startButton.id = "startButton";
          startButton.textContent = "Start!";
          startButton.onclick = loadBattle;
          startButton.onclick = function() {
            loadBattle();  // Start the battle screen
            startAudio();  // Start the audio
          };

          pokeballHeader.appendChild(startButton);
        }
    }
  //update pokémon sprite
  selectedPokemon.src = pokemonData.selectedSprite;
  previousPokemon = selectedPokemon;
}

function updateBattleScreen(pokemonData, player) {
  document.getElementById(player + "Name").textContent = pokemonData.name;
  // Update the sprite for Player 1 or Player 2 based on the selected Pokémon
  if (player === "p1") {
    document.getElementById(player + "Sprite").src = pokemonData.battleSpriteP1;
  } else if (player === "p2") {
    document.getElementById(player + "Sprite").src = pokemonData.battleSpriteP2;
  }
}

//https://codepen.io/gioele_casuale/pen/pvoRrRe took inspiration from this code
function SetHealth(DOMElement, value) {
  DOMElement.style.width = value + "%";  // Sets the width as a percentage
}

// ---- Battle screen logic ----

function updateBattleLog(message) {
  let battleLog = document.getElementById("battleLog");
  battleLog.innerHTML = "";
  let newMessage = document.createElement("p");
  newMessage.textContent = message;
  battleLog.appendChild(newMessage);
}

function rollD20 (currentPlayer, attack){  
  //chatGPT prompt: how can i write the currentPlayer === "p1" ? p1Pokemon : p2Pokemon; DRY?
  const players = {  
    p1: { pokemon: p1Pokemon, hpBar: p1HealthAmount }, 
    p2: { pokemon: p2Pokemon, hpBar: p2HealthAmount }
  }; 

  let opponentPlayer = currentPlayer === "p1" ? "p2" : "p1";
  let opponentPlayerContainer = document.getElementById(opponentPlayer + "Pkmn");
  let currentPlayerContainer = document.getElementById(currentPlayer + "Pkmn");
  let currentPokemon = players[currentPlayer].pokemon;
  let opponentPokemon = players[currentPlayer === "p1" ? "p2" : "p1"].pokemon;
  let currentPlayerHP = players[currentPlayer].hpBar;
  let opponentPlayerHP = players[currentPlayer === "p1" ? "p2" : "p1"].hpBar;

  let roll = Math.ceil(Math.random() * 20);

  if (roll <= 1) {
    updateBattleLog(`${currentPokemon.name} is confused and hits itself for 2 HP!`);
    currentPlayerHP.style.width = (parseFloat(currentPlayerHP.style.width) - 2) + "%";
    shakeEffect(currentPlayerContainer);
    damageEffect(currentPlayerContainer);
  }
  else if (roll >= 18) {
    let nextEvolution = evolutionData[currentPokemon.name]?.evolves; //chatGPT fixed my error by adding a ? prompt: why is let nextEvolution = evolutionData[p1Pokemon.name].evolves; returning an error?
    handleRoll(opponentPlayerHP, attack);
    shakeEffect(opponentPlayerContainer);
    
    if (nextEvolution) {
      updateBattleLog(`What? ${currentPokemon.name} is evolving!`);

      let spriteElement = document.getElementById(currentPlayer + "Sprite");

      console.log(`The player rolled a ${roll}! ${currentPokemon.name} is evolving!`);

      spriteElement.classList.add("glow-effect");
      setTimeout(() => {
        spriteElement.classList.remove("glow-effect");
      
        // Update Pokémon data
        evolvedPokemon = evolutionData[currentPokemon.name].data;
        if (currentPlayer === "p1") {
          p1Pokemon = evolvedPokemon;
          currentPokemon = p1Pokemon;
        }
        else {
          p2Pokemon = evolvedPokemon;
          currentPokemon = p2Pokemon;
        }
        console.log(`Your Pokémon evolved into ${evolvedPokemon.name} and learnt a new attack!`);
        console.log(currentPokemon);
        updateBattleScreen(evolvedPokemon, currentPlayer);
      }, 3000);
    }
    else {
      updateBattleLog(`${currentPokemon.name} lands a critical hit on ${opponentPokemon.name}!`);
      handleRoll(opponentPlayerHP, attack);
      shakeEffect(opponentPlayerContainer);
    }
  }
  else {
    updateBattleLog(`${currentPokemon.name} lands a hit on ${opponentPokemon.name}!`);
    handleRoll(opponentPlayerHP, attack)
    shakeEffect(opponentPlayerContainer);
  }
  switchTurn();
}


function handleRoll(opponentPlayerHP, attack) {
  let damage = getValue(attack, "attack");
  decreaseHealth(opponentPlayerHP, damage);
  console.log(opponentPlayerHP, damage);
}

function decreaseHealth(DOMElement, damage) {
  if (parseFloat(DOMElement.style.width) <= damage) {
    DOMElement.style.width = 0;
    console.log("pokimans is dede")
    loadGameover();
  }
  else {
    DOMElement.style.width = (parseFloat(DOMElement.style.width) - damage) + "%";
  } 
 damageEffect(DOMElement);
}

function getValue(attackIndex) {
  console.log("index is " + attackIndex);
  switch (attackIndex) {
    case 0:
      return 8; 
    case 1:
      return 15; 
    case 2:
      return 20;
  }
}

function switchTurn() {
  currentTurn = currentTurn === "p1" ? "p2" : "p1";
  document.getElementById("text").style.display = "block";
  document.getElementById("attacks").style.display = "none";
}

function displayAttacks(pokemonData) { 
  let attackContainer = document.getElementById("attacks");
  attackContainer.innerHTML = ""; // Clears all previous attacks //chatGPT result on error: eventListeners stacked, this prevents it

  pokemonData.attack.forEach((attack, i) => {
    let attackButton = document.createElement("h2");
    attackButton.id = `attack${i}`;
    attackButton.textContent = attack;
    attackButton.addEventListener("click", function () {
      console.log(`Player chose ${attack}`);
      rollD20(currentTurn, i);
    });
    attackContainer.appendChild(attackButton); 
  });
}

//--- animations ---
function damageEffect(DOMElement) {
  DOMElement.classList.add("damage-effect");
  setTimeout(() => {
    DOMElement.classList.remove("damage-effect");
  }, 500); // Revert to green after 500ms
}

function shakeEffect(DOMElement) {
  DOMElement.classList.add("shake-effect");
      setTimeout(() => {
        DOMElement.classList.remove("shake-effect");
      }, 500);
}

document.addEventListener("DOMContentLoaded", function () { // ChatGPT prompt: Why does the start button stay even after the page loads?
  // Event listener for all Pokémon choices
  [squirtle, charmander, bulbasaur].forEach(pokemon => {
    pokemon.addEventListener("click", function () {
      if (!p1Pokemon) {
        handleSelection(pokemon, squirtleData, charmanderData, bulbasaurData, "p1");
      } else if (p1Pokemon && !p2Pokemon) {
        if (pokemon !== previousPokemon) {
          handleSelection(pokemon, squirtleData, charmanderData, bulbasaurData, "p2");
        }
        else {
          alert("You can't choose the same Pokémon as Player 1!");
        }
      }
    });
  });
});

// display attack
document.addEventListener("DOMContentLoaded", function () {
  textAttack.addEventListener("click", function () {
    document.getElementById("text").style.display = "none";
    document.getElementById("attacks").style.display = "block";
    
    let pokemonData = currentTurn === "p1" ? p1Pokemon : p2Pokemon; //chatGPT prompt: how to fix this error? result: use currentTurn === "p1" ? p1Pokemon : p2Pokemon to access the appropriate Pokémon data for the current player.
    
    updateBattleLog(`What will ${pokemonData.name} do?`);

    console.log(pokemonData);
    displayAttacks(pokemonData);
  });
});

buttonYes.addEventListener("click", function (event) {
  loadBattle();
});

buttonNo.addEventListener("click", function (event) {
  loadIntro();
});
