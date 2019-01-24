//All the ennemies are created randomly
//It only takes the parameter : the difficulity
//The difficulty is choose by the level and will dictate how fast the 
// future ennemies will be
function ennemy(difficulty){
	//Starting positions
	this.x = random(20,width-20);
	this.y = random(-50,-20);
	//Velocity - They will ONLY go DOWN
	this.spd = random(1*difficulty,3*difficulty);
	// TODO Add hp & hp bar to some ennemies
	this.hp = random(1,5);
	//Random radius
	this.r = random(10,20);
	//Flag in case there is collision
	this.toDelete = false;

	//The rendering of the ennemy
	this.show= function(){
		fill('red');
		circle(this.x,this.y,this.r);
	}
	//When ever it will move, increase its vertical position by the its velocity
	this.move = function(){
		this.y+=this.spd;
	}

	//If there is collision, we call this so that we can flag this element as "deleateble"
	this.dead= function(){
		//return this.hp === 0;
		this.toDelete = true;
	}

}
