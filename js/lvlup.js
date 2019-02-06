/// HOW TO KNOW WHEN TO LEVEL UP
//
var levelUP = function(){
        if(score%1000==0 && score !=0 ){
                levelup();
                level = score /1000;
                difficulty = level;
                if(lvlupcalled){
                        lvlupSFX.play();
			allowToUlt=true;
                        lvlupcalled = false;
                        player.hp++;
                        if(player.hp == 99 ) player.hp = 99;
                }
        }else {lvlupcalled = true; }
}


