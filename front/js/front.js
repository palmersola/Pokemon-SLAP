let round;
let slapping = false;
let critical = 1;
let newHp;

let plySprt = document.getElementById("plySprt");
let plyrCrit = document.getElementById("plyrCrit");
let plyrMiss = document.getElementById("plyrMiss");
let plyrHit = document.getElementById("plyrHit");

let oppSprt = document.getElementById("oppSprt");
let pokeCrit = document.getElementById("pokeCrit");
let pokeMiss = document.getElementById("pokeMiss");
let pokeHit = document.getElementById("pokeHit");

let slap = new Audio("/assets/slap.mp3");
slap.volume = 0.25;
let bossin = new Audio("/assets/thatsbossin.mp3");
bossin.volume = 1;
//spacebar click listener
document.addEventListener("keyup", event => {
  if (event.code === "Space") {
    event.preventDefault();
    turn();
  }
});

//screen touch listener
document.addEventListener("touchstart", event => {
  event.preventDefault();
  turn();
});
//stop scrolling on spacebar press
window.addEventListener("keydown", e => {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

async function turn() {
  if (slapping) return;
  slapping = true;
  //check player and opponent speed to see who gets first slap
  if (plySpd >= oppSpd) {
    // player slap turn
    oppHp = await playerSlap();
    // after slap check to see if pokemon or player is KO'd
    setTimeout(async () => {
      //check to ensure opponent slap does not occur if opponent is KO'd
      if (koCheck()) {
        slapping = false;
        pokeKO();
      } else if (koCheck() === false) {
        slapping = false;
        plyKO();
      } else {
        plyHp = await opponentSlap();
        slapping = false;
        if (koCheck() === false) plyKO();
      }
      // after slap check to see if pokemon or player is KO'd
    }, 950);
  } else {
    // opponent slap turn
    plyHp = await opponentSlap();
    // after slap check to see if pokemon or player is KO'd

    setTimeout(async () => {
      if (koCheck()) {
        slapping = false;
        pokeKO();
      } else if (koCheck() === false) {
        slapping = false;
        plyKO();
      } else {
        oppHp = await playerSlap();
        slapping = false;
        if (koCheck()) pokeKO();
      }
    }, 950);
  }
}

async function playerSlap() {
  let evade = oppSpd / plySpd * 0.7 + 0.3;
  let missNumb = Math.floor(Math.random() * 11);
  let miss = missNumb / evade;
  let crit = Math.floor(Math.random() * 11);
  if (crit < 2) {
    critical = 4;
  }

  if (miss > 2) {
    let dmg = Math.floor(
      (2 * plyLevel * critical / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
    );

    let newHp = Math.max(0, oppHp - dmg);
    document.getElementById("oppHp").innerText = newHp;
    slap.play();

    pokeHit.innerText = `-${dmg}`;
    pokeHit.style.visibility = "Visible";
    pokeHit.setAttribute("class", "animation");
    oppSprt.setAttribute("class", "animation");
    if (critical === 4) {
      plyrCrit.style.visibility = "Visible";
      plyrCrit.setAttribute("class", "animation");
    }
    setTimeout(() => {
      oppSprt.classList.remove("animation");
      pokeHit.style.visibility = "hidden";
      pokeHit.classList.remove("animation");
      plyrCrit.style.visibility = "hidden";
      plyrCrit.classList.remove("animation");
    }, 500);

    critical = 1;
    return newHp;
  } else {
    let newHp = oppHp;
    document.getElementById("oppHp").innerText = newHp;
    plyrMiss.style.visibility = "Visible";
    plyrMiss.setAttribute("class", "animation");
    setTimeout(() => {
      plyrMiss.style.visibility = "hidden";
      plyrMiss.classList.remove("animation");
    }, 500);

    critical = 1;

    return newHp;
  }
}

async function opponentSlap() {
  let evade = plySpd / oppSpd * 0.7 + 0.3;
  let missNumb = Math.floor(Math.random() * 11);
  let miss = missNumb / evade;
  let crit = Math.floor(Math.random() * 11);
  if (crit < 2) {
    critical = 4;
  }

  if (miss > 2) {
    let dmg = Math.floor(
      (2 * plyLevel * critical / 5 + 2) * 100 * (oppAtk / plyDef) / 50 + 2
    );
    let newHp = Math.max(0, plyHp - dmg);
    document.getElementById("plyHp").innerText = newHp;
    slap.play();

    plyrHit.innerText = `-${dmg}`;
    plyrHit.style.visibility = "Visible";
    plyrHit.setAttribute("class", "animation");
    plySprt.setAttribute("class", "animation");
    if (critical === 4) {
      pokeCrit.style.visibility = "Visible";
      pokeCrit.setAttribute("class", "animation");
    }
    setTimeout(() => {
      plySprt.classList.remove("animation");
      plyrHit.style.visibility = "hidden";
      plyrHit.classList.remove("animation");
      pokeCrit.style.visibility = "hidden";
      pokeCrit.classList.remove("animation");
    }, 500);

    return newHp;
  } else {
    let newHp = plyHp;
    document.getElementById("plyHp").innerText = newHp;
    pokeMiss.style.visibility = "Visible";
    pokeMiss.setAttribute("class", "animation");
    setTimeout(() => {
      pokeMiss.style.visibility = "hidden";
      document.getElementById("pokeMiss").classList.remove("animation");
    }, 500);

    return newHp;
  }
}

function koCheck() {
  if (oppHp === 0) {
    // bossin.play();
    // pokeKO();
    return true;
  } else if (plyHp === 0) {
    // plyKO();
    return false;
  }
}


function pokeKO() {
  round++;
  levelUp(round);
}
function plyKO() {

  console.log("you were KO'D by pokemon");
  loser(level);
}

function levelUp(round) {
  console.log("level up called");
  // will increase stats in db to current stats of the lvl
  let plyLevel = round;
  plyHp = Math.floor(
    0.01 * (2 * baseHp * plyLevel) + plyLevel + 10 + baseHp
  );
  plyAtk = Math.floor(0.01 * (2 * baseAtk * plyLevel) + 5 + baseAtk);
  plyDef = Math.floor(0.01 * (2 * baseDef * plyLevel) + 5 + baseDef);
  plySpd = Math.floor(0.01 * (2 * baseSpd * plyLevel) + 5 + baseSpd);
  document.getElementById("plyHp").innerText = plyHp;

  //check to see if player hits the save points every 5 levels and
  //update stats in the database for character
  if( round % 5 === 0){
    let data = {
      plyLevel: plyLevel,
      plyHp: plyHp,
      plyAtk: plyAtk,
      plyDef: plyDef,
      plySpd: plySpd
    }
    axios.post(`/play/save`, data).then(
      nextPokemon(plyLevel)
    )
  } else nextPokemon(plyLevel);

  

  
}

async function nextPokemon(plyLevel){
    let nextPoke = await axios.get(`/play/${plyLevel}`);
    // console.log(nextPoke);
    //update next pokemon stats based off level
    oppHp = Math.floor(
      0.01 * (2 * nextPoke.data.hp_stat * plyLevel) +
        plyLevel +
        10 +
        nextPoke.data.hp_stat
    );
    oppAtk = Math.floor(
      0.01 * (2 * nextPoke.data.attack_stat * plyLevel) +
        5 +
        nextPoke.data.attack_stat
    );
    oppDef = Math.floor(
      0.01 * (2 * nextPoke.data.defense_stat * plyLevel) +
        5 +
        nextPoke.data.defense_stat
    );
    oppSpd = Math.floor(
      0.01 * (2 * nextPoke.data.speed_stat * plyLevel) +
        5 +
        nextPoke.data.speed_stat
    );
    console.log("level up func oppHP" + oppHp);
    //update image source
    console.log(`HP: ${oppHp} Atk: ${oppAtk} Def: ${oppDef} Spd: ${oppSpd}`);
    document.getElementById("oppSprt").src = nextPoke.data.sprite;
    document.getElementById("oppName").innerText = nextPoke.data.pokemon_name;
    document.getElementById("oppHp").innerText = oppHp;
    document.getElementById("level").innerText = round;
}
async function loser() {
  console.log("Loser Called");
  slapping = true;
  let gameOver = document.getElementById("gameOver");
  gameOver.style.visibility = "Visible";
  let replay = document.getElementById("replayBtn");
  let plySprite = document.getElementById("player");
  let pokeSprite = document.getElementById("poke");

  //hide sprites when game is over
  plySprite.style.visibility = "hidden";
  pokeSprite.style.visibility = "hidden";

  //make play again button visible and add event listener to it
  replay.style.visibility = "Visible";
  replay.addEventListener("click", function() {

    // window.location.replace("https://poke-slap.herokuapp.com/play");
    window.location.replace("http://localhost:3333/play");
  });
}

async function getLevel() {
  let data = await axios.get(`/play/level/round`)
  round = data.data.level;
  levelUp(round);
  };

  getLevel()
