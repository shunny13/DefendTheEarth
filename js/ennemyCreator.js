// CREATE THE ENNEMIES //

var createEnnemy = function(){
        //Basic ennemy
        if(counterFrame%100 == 0 && play){
		var sizes=[50,25];
		var eSprite;
		var position = Math.floor(Math.random() * Math.floor(2));
		if(position == 0) eSprite = asteroid1;
		else eSprite=asteroid2;
                var e = new ennemy(difficulty,eSprite,sizes[position]);
                ennemies.push(e);
        }
}


