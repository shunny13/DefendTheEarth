function ennemy(difficulty,color){
	this.x = random(smallX+20,smallX+smallW-20);
	this.y = random(-50,-20);
	this.spd = random(1*difficulty,2*difficulty);
	this.hp = random(1,5);
	this.r = random(10,20);
	this.toDelete = false;

	this.show= function(){
		fill(color);
		circle(this.x,this.y,this.r);
	}
	this.move = function(){
		this.y+=this.spd;
	}

	this.dead= function(){
		//return this.hp === 0;
		this.toDelete = true;
	}

}
