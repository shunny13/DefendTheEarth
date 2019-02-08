function player(x,y,spd,limLeft,limRight,size,sprite){
	this.x = x
	this.y = y;
	this.speed = spd;
	this.size = size;
	this.hp = 3;

	this.show = function(){
		//fill(220);
		//triangle(this.x , this.y-size,this.x-size,this.y,this.x+size,this.y);
		image(sprite,this.x-size,this.y-size-10);
	}
	this.move = function(val){
		this.x += this.speed*val;
		if(this.x<limLeft) this.x = limLeft ;
		if(this.x>limRight) this.x = limRight-5;
	}

	this.recreate = function(){
		this.x = smallW/2+smallX;
                this.y = smallH+30;
	}


}
