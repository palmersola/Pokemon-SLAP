


document.addEventListener("keyup", event => {
  if (event.code === "Space") {
    console.log("pokemon slapped");
    turn();
  }
});

async function turn() {
  if (plySpd > oppSpd) {
    oppHp = playerSlap();
    setTimeout(() => {
      plyHp = opponentSlap();
    }, 1500);
  } else {
    plyHp = await opponentSlap();
    oppHp = await playerSlap();
  }
}

async function playerSlap() {
  let dmg = Math.floor(
    (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
  );
  console.log("player damge" + dmg);
  let newHp = oppHp - dmg;
  console.log("opponent health" + newHp);
  document.getElementById("oppHp").innerText = newHp;
  if(oppHp <= 0){
    pokeKO();
    return;
    }  
  setTimeout(() => {
    document.getElementById("oppSprt").setAttribute("class", "animation");
  }, 400);
  document.getElementById("oppSprt").removeAttribute("class", "animation");
  return newHp;
}


async function opponentSlap() {
    let dmg = Math.floor((2 * 1 / 5 + 2) * 100 * (oppAtk / plyDef) / 50 + 2);
    console.log(dmg);
    let newHp = plyHp - dmg;
    console.log(newHp);
    document.getElementById("plyHp").innerText = newHp;
    if(plyHp <= 0){
        plyKO();
        return;
    }
    setTimeout(() => {
      document.getElementById("plySprt").setAttribute("class", "animation");
    }, 400);
    document.getElementById("plySprt").removeAttribute("class", "animation");

    return newHp;  
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

function levelUp(round) {
  // will increase stats and update them in db to current stats of the lvl
  let plyLevel = round
  let updatedPlyHp = Math.floor((0.01 *(2 * plyHp * plyLevel) + plyLevel + 10))
  let updatedPlyAtk = Math.floor((0.01 *(2 * plyAtk * plyLevel) + 5))
  let updatedPlyLevel = plyLevel + 1
  let updatedPlyDef = Math.floor((0.01 *(2 * plyDef * plyLevel) + 5))
  document.getElementById("plyHp").innerText = updatedPlyHp;
}
function loser() {
  // saves score and adds it to leaderboard and resets the game to start
  let updatedPlyHp = plyHp
  let updatedPlyAtk = plyAtk
  let updatedPlyLevel = plyLevel 
  let updatedPlyDef = plyDef
}


