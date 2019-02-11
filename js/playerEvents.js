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


var bonusspeed = function(){
		if (timespeed==3)player.speed = player.speed * 10;
		else if (counterFrame% oneSec == 0 && 3>timespeed>0)timespeed--;
		
		else if(timespeed==0)player.speed = player.speed / 10;
		
	}

