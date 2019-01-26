function player(){
	this.x = width/2;
	this.y = height-10;
	this.speed = 6;


	this.show = function(){
		fill(220);
		triangle(this.x , this.y-20,this.x-20,this.y,this.x+20,this.y);
	}
	this.move = function(val){
		this.x += this.speed*val;
		if(this.x<20) this.x = 20;
		if(this.x>width-20) this.x = width-20;
	}


}
