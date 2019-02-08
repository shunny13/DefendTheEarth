// THE WELCOME SCREEN ////////////////////////////////////////////
var startScreen = function(){
        fill('green');
        drawRect( (smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
        textSize(20);
        fill('red');
        textStyle(BOLD);
        text("START",(smallX+smallW)/2+15,(smallY+smallH)/2-10);
}
// GAME OVER SCREEB
var gameOverScreen = function(){
        fill('grey');
        drawRect( (smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
        textSize(20);
        fill('red');
        textStyle(BOLD);
        text("GAME OVER",(smallX+smallW)/2+15,(smallY+smallH)/2-10);
	fill('black');
	screen = rectangleObjects['gameOver'];
	drawRect( 
		screen.xd,
		screen.yd,
		100,
		25
	);
	text("RESTART",(smallX+smallW)/2+20,(smallY+smallH)/2-30);
}

//Create Both screens //

var createScreens = function(){
        background(150);
        fill('black');
        drawRect(smallX,smallY,smallW,smallH);
}

