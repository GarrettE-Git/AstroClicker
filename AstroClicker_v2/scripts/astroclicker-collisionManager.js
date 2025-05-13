//use 'player' var
let allObjs = document.querySelectorAll(".obj");

//Check every seciond for a collision between all objs on screen and player
try {

  setInterval(function(){
    
    allObjs = document.querySelectorAll(".obj");

    allObjs.forEach(collisionObj => {
        let colliderOne = collisionObj.getBoundingClientRect();
        let colliderTwo = player.getBoundingClientRect();
    
        // Check collisions on X and Y axis
        let xOverlap = colliderOne.left < colliderTwo.right && colliderOne.right > colliderTwo.left;
        let yOverlap = colliderOne.top < colliderTwo.bottom && colliderOne.bottom > colliderTwo.top;
        
        if(xOverlap && yOverlap){
            //true
            if(player.classList)
            //player.classList.add("player-hit");
            player.animate([
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle - 1}deg)` },
                { transform: `rotate(${angle + 1}deg)` },
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle + 1}deg)` },
                { transform: `rotate(${angle - 1}deg)` },
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle - 1}deg)` },
                { transform: `rotate(${angle + 1}deg)` },
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle - 1}deg)` }
              ], {
                duration: 700,
              });
              if(invincible === false){
                health.value = Number(health.value) - 1;
                if(health.value <= 0){
                    //You Died
                    deathModal.style.display = "block";
                }
              }
        }
        else{
            player.classList.toggle("player-hit");
            return; //false
        }
    
    });


  }, 1000)
  
} catch (error) {
  alert(genericError);
}


