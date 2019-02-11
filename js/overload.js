// THE AUTOMATICAL DISCHARGE FUNCTION
var autoDischarge = function(){
        if(counterFrame % oneSec==0 && discharged==0 && surchargedShot<10  && play) {
                shootAllow = true;
                surchargedShot--;
                startDiscount = true;
        }
}
/// WHAT TO DO IF PLAYER HITS OVERLOAD STATUS
var whenIsOverload = function(){
        if( counterFrame% oneSec == 0 && surchargedShot ==10 && startDiscount){
                discharged = 150;
                startDiscount = false;
                overloadSFX.setVolume(basicVolume);
                overloadSFX.play();
        }
        if(discharged >0 && play) {
                shootAllow = false;
                discharged--;
                if(discharged == 0) surchargedShot = 5;
        }
}

