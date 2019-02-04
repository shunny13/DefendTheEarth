//FUNCTION NCESSARY TO INITIALISE A TABLE IN ORDER TO CONSTRUCT THE SURCHARGE
var createSurchargeBar = function(){
        if(surcharge.length  == 0){
                sur = rectangleObjects['overload'];
                for(var i = sur.yd;i< sur.yf;i+=20){
                        var left = true;
                        for(var l=0;l<=1;l++){
                                var toPush=[];
                                if(left){
                                        toPush.push(sur.xd);
                                }else{
                                        toPush.push( (sur.xf-sur.xd)/2 + sur.xd);
                                }
                                left = !left;
                                toPush.push(i);
                                toPush.push(15);
                                toPush.push(20);
                                surcharge.push(toPush);
                        }
                }
        }
        surcharge.reverse();
}

// RENDER OVERLOAD SQUARES
var renderOverloadSquares = function(){
        for (var i=0 ; i<surchargedShot;i++){
                var sur = surcharge[i];
                rect(sur[0],sur[1],sur[2],sur[3]);
        }
}
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

