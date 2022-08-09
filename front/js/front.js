let slappin = false;
let round = 1;
const basePlyHp = plyHp;
const basePlyAtk = plyAtk;
const basePlyDef = plyDef;
const basePlySpd = plySpd;
const basePlyLevel = plyLevel;
const baseOppHp = oppHp;
const baseOppAtk = oppAtk;
const baseOppDef = oppDef;
const baseOppSpd = oppSpd;
let slap = new Audio("/assets/slap.mp3");
slap.volume = 0.25;
let bossin = new Audio("/assets/thatsbossin.mp3");
bossin.volume = 1;
document.addEventListener("keyup", event => {
  if (event.code === "Space") {
    console.log("pokemon slapped");
    turn();
  }
});

async function turn() {
  if (slappin) return;
  slappin = true;
  if (plySpd > oppSpd) {
    oppHp = await playerSlap();
    console.log(oppHp);
    await setTimeout(async () => {
      plyHp = await opponentSlap();
      slappin = false;
    }, 1000);
  } else {
    plyHp = await opponentSlap();
    await setTimeout(async () => {
      oppHp = await playerSlap();
      slappin = false;
    }, 1000);
  }
}

async function playerSlap() {
  let dmg = Math.floor(
    (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
  );
  let newHp = Math.max(0, oppHp - dmg);
  document.getElementById("oppHp").innerText = newHp;
  if (newHp === 0) {
    bossin.play();
    return pokeKO();
  }

  slap.play();
  document.getElementById("oppSprt").classList.add("animation");
  setTimeout(() => {
    document.getElementById("oppSprt").classList.remove("animation");
  }, 300);
  return newHp;
}

async function opponentSlap() {
  let dmg = Math.floor((2 * 1 / 5 + 2) * 100 * (oppAtk / plyDef) / 50 + 2);
  let newHp = Math.max(0, plyHp - dmg);
  document.getElementById("plyHp").innerText = newHp;
  if (newHp === 0) {
    return plyKO();
  }
  slap.play();

  document.getElementById("plySprt").classList.add("animation");
  setTimeout(() => {
    document.getElementById("plySprt").classList.remove("animation");
  }, 300);

  return newHp;
}

function pokeKO() {
  console.log("you KO'D pokemon");
  round++;
  console.log(round);
  levelUp(round);
}
function plyKO() {
  console.log("you were KO'D by pokemon");
  loser();
}

function levelUp(round) {
  // will increase stats and update them in db to current stats of the lvl
  let plyLevel = round;
  let updatedPlyHp = Math.floor(
    0.01 * (2 * basePlyHp * plyLevel) + plyLevel + 10 + basePlyHp
  );
  let updatedPlyAtk = Math.floor(
    0.01 * (2 * basePlyAtk * plyLevel) + 5 + basePlyAtk
  );
  let updatedPlyDef = Math.floor(
    0.01 * (2 * basePlyDef * plyLevel) + 5 + basePlyDef
  );
  let updatedPlySpd = Math.floor(
    0.01 * (2 * basePlySpd * plyLevel) + 5 + basePlySpd
  );
  document.getElementById("plyHp").innerText = updatedPlyHp;
}
function loser() {
  // saves score and adds it to leaderboard and resets the game to start
  let updatedPlyHp = plyHp;
  let updatedPlyAtk = plyAtk;
  let updatedPlyLevel = plyLevel;
  let updatedPlyDef = plyDef;
}
