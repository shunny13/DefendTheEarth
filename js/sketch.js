//VARIABLES FOR THE PLAYER
var player;
var playerSize =20; //Standard size = 20
var playerSpd = 6; //Standard Speed = 6
var shootAllow = true;
//VARIABLES FOR HUD
var score;
var counterFrame = 0;
var level =0;
var difficulty = 1;
var rectangleObjects = [];
let playBtn;
let pauseBtn;
var play=true;
var surchargedShot =1;
var discharged=0;
var startDiscount = false;
//VARIABLE TO UTILISE IN GAME OBJECTS
var bullets = [];
var ennemies = [];
var ennemies_speed=[];
//VARIABLES FOR THE BACKGROUND USE
var start = false;
var gameOver = false;

var basicVolume = 0.1;
var lvlupcalled = true;
var playerWasHit = false;
//VARIABLES FOR THE SMALL SCREEN
var smallW;
var smallH;
var smallX;
var smallY;

//ULT
var ulti = [];
var chargesToUlt=0;
var counterUlts=0;
// SOUND OBJECT
var playList = {
	mySoundSFX : 'sound/main.ogg',
	lazerSFX :'sound/lazer.ogg',
	crashSFX :'sound/crash.ogg',
	lvlupSFX : 'sound/lvlup.ogg',
	overloadSFX : 'sound/overload.ogg'
};

// IMAGES OBJECT
var imgList = {
	playBtn : 'img/Button-Play-icon.png',
	pauseBtn : 'img/Button-Pause-icon.png',
	spritePlayer :'img/sprite-player.png',
	asteroid1 :'img/sprite-asteroid1.png',
	asteroid2 :'img/sprite-asteroid2.png'
};

var oneSec = 50; // FPS
//BUFFERS FOR DIFFERENT FILES sound, img
function preload(){
	// LOADING THE SOUNDS
	soundFormats('mp3', 'ogg');
	mySoundSFX = loadSound(playList.mySoundSFX); 
	lazerSFX =  loadSound(playList.lazerSFX); 
	crashSFX = loadSound(playList.crashSFX); 
	lvlupSFX = loadSound(playList.lvlupSFX); 
	overloadSFX = loadSound(playList.overloadSFX); 

	//LOADING THE IMAGES
	playBtn = loadImage(imgList.playBtn);
	pauseBtn = loadImage(imgList.pauseBtn);
	spritePlayer = loadImage(imgList.spritePlayer);
	asteroid1 = loadImage(imgList.asteroid1);
	asteroid2 = loadImage(imgList.asteroid2);


}

//MAKES THE INITIAL SETUP
function setup(){
	frameRate(oneSec);	
	//THE MAIN CANVAS
	createCanvas(820,540);

	//THE SMALLER SCREEN
	smallW = 640;
	smallH = 480;
	smallX = (width-smallW+20)/2;
	smallY = (height-smallH)/2;
	//CREATION OF THE PLAYER	
	player = new player // X,Y, spd,LimitLeft,LimitRight,Size
        (
                (smallW/2)+smallX ,
                smallH+30,
                playerSpd,
                smallX+playerSize,
                smallX+smallW-playerSize,
                playerSize,
                spritePlayer
        );
	//INITIALIZING THE SCORE
	score = 0;
	//INITIALIZING THE SOUNDS iN THE GAME
	mySoundSFX.setVolume(basicVolume);
	mySoundSFX.onended(soundDone);
	lazerSFX.setVolume(basicVolume);
	crashSFX.setVolume(basicVolume);
	lvlupSFX.setVolume(basicVolume);
	rectangleObjects['start'] = {
		xd:(smallX+smallW)/2,
		yd:(smallY+smallH)/2-40,
		xf:(smallX+smallW)/2+100,
		yf:( (smallY+smallH)/2-40 ) +50
	};
	// xd : x depart, xf : x final (arrivé)
	rectangleObjects['gameOver'] ={
		xd : (smallX+smallW)/2+10,
		yd : (smallY+smallH)/2-25,
		xf : (smallX+smallW)/2+110,
		yd : (smallY+smallH)/2,
	};
}

// THE DRAWING FUNCTION A.K.A GAME ENGINE
function draw(){
	createScreens();
	if (start){
		
		//RENDER SCORE AND LEVEL ///////////////////////////////
		scoreAndLevel();
		///RENDER SOUND //////////////////////////////////////////
		mySoundSFX.setVolume(basicVolume);
		soundRender();
		///////////////////////////////////////////////////
		//PLAY AND PAUSE THE GAME//////////////////////////////////////////
		playAndPause();
		//////////////////////////////////////////////
		// LEVEL UP /////////////////////////////////
		levelUP();
		//////////////////////////////////////////////
		//PLAYER RENDER/////////////////////////////
		renderPlayer();
		renderLaser();
		////////////////////////////////////////////
		//RENDER THE HP ///////////////////////////
		hpRender();
		///////////////////////////////////////////
		//DRAW THE OVERLOAD BAR
		//createSurchargeBar();	
		////////////
		//RENDER THE ULT
		ultRender();
		//CREATE AN ENNEMY ///////////////////////	
		createEnnemy();
		////////////////////////////////////////////
		// CREATE AND RENDER THE OVERCHARGE BAR /////////
		drawOverchargeBar();
		// ADD FUNCTION FOR OVERLOAD 
		whenIsOverload();
		if(surchargedShot >10) surchargedShot = 10;

		// AUTOMATICALY DISCHARGING IF THE PLAYER IS NOT OVERLOADED
		autoDischarge();
		if(surchargedShot<0) surchargedShot = 0;
		

		//RENDER THE ENNEMIES ///////////////////////
		renderEnnemies();
		/////////////////////////////////////////////
		//RENDER THE BULLETS////////////////////////
		renderBullets();
		/////////////////////////////////////////////
		//CHECKING FOR COLLISION BULLET ENNEMY //////
		checkCollision();
		/////////////////////////////////////////////
		//CHECKING IF THE ENNEMY WENT PAST THE PLAYER ///
		didEnnemyPastScreen();
		/////////////////////////////////////////////
		//DELETING BULLETS IF THEY GO OFF THE SCREEN////
		didBulletsPastScreen();
		///DELETE LASER THAT PASSES SCREEN
		didLaserPastScreen();
		/////////////////////////////////////////////
		// INCREMENTING THE COUNTER OF FRAMES
		counterFrame ++;
		//HOW MANY CHARGES TO ULT
		if(chargesToUlt == 1000){
			counterUlts++;
			chargesToUlt = 0;
		}
		/////////////////// END OF if(start) /////////////////////////
		
	}
	else if(gameOver){
		gameOverScreen();
	}
	else {
		startScreen();
	}
	// EVENTS IF PLAYER GETS HIT /////////////////////
	isPlayerHit();
	/////////////////////////////////////////////
	// EVENT IF THE PLAYER HAS NO MORE LIFE POINTS /////////////////
	isPlayerDead();

}
/////////////////////// END OF DRAW //////////////////////

