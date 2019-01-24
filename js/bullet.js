function bullet(x,y,spdx,spdy){
	//Coordinates
	this.x = x;
	this.y = y;
	//Velocities
	this.spdx = spdx;
	this.spdy = spdy;
	//Radius
	this.r = 3;
	//Flag to know if this will be deleted in the next frame
	this.toDelete = false;

	//The rendering of the bullet
	this.show = function(){
		fill('green');
		circle(this.x,this.y,this.r);
	}

	//When ever the bullet moves, it will increase its coordinates using its velocities
	this.move = function(){
		this.y+=this.spdy;
		this.x+=this.spdx;
	}
	//The small algorithm that dictates if this object hits another object , such as ennemy
	this.hits = function(ennemy){
		//First compute the distance between them , using "dist" function from p5.js
		var d = dist(this.x,this.y,ennemy.x,ennemy.y);
		//If the distance is smaller or equal to the sum of both radius, that means there's a collision, so return true
		if (d<=this.r + ennemy.r){
			return true;
		}return false;
	}
	//Flags the bullet to know if in the next frame, it will be deleted
	this.dead = function(){
		this.toDelete = true;
	}


}
