// CHECK COLLISION BETWEEN BULLET AND object
var checkCollision = function(){
        for(var i=0;i<bullets.length;i++){
                for(var e =0;e<ennemies.length;e++){
                        if(bullets[i].hits(ennemies[e])){
                                crashSFX.play();
                                bullets[i].dead();
                                ennemies[e].dead();
                                score+=100;
				chargesToUlt+=100;
                        }
                }
        }
		
		for(var i=0;i<bullets.length;i++){
                for(var b =0;b<bonusboxtab.length;b++){
						var box=bonusboxtab[b];
                        if(bullets[i].hits(box)){
                                crashSFX.play();
                                bullets[i].dead();
					   if (box.bonus=="speed")timespeed = 3;
					   else if (box.bonus=="upult"){
					   counterUlts++;
					   chargesToUlt = 0;
					   }
					   else if (box.bonus=="uplife")player.hp++;
                                box.dead();
                                
				
                        }
                }
        }

	for(var u=0;u<ulti.length;u++){
		for(var i =ennemies.length-1;i>=0;i--){
			if (ulti[u].hits(ennemies[i])){
				crashSFX.play();
				ennemies[i].dead();
				score+=100;
				chargesToUlt+=100;
			}
		}
	}

}

