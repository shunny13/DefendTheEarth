function bonusbox(difficulty,diameter,bonus){
	var Nameofbonus = ["speed","upult","uplife"];
	var randombonus = Nameofbonus[ Math.floor(Math.random() * Nameofbonus.length) ];
	this.x = random(smallX+diameter,smallX+smallW-diameter);
	this.y = smallY+(diameter/2);
	this.spd = random(1*difficulty,2*difficulty);
	this.bonus = randombonus;
	this.r = diameter/2;
	this.toDelete = false;

	
	this.show= function(){
		if (this.bonus=="speed")fill('blue');
		else if (this.bonus=="upult")fill('red');
		else if(this.bonus=="uplife")fill('green');
		
		circle(this.x,this.y,this.r);
	
	}
	this.move = function(){
		this.y+=this.spd;
	}

	this.dead= function(){
		
		this.toDelete = true;
	}

}
