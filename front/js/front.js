function playGame(){
}

function oppSlap(){
    var hp = 100; //changes based off of level of enemy
    var dmg = 10
    hp -= dmg
    document.getElementById("oppHP").value = hp
    if(hp <= 0){
        console.log("Opponent Died!");
    }
}
function userSlap(){
    var hp = 100; //changes based off of level of user
    var defense = 5
    var dmg = 10
    dmg -= defense
    hp -= dmg
    document.getElementById("userHP").value = hp
    if(hp <= 0){
       console.log("You Died!"); 
    loser()
    }
}
function winner(){
    var gainXp = 30// needs changing accordingly
    var currentXp = 100//needs changing accordingly
    gainXp = currentXp 
    document.getElementById("level").value = currentXp
    if(currentXp >= 100 && currentXp <= 199){
        levelUp();
    };
    if(currentXp >= 200 && currentXp <= 299){
        levelUp()
    };
    if(currentXp >= 300 && currentXp <= 399){
        levelUp()
    };
    if(currentXp >= 400 && currentXp <= 499){
        levelUp()
    };
}
function levelUp(){
// will increase stats and update them in db to current stats of the lvl
}
function loser(){
// saves score and add it to leaderboard and resets the game to start
}