//THE ANIMATION
var Animation = function(frame_set,delay){
	this.count =0;
	this.delay = delay;
	this.frame = 0;
	this.frame_index = 0;
	this.frame_set = frame_set;
};




//IF THE MAIN THEME SOUND IS OVER, RESTART IT
var soundDone = function(){
        mySoundSFX.playMode('restart');
        mySoundSFX.setVolume(basicVolume);
        mySoundSFX.play();

}
// THE MOUVEMENT OF THE PLAYER //////////////
function mouvement(){
        if (keyIsDown(RIGHT_ARROW)){
                player.move(1);
        }if(keyIsDown(LEFT_ARROW)){
                player.move(-1);
        }
}

//////////////////////////////////////////////


/////////////////////////////////////////////
// ALLOWS TO EASLY DRAW A RECTANGLE AND ADD ITS PRORIETIES TO A LIT
// IN ORDER TO MAKE CLICKABLE EVENTS ON THEM
var drawRect = function(x,y,width,height){
        strokeWeight(2);
        stroke(51);
        rect(x,y,width,height);
        noStroke();
}
//////////////////////////////////////////////

	
// HELPS TO CHECK IF THE MOUSE CLICKED ON AN IMPORTANT OPTION /////
var isRectClicked = function(name){
	if(rectangleObjects[name]){
        	r = rectangleObjects[name];
        	mx = mouseX;
		my = mouseY;
		return (mx> r.xd &&  mx < r.xf && my>r.yd && my<r.yf);
	}
}

/////////////////////////////////////////////

//CHECKING IF THE MOUSE CLICKS ON IMPORTANT OPTION, start, sound etc////
function mouseClicked(){
        if(!start && !gameOver &&  isRectClicked('start') ) {
		start = true;
		gameOver = false;
		mySoundSFX.play();
        }
	if( gameOver){ 
		initialiseGame();
		gameOver = false;
		start = false;
	}

        if(isRectClicked('sound')){
                if(basicVolume > 0 ){
                        basicVolume = 0;
                }else{
                        basicVolume = 0.1;
                }
        }
}
/////////////////////////////////////////////


// LISTENS TO ALL THE KEY PRESSED AND ACTIVATES DIFFERENT EVENTS ///////
function keyPressed(){
        if(key == ' ' && shootAllow ){
                surchargedShot++;
                lazerSFX.play();
                var b = new bullet(player.x+3,player.y-35,0,-5);
                bullets.push(b);
        }
	else if(key =='p') {
                play= !play;
        }
	else if(key =='m'){
                if(basicVolume > 0 ){
                        basicVolume = 0;
                }
		else basicVolume=0.1;
        }
	else if(key=='r' && counterUlts > 0){
		var l = new laser
	      	(
                	smallX,
                	smallH,
                	smallW+smallX,
                	smallH,
			-3
        	);
		ulti.push(l);
		counterUlts--;


		
	}
}
//////////////////////////////////////////////

//////////////////////////////////////////////
///WHEN YOU PRESS PAUSE (p) WHAT HAPPENS ///////////////
var playAndPause = function(){
        if(!play){
                shootAllow = false;
                image(pauseBtn, 760,40);
                player.speed = 0;
                for(var i=0;i<ennemies.length;i++){
                        ennemies_speed.push(ennemies[i].spd);
                        ennemies[i].spd =0;
                }
        }
        else{
                shootAllow = true;
                image(playBtn, 760,40);
                player.speed = playerSpd;
                if(ennemies_speed.length!=0){
                        for(var i=0;i<ennemies.length;i++){
                                ennemies[i].spd = ennemies_speed[i];
                        }
                        ennemies_speed=[];
                }
        }
}
                //////////////////////////////////////////////

//RENDER SOUND ///

var renderLaser = function(){
	for(var u=0;u<ulti.length;u++){
		ulti[u].move();
        	ulti[u].show();
	}
}

var initialiseGame = function(){
	ennemies = [];
	bullets = [];
	
	score = 0;
	
	surchargedShot = 0;
	discharged = 0;
	
	chargesToUlt=0;
	counterUlts=0;
	player.recreate();
	player.hp = 3;
}
