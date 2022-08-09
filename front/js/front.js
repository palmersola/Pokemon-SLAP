let slapping = false
const basePlyHp = plyHp;
const basePlyAtk = plyAtk;
const basePlyDef = plyDef;
const basePlySpd = plySpd;
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
  slapping = true
  if (plySpd > oppSpd) {
    oppHp = await playerSlap();
    setTimeout(async () => {
      plyHp = await opponentSlap();
      slapping = false;
      await koCheck();
    }, 500);
  } else {
    plyHp = await opponentSlap();
    setTimeout(async () => {
      oppHp = await playerSlap();
      slapping = false;
      await koCheck();
    }, 500);
  }
  
}

async function playerSlap() {
  let dmg = Math.floor(
    (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
  );
  let newHp = oppHp - dmg;
console.log(dmg);
  document.getElementById("oppHp").innerText = newHp;
 
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

    document.getElementById("plySprt").setAttribute("class", "animation");
    setTimeout(() => {
      document.getElementById("plySprt").classList.remove("animation");
    }, 400);
    
    return newHp;  
}

async function koCheck(){
  if(oppHp < 1){
    return pokeKO();
  }else if(plyHp < 1){
    return plyKO();
  }
}

let round = 1
function pokeKO(){
    console.log("you KO'D pokemon");
    round ++
    levelUp(round)
}
function plyKO(){
    console.log("you were KO'D by pokemon");
    loser();
}

async function levelUp(round) {
  console.log("level up called");
  // will increase stats and update them in db to current stats of the lvl
  let plyLevel = round
  plyHp = Math.floor((0.01 *(2 * basePlyHp * plyLevel) + plyLevel + 10) + basePlyHp)
  plyAtk = Math.floor((0.01 *(2 * basePlyAtk * plyLevel) + 5) + basePlyAtk)
  plyDef = Math.floor((0.01 *(2 * basePlyDef * plyLevel) + 5) + basePlyDef)
  plySpd = Math.floor((0.01 *(2 * basePlySpd * plyLevel) + 5) + basePlySpd)
  document.getElementById("plyHp").innerText = plyHp;
  let nextPoke = await axios.get(`/play/${plyLevel}`);
  console.log(nextPoke);
  //update next pokemon stats based off level
  oppHP = Math.floor((0.01 *(2 * nextPoke.data.hp_stat * plyLevel) + plyLevel + 10) + nextPoke.data.hp_stat);
  oppAtk = Math.floor((0.01 *(2 * nextPoke.data.attack_stat * plyLevel) + 5) + nextPoke.data.attack_stat);
  oppDef = Math.floor((0.01 *(2 * nextPoke.data.defense_stat * plyLevel) + 5) + nextPoke.data.defense_stat);
  oppSpd = Math.floor((0.01 *(2 * nextPoke.data.speed_stat * plyLevel) + 5) + nextPoke.data.speed_stat);
  //update image source
  console.log(`HP: ${oppHP} Atk: ${oppAtk} Def: ${oppDef} Spd: ${oppSpd}`);
  document.getElementById("oppSprt").src= nextPoke.data.sprite;
  document.getElementById("oppName").innerText = nextPoke.data.pokemon_name;
  document.getElementById("oppHp").innerText = oppHP;
}
function loser() {
  // saves score and adds it to leaderboard and resets the game to start
  let updatedPlyHp = plyHp
  let updatedPlyAtk = plyAtk
  let updatedPlyLevel = plyLevel 
  let updatedPlyDef = plyDef
}


