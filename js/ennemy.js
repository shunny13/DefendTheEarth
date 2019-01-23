function ennemy(difficulty){
	this.x = random(20,width-20);
	this.y = random(-50,-20);
	this.spd = random(1*difficulty,3*difficulty);
	this.hp = random(1,5);
	this.r = random(10,20);
	this.toDelete = false;

	this.show= function(){
		fill('red');
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
