var player;
var playerSize =20; //Standard size = 20


var score;
var bullets = [];
var ennemies = [];
var counter = 0;
var level =0;
var difficulty = 1;
var start = false;
var basicVolume = 0.1;
var lvlupcalled = true;
var playerWasHit = false;

var smallW;
var smallH;
var smallX;
var smallY;

var rectangleObjects = [];

function preload(){
	soundFormats('mp3', 'ogg');
	mySoundSFX = loadSound('sound/main.ogg');
	lazerSFX = loadSound('sound/lazer.ogg');
	crashSFX = loadSound('sound/crash.ogg');
	lvlupSFX = loadSound('sound/lvlup.ogg');
}



function setup(){
	//createCanvas(640,480);
	createCanvas(820,540);
	smallW = 640;
	smallH = 480;
	smallX = (width-smallW+20)/2;
	smallY = (height-smallH)/2;

	
	
	player = new player // X,Y, spd,LimitLeft,LimitRight,Size
	( 
		(smallW/2)+smallX ,
		smallH+30,
		6,
		smallX+playerSize,
		smallX+smallW-playerSize,
		playerSize 
	);

	score = 0;
	mySoundSFX.setVolume(basicVolume);
	mySoundSFX.onended(soundDone);

	lazerSFX.setVolume(basicVolume);
	crashSFX.setVolume(basicVolume);
	lvlupSFX.setVolume(basicVolume);
}

var soundDone = function(){
	mySoundSFX.playMode('restart');
  	mySoundSFX.setVolume(basicVolume);
	mySoundSFX.play();
	
}

var drawRect = function(id,x,y,width,height){
	rectangle = {
		xd : x,
		yd : y,
		xf : x+width,
		yf : y+height,
	}
	strokeWeight(2);
        stroke(51);
	rect(x,y,width,height);
	noStroke();
	rectangleObjects[id] =  rectangle;

}
function draw(){
	background(150);
	fill('black');
	drawRect("smallRectangle",smallX,smallY,smallW,smallH);
	//SCORE
	if (start){
		fill('black');
		drawRect("scores",5,5,90,30);
		textSize(10);
		textStyle(BOLD);
		fill('green');
		text('Score : '+score.toString(), 10, 15);
		text('Level : '+(level+1).toString(), 10, 30);
		noFill();
		//
		fill('black');
		drawRect("sound",715,10,95,15);
		//SOUND
		fill('green');
		text('SOUND ON/OFF',720 ,20);
		noFill();
		//
		
		if(score%1000==0 && score !=0 ){
			levelup();
			level = score /1000;
			difficulty = level;
			if(lvlupcalled){
				lvlupSFX.play();
				lvlupcalled = false;
				player.hp++;
			}
		}else {lvlupcalled = true; }
		
		
		//PLAYER
		mouvement();
		player.show();
		fill('black');
		drawRect("playerHP",10,60,75,25);
		textSize(20);
		fill('green');
		text('HP : '+player.hp.toString() ,10 ,80);
		//
		for(var i=0; i<ennemies.length;i++){
			var e = ennemies[i]
			e.show();
			e.move();
		}
		for(var i=0; i<bullets.length;i++){
			var b = bullets[i];
			b.show();
			b.move();
		}

		
		
		if(counter%100-10 == 0){
			var e = new ennemy(difficulty);
			ennemies.push(e);
		}

		for(var i=0;i<bullets.length;i++){
			var b = bullets[i];
			for(var e =0; e<ennemies.length;e++){
				var e = ennemies[e];
				if(b.hits(e)){
					crashSFX.play();
					b.dead();
					e.dead();
					score+=100;
				}
			}
		}
		
		for(var i= ennemies.length-1; i>=0;i--){
			var e = ennemies[i];
			if(e.y-e.r>=smallH+smallY){
				playerWasHit = true;
				e.dead();
			}
			if (e.toDelete) { ennemies.splice(i,1); }
		}

		for(var i=bullets.length-1 ; i>=0 ; i--){
			var b = bullets[i];
			if (b.toDelete || b.y < 30 || b.x<smallX || b.x>smallW+smallX) 
			{ 
				bullets.splice(i,1); 
			}
		}
		counter ++;
	}
	else{
		startScreen();
	}

	if(playerWasHit) {
		player.hp--;
		playerWasHit = false;
	}
	if(player.hp == 0){
		alert ("GAME OVER. Score : "+score.toString() +" Level : "+(level+1).toString());
		location.reload();
	}
}



var startScreen = function(){
	fill('green');
	drawRect("start",(smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
	textSize(20);
	fill('red');
	textStyle(BOLD);
	text("START",(smallX+smallW)/2+15,(smallY+smallH)/2-10);	
}

var isRectClicked = function(name){
	var r = rectangleObjects[name];
	mx = mouseX;
	my = mouseY;
	return (mx> r.xd &&  mx < r.xf && my>r.yd && my<r.yf);
}

function mouseClicked(){
	if(!start && isRectClicked('start') ) {
			start = true;
			mySoundSFX.play();
	}
	if(isRectClicked('sound')){
		if(basicVolume > 0 ){
			basicVolume = 0;
			mySoundSFX.setVolume(basicVolume);
		}else{
			basicVolume = 0.1;
			mySoundSFX.setVolume(basicVolume);
		}
	}
}


var levelup = function(){
	textSize(50);0
	textStyle(BOLD);
	fill('green');
	text('LEVEL UP', width/2-120, height/2-50);
}


function mouvement(){
	if (keyIsDown(RIGHT_ARROW)){
		player.move(1);
	}if(keyIsDown(LEFT_ARROW)){
		player.move(-1);
	}
}

function keyPressed(){
	if(key == ' '){
		lazerSFX.play();
		var b = new bullet(player.x,player.y-15,0,-5);
		bullets.push(b);
		/* if(level>=1){
			var b1 = new bullet(player.x,player.y-15,-1,-4);
			bullets.push(b1);
		}
		if(level>=2){
			var b2 = new bullet(player.x,player.y-15,1,-4);
			bullets.push(b2);
		}
		if(level>=3){
			var b3 = new bullet(player.x,player.y,-3,-4);
			bullets.push(b3);
		}
		if(level>=4){
			var b4 = new bullet(player.x,player.y,3,-4);
			bullets.push(b4);
		}*/
	}
}

