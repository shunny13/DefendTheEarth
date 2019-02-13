// CREATE THE ENNEMIES //

var createEnnemy = function(){
        //Basic ennemy

        if(counterFrame%oneSec == 0 && play && level !=3){
		if(whichEnnemy==10) whichEnnemy=0;
		e_x = LEVELS[level][whichEnnemy][0];
		e_sp = LEVELS[level][whichEnnemy][1];
		console.log("level  = "+level,
			"which = "+whichEnnemy);
		var sizes=[50,25];
		var eSprite;
		var position = Math.floor(Math.random() * Math.floor(2));
		if(position == 0) eSprite = asteroid1;
		else eSprite=asteroid2;
                var e = new ennemy(e_x,e_sp,eSprite,sizes[position]);
                ennemies.push(e);
		whichEnnemy++;
        }
}


