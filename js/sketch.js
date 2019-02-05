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
var surcharge = [];
var surchargedShot = -1;
var discharged=0;
var startDiscount = false;
//VARIABLE TO UTILISE IN GAME OBJECTS
var bullets = [];
var ennemies = [];
var ennemies_speed=[];
//VARIABLES FOR THE BACKGROUND USE
var start = false;
var basicVolume = 0.1;
var lvlupcalled = true;
var playerWasHit = false;
//VARIABLES FOR THE SMALL SCREEN
var smallW;
var smallH;
var smallX;
var smallY;

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
	rectangleObjects['overload'] = {
		xd:35,
		yd:125,
		xf:65,
		yf:225
	};
	//CREATE THE TABLE NECESSARY TO CONTRUCT THE SURCHARGE BAR
	createSurchargeBar();	
	
}

// THE DRAWING FUNCTION A.K.A GAME ENGINE
function draw(){
	createScreens();
	if (start){
		//RENDER SCORE AND LEVEL ///////////////////////////////
		scoreAndLevel();
		//RENDER SOUND //////////////////////////////////////////
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
		////////////////////////////////////////////
		//RENDER THE HP ///////////////////////////
		hpRender();
		///////////////////////////////////////////
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
		
		// RENDER THE LITTLE RED BLOCKS
		renderOverloadSquares();
		
		// /////////////////////////////////////////

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
		/////////////////////////////////////////////
		// INCREMENTING THE COUNTER OF FRAMES
		counterFrame ++;
		/////////////////// END OF if(start) /////////////////////////
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
//CHECKING IF THE MOUSE CLICKS ON IMPORTANT OPTION, start, sound etc////
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
//////////////////////////////////////////////

	
// HELPS TO CHECK IF THE MOUSE CLICKED ON AN IMPORTANT OPTION /////
var isRectClicked = function(name){
        r = rectangleObjects[name];
        mx = mouseX;
        my = mouseY;
        return (mx> r.xd &&  mx < r.xf && my>r.yd && my<r.yf);
}

/////////////////////////////////////////////

//CHECKING IF THE MOUSE CLICKS ON IMPORTANT OPTION, start, sound etc////
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
/////////////////////////////////////////////


// LISTENS TO ALL THE KEY PRESSED AND ACTIVATES DIFFERENT EVENTS ///////
function keyPressed(){
        if(key == ' ' && shootAllow ){
                surchargedShot++;
                lazerSFX.play();
                var b = new bullet(player.x+3,player.y-35,0,-5);
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
        if(key =='p') {
                play= !play;
        }
        if(key =='m'){
                if(basicVolume > 0 ){
                        basicVolume = 0;
                }
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

