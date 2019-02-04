// THE WELCOME SCREEN ////////////////////////////////////////////
var startScreen = function(){
        fill('green');
        drawRect("start",(smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
        textSize(20);
        fill('red');
        textStyle(BOLD);
        text("START",(smallX+smallW)/2+15,(smallY+smallH)/2-10);
}
/////////////////////////////////////////////


// THE GAME OVER SCREEN
//
//
//
// TODO
//
//
// //////
//

//Create Both screens //

var createScreens = function(){
        background(150);
        fill('black');
        drawRect("smallRectangle",smallX,smallY,smallW,smallH);
}

