// CREATE THE ENNEMIES //

var createEnnemy = function(){
        //Basic ennemy
        if(counterFrame%100 == 0){
                var e = new ennemy(difficulty,'red');
                ennemies.push(e);
        }
}


