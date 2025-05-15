//randomInt
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let asteroidInterval = getRandomInt(3, 7) * 1000;
let smPlanetInterval = getRandomInt(20, 40) * 1000;
let mdPlanetInterval = getRandomInt(40, 70) * 1000;
let lgPlanetInterval = getRandomInt(60, 100) * 1000;

function startAnimations() {


    let objsBG = document.getElementById("objsBG");

    //---------------------------//
    //----- STAR LAYERS --------//
    //--------------------------//

    //Are star animations on in settings?
    if (!document.documentElement.classList.contains("stars-off")) {

        function starsFar() {
            let e = document.createElement("div");
            e.setAttribute("class", "starFar");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";

            setTimeout(function () {
                objsBG.removeChild(e);
            }, 30000)
        }

        setInterval(function () {
            starsFar();
        }, 500)

        //------------------------------//

        //Generate Close Star Layer
        function starsClose() {
            let e = document.createElement("div");
            e.setAttribute("class", "starClose");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";

            setTimeout(function () {
                objsBG.removeChild(e);
            }, 20000)
        }

        setInterval(function () {
            starsClose();
        }, 1000)

    }


    //---------------------------//
    //------ OBJ LAYERS --------//
    //--------------------------//

    //------------------------------------------Generate Asteroids-------------------------------------------//

    function asteroids() {

        //reset interval to new random num
        asteroidInterval = getRandomInt(3, 7) * 1000;
        let objAriaName = "Asteroid ";
        let objExp = 1; //default G1
        let objDestroyBonus = 0; //default G1

        //Create element
        let e = document.createElement("button");
        if(altGameMode === false){
            e.setAttribute("class", "asteroid obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
        }
        else{
            e.setAttribute("class", "asteroid altGM obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
            e.style.top = Math.random() * + innerHeight + "px";
        }
        //Assign random generated points
        let clickerInt;
        //G1
        if (document.documentElement.classList.contains("G1")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G2
        else if (document.documentElement.classList.contains("G2")) {
            clickerInt = getRandomInt(10, 30);
        }
        //reevaluate numbers for game balance - test values only
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(40, 80);
        }
        //G4
        else if (document.documentElement.classList.contains("G4")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G5
        else if (document.documentElement.classList.contains("G5")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G6
        else if (document.documentElement.classList.contains("G6")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G7
        else if (document.documentElement.classList.contains("G7")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G8
        /*else if(document.documentElement.classList.contains("G8")){
            clickerInt = getRandomInt(1, 10);
        }*/
        else {
            clickerInt = getRandomInt(1, 10); //If galaxy key cannot be found, set to default value
        }

        //Create the visual number
        createVisualNumber(e, objAriaName, objDestroyBonus, objExp, clickerInt);



        setTimeout(function () {
            objsBG.removeChild(e);
        }, 20000) //Timeout - must be length of objects falling animation
    }

    setInterval(function () {
        asteroids();
    }, asteroidInterval)//Frequency
    //------------------------------------------Generate Asteroids - END--------------------------------------------//

    //------------------------------------------Generate Sm Planet-------------------------------------------//
    function smPlanet() {

        //reset interval to new random num
        smPlanetInterval = getRandomInt(20, 40) * 1000;
        let objAriaName = "Small Planet ";
        let objExp = 2; //default G1
        let objDestroyBonus = 3; //default G1

        //Create element
        let e = document.createElement("button");
        if(altGameMode === false){
            e.setAttribute("class", "sm-planet obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
        }
        else{
            e.setAttribute("class", "sm-planet altGM obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
            e.style.top = Math.random() * + innerHeight + "px";
        }
        //Assign random generated points
        let clickerInt;
        //G1
        if (document.documentElement.classList.contains("G1")) {
            clickerInt = getRandomInt(10, 20);
        }
        //G2
        else if (document.documentElement.classList.contains("G2")) {
            clickerInt = getRandomInt(30, 60);
        }
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(80, 120);
        }
        //reevaluate numbers for game balance - test values only
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(40, 80);
        }
        //G4
        else if (document.documentElement.classList.contains("G4")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G5
        else if (document.documentElement.classList.contains("G5")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G6
        else if (document.documentElement.classList.contains("G6")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G7
        else if (document.documentElement.classList.contains("G7")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G8
        /*else if(document.documentElement.classList.contains("G8")){
            clickerInt = getRandomInt(1, 10);
        }*/
        else {
            clickerInt = getRandomInt(1, 10); //If galaxy key cannot be found, set to default value
        }

        //Create the visual number
        createVisualNumber(e, objAriaName, objDestroyBonus, objExp, clickerInt);



        setTimeout(function () {
            objsBG.removeChild(e);
        }, 30000) //Timeout - must be length of objects falling animation
    }

    setInterval(function () {
        smPlanet();
    }, smPlanetInterval)//Frequency
    //------------------------------------------Generate Sm Planet - END--------------------------------------------//


    //------------------------------------------Generate Md Planet-------------------------------------------//
    function mdPlanet() {

        //reset interval to new random num
        mdPlanetInterval = getRandomInt(40, 70) * 1000;
        let objAriaName = "Medium Planet ";
        let objExp = 3; //default G1
        let objDestroyBonus = 5; //default G1

        //Create element
        let e = document.createElement("button");
        if(altGameMode === false){
            e.setAttribute("class", "md-planet obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
        }
        else{
            e.setAttribute("class", "md-planet altGM obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
            e.style.top = Math.random() * + innerHeight + "px";
        }
        //Assign random generated points
        let clickerInt;
        //G1
        if (document.documentElement.classList.contains("G1")) {
            clickerInt = getRandomInt(20, 40);
        }
        //G2
        else if (document.documentElement.classList.contains("G2")) {
            clickerInt = getRandomInt(60, 90);
        }
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(110, 160);
        }
        //reevaluate numbers for game balance - test values only
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(40, 80);
        }
        //G4
        else if (document.documentElement.classList.contains("G4")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G5
        else if (document.documentElement.classList.contains("G5")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G6
        else if (document.documentElement.classList.contains("G6")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G7
        else if (document.documentElement.classList.contains("G7")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G8
        /*else if(document.documentElement.classList.contains("G8")){
            clickerInt = getRandomInt(1, 10);
        }*/
        else {
            clickerInt = getRandomInt(1, 10); //If galaxy key cannot be found, set to default value
        }

        //Create the visual number
        createVisualNumber(e, objAriaName, objDestroyBonus, objExp, clickerInt);



        setTimeout(function () {
            objsBG.removeChild(e);
        }, 40000) //Timeout - must be length of objects falling animation
    }

    setInterval(function () {
        mdPlanet();
    }, mdPlanetInterval)//Frequency
    //------------------------------------------Generate Md Planet - END--------------------------------------------//

    //------------------------------------------Generate Lg Planet-------------------------------------------//
    function lgPlanet() {

        //reset interval to new random num
        lgPlanetInterval = getRandomInt(60, 100) * 1000;
        let objAriaName = "Large Planet ";
        let objExp = 5; //default G1
        let objDestroyBonus = 8; //default G1

        //Create element
        let e = document.createElement("button");
        if(altGameMode === false){
            e.setAttribute("class", "lg-planet obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
        }
        else{
            e.setAttribute("class", "lg-planet altGM obj clicker-box");
            objsBG.appendChild(e);
            e.style.left = Math.random() * + innerWidth + "px";
            e.style.top = Math.random() * + innerHeight + "px";
        }
        //Assign random generated points
        let clickerInt;
        //G1
        if (document.documentElement.classList.contains("G1")) {
            clickerInt = getRandomInt(40, 60);
        }
        //G2
        else if (document.documentElement.classList.contains("G2")) {
            clickerInt = getRandomInt(90, 120);
        }
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(180, 230);
        }
        //reevaluate numbers for game balance - test values only
        //G3
        else if (document.documentElement.classList.contains("G3")) {
            clickerInt = getRandomInt(40, 80);
        }
        //G4
        else if (document.documentElement.classList.contains("G4")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G5
        else if (document.documentElement.classList.contains("G5")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G6
        else if (document.documentElement.classList.contains("G6")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G7
        else if (document.documentElement.classList.contains("G7")) {
            clickerInt = getRandomInt(1, 10);
        }
        //G8
        /*else if(document.documentElement.classList.contains("G8")){
            clickerInt = getRandomInt(1, 10);
        }*/
        else {
            clickerInt = getRandomInt(1, 10); //If galaxy key cannot be found, set to default value
        }

        //Create the visual number
        createVisualNumber(e, objAriaName, objDestroyBonus, objExp, clickerInt);



        setTimeout(function () {
            objsBG.removeChild(e);
        }, 50000) //Timeout - must be length of objects falling animation
    }

    setInterval(function () {
        lgPlanet();
    }, lgPlanetInterval)//Frequency
    //------------------------------------------Generate Lg Planet - END--------------------------------------------//



    //------------------------------//
    //------- Visual Number  --------//
    //------------------------------//


    function createVisualNumber(e, objAriaName, objDestroyBonus, objExp, clickerInt) {

        //create the visual element
        let clickerNum = document.createElement("p");
        clickerNum.ariaHidden = "true";
        clickerNum.setAttribute("class", "clicker-num");
        e.appendChild(clickerNum);
        e.ariaLabel = objAriaName + clickerInt;
        clickerNum.innerHTML = clickerInt;

        //show number on hover
        e.addEventListener('focus', function () {
            clickerNum.style.visibility = "visible";
        });

        //give player points per click
        e.onclick = function () {
            let playerClicks = 1 + bonusClicks;
            if (clickerInt <= playerClicks) {
                objsBG.removeChild(e);
                score.value = Number(score.value) + 1 + objDestroyBonus;
                exp.value = Number(exp.value) + objExp;
                if (exp.value >= exp.max) {
                    exp.value = 0;
                    lvl.value = Number(lvl.value) + 1;
                    exp.max *= 2;
                }
            }
            else {
                clickerInt = clickerInt - playerClicks;
                clickerNum.innerHTML = clickerInt;
                score.value = Number(score.value) + 1 + bonusClicks;
                e.ariaLabel = objAriaName + clickerInt;
            }
        }
    }
}