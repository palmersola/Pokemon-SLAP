const slapBtn = document.getDocumentById('#slap');
const playBtn = document.getElementById('#play')




playBtn.addEventListener("click", (event) => {
  window.location.href = "http://localhost:3333/play";
});

slapBtn.addEventListener("keypress", spaceClicked);

function spaceClicked(event){
    if (event.keyCode == 32);
console.log(`you slapped ${Pokemon} for ${dmgAmount}`);
}




function dmgToPokemon(){
let dmg = attack_stat;
let hp = hp_stat
}






function winner() {

}
function levelUp() {
  // will increase stats and update them in db to current stats of the lvl
}
function loser() {
  // saves score and adds it to leaderboard and resets the game to start
}
