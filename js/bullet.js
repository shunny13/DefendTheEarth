function bullet(x,y,spdx,spdy){
	this.x = x;
	this.y = y;
	this.spdx = spdx;
	this.spdy = spdy;
	this.r = 3;
	this.toDelete = false;
	
	this.show = function(){
		fill('white');
		circle(this.x,this.y,this.r);
	}
	this.move = function(){
		this.y+=this.spdy;
		this.x+=this.spdx;
	}
	this.hits = function(object){
		var d = dist(this.x,this.y,object.x,object.y);
		if (d<=this.r + object.r){
			return true;
		}return false;
	}
	
	this.dead = function(){
		this.toDelete = true;
	}


}
