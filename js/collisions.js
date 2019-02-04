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
}

