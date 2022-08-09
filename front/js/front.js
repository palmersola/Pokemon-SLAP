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
  setTimeout(() => {
    document.getElementById("plySprt").setAttribute("class", "animation");
  }, 400);
  document.getElementById("plySprt").removeAttribute("class", "animation");
  return newHp;
}
