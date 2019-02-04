var isPlayerHit = function(){
        if(playerWasHit) {
                player.hp--;
                playerWasHit = false;
	console.log(bullets.length,ennemies.length);
        }
}


// Checks if the player lost all its HP and starts an event 
var isPlayerDead= function(){
        if(player.hp == 0){
                alert ("GAME OVER. Score : "+score.toString() +" Level : "+(level+1).toString());
                location.reload();
        }
}

