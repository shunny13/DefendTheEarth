/// MAKE ACTIONS OF MOUVEMENT AND IMAGE OF PLAYER ///
var renderPlayer = function(){
        mouvement();
        player.show();
}

//Render bullets
var renderBullets = function(){
        for(var i=bullets.length-1;i>=0;i--){
                b = bullets[i];
                b.show();
                b.move();
        }
}

// Render the ennemies
var renderEnnemies = function(){
        for(var e=ennemies.length-1;e>=0;e--){
                s = ennemies[e];
                s.show();
                s.move();
        }
}

//RENDER SOUND ///
var soundRender= function(){
        fill('black');
        drawRect("sound",715,10,95,15);
        fill('green');
        text('SOUND ON/OFF',720 ,20);
        noFill();
}

//RENDER HP//
var hpRender = function(){
        fill('black');
        drawRect("playerHP",10,60,75,25);
        textSize(20);
        fill('green');
        text('HP : '+player.hp.toString() ,10 ,80);
}

// POPS UP THE LEVEL UP ////////////////////
var levelup = function(){
        textSize(50);0
        textStyle(BOLD);
        fill('green');
        text('LEVEL UP', width/2-120, height/2-50);
}
//////////////////////////////////////////////

//////////////////////////////////////////////

// RENDER SCORE AND LEVEL ///
var scoreAndLevel = function(){
        fill('black');
        drawRect("scores",5,5,90,30);
        textSize(10);
        textStyle(BOLD);
        fill('green');
        text('Score : '+score.toString(), 10, 15);
        text('Level : '+(level+1).toString(), 10, 30);
}
//
// draws the overcharge

var drawOverchargeBar = function(){
        fill('green');
        textSize(12);
        text('OVERLOAD',12,115);
        fill('black');
        strokeWeight(2);
        stroke(51);
        rect(35,125,30,100);
        noFill();
        fill('red');
}

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
                if(s.y + s.r>=smallH+smallY){
                playerWasHit = true;
                        s.dead();
                }

                if (s.toDelete) {
			ennemies.splice(e,1);
		}
        }
}


