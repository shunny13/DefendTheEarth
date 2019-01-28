function player(x,y,spd,limLeft,limRight,size){
	this.x = x
	this.y = y;
	this.speed = spd;
	this.size = size;
	this.hp = 3;

	this.show = function(){
		fill(220);
		triangle(this.x , this.y-size,this.x-size,this.y,this.x+size,this.y);
	}
	this.move = function(val){
		this.x += this.speed*val;
		if(this.x<limLeft) this.x = limLeft ;
		if(this.x>limRight) this.x = limRight;
	}


}
