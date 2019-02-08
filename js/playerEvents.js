var isPlayerHit = function(){
        if(playerWasHit) {
                player.hp--;
                playerWasHit = false;
        }
}


// Checks if the player lost all its HP and starts an event 
var isPlayerDead= function(){
        if(player.hp == 0){
		start = false;
		gameOver = true;
		gameOverScreen();
        }
}

