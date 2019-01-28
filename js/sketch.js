var player;
var score;
var bullets = [];
var ennemies = [];
var counter = 0;
var level =0;
var difficulty = 1;
var start = false;
var basicVolume = 0.05;
var lvlupcalled = true;

function preload(){
	soundFormats('mp3', 'ogg');
	mySoundSFX = loadSound('sound/main.ogg');
	lazerSFX = loadSound('sound/lazer.ogg');
	crashSFX = loadSound('sound/crash.ogg');
	lvlupSFX = loadSound('sound/lvlup.ogg');
}



function setup(){
	createCanvas(640,480);
	player = new player();
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

function draw(){
	background(150);
	//SCORE
	if (start){
		textSize(10);
		textStyle(BOLD);
		fill('green');
		text('Score : '+score.toString(), 10, 15);
		text('Level : '+(level+1).toString(), 10, 30);
		noFill();
		//
		
		//SOUND
		fill('green');
		text('SOUND on/off', 595,15);
		noFill();
			

		//
		
		if(score%300==0 && score !=0 ){
			levelup();
			level = score /1000;
			difficulty = level;
			if(lvlupcalled){
				lvlupSFX.play();
				lvlupcalled = false;
			}
		}else {lvlupcalled = true; }
		

		mouvement();
		player.show();

		for(var i=0; i<ennemies.length;i++){
			ennemies[i].show();
			ennemies[i].move();
		}
		for(var i=0; i<bullets.length;i++){
			bullets[i].show();
			bullets[i].move();
		}

		
		
		if(counter%100-10 == 0){
			var e = new ennemy(difficulty);
			ennemies.push(e);
		}

		for(var i=0;i<bullets.length;i++){
			for(var e =0; e<ennemies.length;e++){
				if(bullets[i].hits(ennemies[e])){
					crashSFX.play();
					bullets[i].dead();
					ennemies[e].dead();
					score+=100;
				}
			}
		}
		
		
		for(var i= ennemies.length-1; i>=0;i--){
			if(ennemies[i].y>=height){
				alert ("GAME OVER. Score : "+score.toString() +" Level : "+level.toString());
				location.reload();
			}
			if (ennemies[i].toDelete || ennemies[i].y>=height) { ennemies.splice(i,1); }
		}
		for(var i=bullets.length-1 ; i>=0 ; i--){
			if (bullets[i].toDelete || bullets[i].y < 0 ||
				bullets[i].x<0 || bullets[i].x>width) { bullets.splice(i,1); }
		}
		counter ++;
	}
	else{
		startScreen();
	}
}



var startScreen = function(){
	fill('green');
	rect(width/2-70,height/2-100,100,50);
	textSize(20);
	fill('red');
	textStyle(BOLD);
	text("START",width/2-50,height/2-70);	
}

function mouseClicked(){
	if(!start && mouseX>width/2-70 && mouseX<width/2+70 && mouseY>height/2-100 && mouseY<height/2-50) {
			start = true;
			mySoundSFX.play();
	}
	if(mouseX>595 && mouseX<640 && mouseY>0 && mouseY<15){
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
		if(level>=1){
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
		}
	}
}

