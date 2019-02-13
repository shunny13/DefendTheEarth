function ennemy(x,spd,sprite,diameter){
	this.x = x;
	this.y = smallY+(diameter/2);
	this.spd = spd;
	this.hp = random(1,5);
	this.r = diameter/2;
	this.toDelete = false;

	this.show= function(){
		noFill();
		noStroke();
		circle(this.x,this.y,this.r);
		image(sprite,this.x-this.r , this.y-this.r);
	}
	this.move = function(){
		this.y+=this.spd;
	}

	this.dead= function(){
		//return this.hp === 0;
		this.toDelete = true;
	}

}
