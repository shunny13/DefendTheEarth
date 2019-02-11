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

// Render the bonusbox
var renderbonusbox = function(){
        for(var b=bonusboxtab.length-1;b>=0;b--){
                var s = bonusboxtab[b];
                s.show();
                s.move();
        }
}

//RENDER SOUND ///
var soundRender= function(){
        fill('black');
        drawRect(715,10,95,15);
	fill('green');
        text('SOUND ON/OFF',720 ,20);
        noFill();
}

//RENDER HP//
var hpRender = function(){
        fill('black');
        drawRect(10,60,75,25);
	textSize(20);
        fill('green');
        text('HP : '+player.hp.toString() ,10 ,80);
}

// POPS UP THE LEVEL UP ////////////////////
var levelup = function(){
        textSize(50);
        textStyle(BOLD);
        fill('green');
        text('LEVEL UP', width/2-120, height/2-50);
}

var ultRender = function(){
	fill('black');
	drawRect(10, height/2,80,25);
	rect(10,height/2,80,25);
	fill('lightblue');
	rect(10,height/2,8*chargesToUlt/100,25);
	textSize(15);
	fill('green');
	text("ULTS x"+counterUlts.toString(),12,height/2+20);
}
//////////////////////////////////////////////

//////////////////////////////////////////////

// RENDER SCORE AND LEVEL ///
var scoreAndLevel = function(){
        fill('black');
        drawRect(5,5,90,30);
        rect(5,5,90,30);
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
        var ol = {
		xd:35,
		yd:125,
		xf:65,
		yf:225
	};
        fill('black');
	drawRect(ol.xd, ol.yd, ol.xf-ol.xd, ol.yf-ol.yd);
        fill('red');
        rect( ol.xd ,ol.yf-(surchargedShot*10), ol.xf-ol.xd ,surchargedShot*10 );

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

// DESTORYS bonusboc IF IT PASSES OUT OF THE SCREEN
var didbonusboxPastScreen = function(){
        for(var b=0;b<bonusboxtab.length;b++){
                s = bonusboxtab[b];
                if(s.y + s.r>=smallH+smallY){
                    s.dead();
                }

                if (s.toDelete) {
					bonusboxtab.splice(b,1);
				}
        }
}

//IF ULT IS OVER
var didLaserPastScreen = function(){
        for(var i=ulti.length-1 ; i>=0 ; i--){
                s = ulti[i];
                if (s.toDelete || s.y1 < smallY)
                {
                        ulti.splice(i,1);
			
                }
        }
}

