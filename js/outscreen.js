// DESTROYS BULLETS IF IT GETS OUT OF THE SCREEN
var didBulletsPastScreen = function(){
        for(var i=bullets.length-1 ; i>=0 ; i--){
                b = bullets[i];
                if (b.toDelete || b.y < 30 || b.x<smallX || b.x>smallW+smallX)
                {
                        bullets.splice(i,1);
                }
        }
}

// DESTORYS ENNEMY IF IT PASSES OUT OF THE SCREEN
var didEnnemyPastScreen = function(){
        for(var e=0;e<ennemies.length;e++){
                s = ennemies[e];
                if(s.y-s.r>=smallH+smallY){
                playerWasHit = true;
                        s.dead();
                }

                if (s.toDelete)  ennemies.splice(e,1);
        }
}

