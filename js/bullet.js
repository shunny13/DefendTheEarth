function bullet(x,y,spdx,spdy){
	this.x = x;
	this.y = y;
	this.spdx = spdx;
	this.spdy = spdy;
	this.r = 3;
	this.toDelete = false;

	this.show = function(){
		fill('green');
		circle(this.x,this.y,this.r);
	}
	this.move = function(){
		this.y+=this.spdy;
		this.x+=this.spdx;
	}
	this.hits = function(ennemy){
		var d = dist(this.x,this.y,ennemy.x,ennemy.y);
		if (d<=this.r + ennemy.r){
			return true;
		}return false;
	}
	
	this.dead = function(){
		this.toDelete = true;
	}


}
