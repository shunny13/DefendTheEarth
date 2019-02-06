function laser(x1,y1,x2,y2,velocity){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.velocity = velocity;
	this.counter =0;
	this.toDelete=false;

	this.validPoints = function(x1, y1, x2, y2) {
	    var slope = (y2 - y1) / (x2 - x1);
	    return function (x, y) {
		return (y - y1) >= slope * (x - x1);
	    }
	}

	this.hits = function(ennemy){
		var isValid = this.validPoints(this.x1,this.y1,this.x2,this.y2);	
		if(isValid(ennemy.x,ennemy.y)){
			return true;
		}else return false;

        }

	this.show = function(){
		stroke(255);
		line(this.x1,this.y1,this.x2,this.y2);
	}

	this.move = function(){
		this.y1+=velocity;
		this.y2+=velocity;
		
	}
	this.dead = function(){
		this.toDelete = true;
	}

}



