// CHECK COLLISION BETWEEN BULLET AND ENNEMY
var checkCollision = function(){
        for(var i=0;i<bullets.length;i++){
                for(var e =0;e<ennemies.length;e++){
                        if(bullets[i].hits(ennemies[e])){
                                crashSFX.play();
                                bullets[i].dead();
                                ennemies[e].dead();
                                score+=100;
                        }
                }
        }

	for(var u=0;u<ulti.length;u++){
		for(var i =ennemies.length-1;i>=0;i--){
			if (ulti[u].hits(ennemies[i])){
				crashSFX.play();
				ennemies[i].dead();
				score+=100;
			}
		}
	}

}

