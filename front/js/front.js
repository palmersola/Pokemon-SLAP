// let plyHp = "{{player.dataValues.hp_stat}}";
// let plyAtk = "{{player.dataValues.attack_stat}}";
// let plyDef = "{{player.dataValues.defense_stat}}";
// let plyLevel = "{{player.dataValues.level}}";
// let oppHp = "{{opponent.dataValues.hp_stat}}";
// let oppAtk = "{{opponent.dataValues.attack_stat}}";
// let oppDef = "{{opponent.dataValues.defense_stat}}";
// let oppLevel = "{{opponent.dataValues.level}}";
// parseInt()

console.log(oppHp);
document.addEventListener("keyup", event => {
  if (event.code === "Space") {
    console.log("pokemon slapped");
    oppHp = playerSlap();
  }
});

function playerSlap() {
  let dmg = Math.floor(
    (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
  );
  console.log(dmg);
  let newHp = oppHp - dmg;
  console.log(newHp);
  document.getElementById("oppHp").innerText = newHp;
  return newHp;
}
// function opponentSlap() {
//   let dmg = Math.floor(
//     (2 * plyLevel / 5 + 2) * 100 * (plyAtk / oppDef) / 50 + 2
//   );
//   console.log(dmg);
//   let newHp = oppHp - dmg;
//   console.log(newHp);
//   document.getElementById("oppHp").innerText = newHp;
//   return newHp;
// }

function winner() {}
function levelUp() {
  // will increase stats and update them in db to current stats of the lvl
}
function loser() {
  // saves score and adds it to leaderboard and resets the game to start
}
