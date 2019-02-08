// THE WELCOME SCREEN ////////////////////////////////////////////
var startScreen = function(){
        fill('green');
        drawRect( (smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
        textSize(20);
        fill('red');
        textStyle(BOLD);
        text("START",(smallX+smallW)/2+15,(smallY+smallH)/2-10);
	textStyle(BOLD);
        fill('green');
        textSize(50);
        text("DEFEND THE EARTH", (smallX+smallW)/2-230,(smallY+smallH)/4,(smallX+smallW)/2+230,(smallY+smallH)/4+50);

}

// GAME OVER SCREEB
var gameOverScreen = function(){
        textSize(60);
        fill('red');
        textStyle(BOLD);
        text("GAME OVER",(smallX+smallW)/2-150,(smallY+smallH)/2-50);
	textSize(20);
        fill('grey');
        drawRect( 
		(smallX+smallW)/2,
		(smallY+smallH)/2-40,
		100,
		50
	);
	fill('red');
	text("RESTART",(smallX+smallW)/2,(smallY+smallH)/20+220);
}

//Create Both screens //

var createScreens = function(){
        background(150);
        fill('black');
        drawRect(smallX,smallY,smallW,smallH);
}

