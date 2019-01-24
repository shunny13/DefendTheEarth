//The player class
//It's a functional class because easier to use
function player(){
	this.x = width/2;
	this.y = height-10;
	this.speed = 5;

	//The render of the player
	this.show = function(){
		fill(220);
		triangle(this.x , this.y-20,this.x-20,this.y,this.x+20,this.y);
	}
	//When ever keys are pressed , it will make the player to move
	this.move = function(val){
		this.x += this.speed*val;
		if(this.x<20) this.x = 20;
		if(this.x>width-20) this.x = width-20;
	}


}
