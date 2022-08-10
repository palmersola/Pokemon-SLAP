
let slapping = false;
const basePlyHp = plyHp;
const basePlyAtk = plyAtk;
const basePlyDef = plyDef;
const basePlySpd = plySpd;

let slap = new Audio("/assets/slap.mp3");
slap.volume = 0.25;
let bossin = new Audio("/assets/thatsbossin.mp3");
bossin.volume = 1;
document.addEventListener("keyup", event => {
  if (event.code === "Space") {
    console.log("pokemon slapped");
    event.preventDefault();
    turn();
  }
});



let newHp;

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
      if(koCheck()) {
        slapping = false;
        pokeKO();
      }else if(koCheck() === false) {
        console.log("in oppPoke KO else if");
        slapping = false
        plyKO();
      }else {
        console.log("in oppSlap if");
        plyHp = await opponentSlap();
        slapping = false;
        if(koCheck() === false) plyKO();
      }
    // after slap check to see if pokemon or player is KO'd

    }, 100);
  } else {
    // opponent slap turn
    plyHp = await opponentSlap();
    // after slap check to see if pokemon or player is KO'd

    setTimeout(async () => {
      if(koCheck()) {
        slapping = false;
        pokeKO();
      }else if(koCheck() === false) {
        slapping = false;
        plyKO();
      }else {
        oppHp = await playerSlap();
        slapping = false;
        if(koCheck()) pokeKO();
      }

    }, 100);
  }
}

async function playerSlap() {
  let dmg = Math.floor(
    (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
  );
  let newHp = oppHp - dmg;
  console.log(dmg);
  document.getElementById("oppHp").innerText = newHp;
  slap.play();
  document.getElementById("oppSprt").setAttribute("class", "animation");
  setTimeout(() => {
    document.getElementById("oppSprt").classList.remove("animation");
  }, 400);
  return newHp;
}

async function opponentSlap() {
  let dmg = Math.floor((2 * 1 / 5 + 2) * 100 * (oppAtk / plyDef) / 50 + 2);
  let newHp = plyHp - dmg;
  document.getElementById("plyHp").innerText = newHp;
  slap.play();
  document.getElementById("plySprt").setAttribute("class", "animation");
  setTimeout(() => {
    document.getElementById("plySprt").classList.remove("animation");
  }, 400);

  return newHp;
}

function koCheck() {
  if (oppHp < 1) {
    bossin.play();
    // pokeKO();
    return true;
  } else if (plyHp < 1) {
    // plyKO();
    return false;
  }
}

let round = 1;
function pokeKO() {
  console.log("you KO'D pokemon");
  round++;
  levelUp(round);
}
function plyKO() {
  console.log("you were KO'D by pokemon");
  loser();
}

async function levelUp(round) {
  console.log("level up called");
  // will increase stats and update them in db to current stats of the lvl
  let plyLevel = round;
  plyHp = Math.floor(
    0.01 * (2 * basePlyHp * plyLevel) + plyLevel + 10 + basePlyHp
  );
  plyAtk = Math.floor(0.01 * (2 * basePlyAtk * plyLevel) + 5 + basePlyAtk);
  plyDef = Math.floor(0.01 * (2 * basePlyDef * plyLevel) + 5 + basePlyDef);
  plySpd = Math.floor(0.01 * (2 * basePlySpd * plyLevel) + 5 + basePlySpd);
  document.getElementById("plyHp").innerText = plyHp;
  let nextPoke = await axios.get(`/play/${plyLevel}`);
  console.log(nextPoke);
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
  let gameOver = document.getElementById('gameOver');
  gameOver.style.visibility = "Visible";
  let replay = document.getElementById('replayBtn');
  let plySprite = document.getElementById('player');
  let pokeSprite = document.getElementById('poke');

  plySprite.style.visibility = 'hidden'
  pokeSprite.style.visibility = 'hidden'

  replay.style.visibility = "Visible";
  replay.addEventListener("click", function () {

    window.location.replace("http://localhost:3333/play")
  })
  
}


