//---------------------------//
//----- GLOBAL VARS --------//
//--------------------------//

//Declare Player
const player = document.getElementById("player");

//Game Started?
let gameStarted = false;

//Player Score
let score = document.getElementById("score");

//Player Health
let health = document.getElementById("health");
let healthCap = 10;

//Player Buffs
let bonusClicks;

//Player Items
let arrPlayerShips = JSON.parse(sessionStorage.getItem("playerShips") || "[]");
let arrPlayerCursors = JSON.parse(sessionStorage.getItem("playerCursors") || "[]");
let arrPlayerGalaxies = JSON.parse(sessionStorage.getItem("playerGalaxies") || "[]");

//Player Stats
let statTotalClicks;
let statTotalPointsEarned;
let statPointsSpent;
let statPlayerLevel;

//Player Exp
let exp = document.getElementById("exp");

//Player Level
let lvl = document.getElementById("lvl");

//Player Angle (Mouse Tracking)
let angle = 0;

//Active Level - for Asset Pack
let activeGalaxy = "G1";

//Custom Shop for Loading
let customShopNeeded;

//Death Modal
let deathModal = document.getElementById("death-modal");

//Message Modal
let msgModal = document.getElementById("message-modal");

//Generic Error Message
let genericError = "Hmm... Something unexpected happened. Please reload the page and try again."

//---------------------------//

//When page loads
document.addEventListener('DOMContentLoaded', function () {

  //Does the player have any items in THEIR array?
  //YES
  if (arrPlayerShips != undefined && arrPlayerCursors != undefined && arrPlayerGalaxies != undefined) {
    if (arrPlayerShips.length >= 1 && arrPlayerCursors.length >= 1 && arrPlayerGalaxies.length >= 1) {
      //load THEIR items
      loadMyStuff();
      customShopNeeded = true;
    }
    else {
      //load DEFAULTS
      loadDefaultItems();
      loadMyStuff();
      customShopNeeded = false;
      
    }
  }
  //NO
  else {
    arrPlayerShips = [];
    arrPlayerCursors = [];
    arrPlayerGalaxies = [];
    //set the player array to empty.
  }

  //After loading items, loads any available save data
  loadSaveData();
});

/**---------------------------
 * ---- Load Save Data----
 ----------------------------*/
function loadSaveData() {
  //If possible, load player score and level
  let loadedScore = sessionStorage.getItem("score") || "[]";
  let loadedLevel = sessionStorage.getItem("lvl") || "[]";
  let loadedExpProgress = sessionStorage.getItem("expProgress") || "[]";
  let loadedExpMax = sessionStorage.getItem("expMax") || "[]";
  let loadedHealthVal = sessionStorage.getItem("healthVal") || "[]";
  let loadedHealthMax = sessionStorage.getItem("healthMax") || "[]";

  bonusClicks = Number(sessionStorage.getItem("cursorBonusClicks" || 0));
  if(bonusClicks == null || undefined || 0){
    bonusClicks = 0;
  }

  try {
    if (loadedScore != undefined && loadedLevel != undefined && loadedExpProgress != undefined && loadedExpMax != undefined) {
      score.value = loadedScore;
      lvl.value = loadedLevel;
      exp.max = loadedExpMax;//Load Max first to properly scale bar
      exp.value = loadedExpProgress;
      health.max = loadedHealthMax;//Load Max first to properly scale bar
      health.value = loadedHealthVal;
    }
    else {
      score.value = 0;
      lvl.value = 1;
    }
  } catch (error) {
    score.value = 0;
    lvl.value = 1;
  }
  
}

/**---------------------------
 * ---- Load My Items----
 ----------------------------*/
function loadMyStuff() {

  //Get My Stuff Menu Containers
  let myShipsContainer = document.getElementById("myships-container");
  let myCursorsContainer = document.getElementById("mycursors-container");
  let myGalaxiesContainer = document.getElementById("mygalaxies-container");

  //Populate Containers with templates
  arrPlayerShips.forEach(myShip => {
    itemMyShipsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myShip.id + '"><div class="item-card ' + myShip.type + ' ' + myShip.owned + ' ' + myShip.equipped + ' ' + myShip.rarity + '" role="button" onclick="buyItem(event)"><p class="myShip-name" style="display: none;">' + myShip.name + '</p><img class="item-img m-3" src="' + myShip.img + '" alt=""/><p class="item-name">' + myShip.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
    myShipsContainer.insertAdjacentHTML("afterbegin", itemMyShipsTemplate);
  });
  arrPlayerCursors.forEach(myCursor => {
    itemMyCursorsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myCursor.id + '"><div class="item-card ' + myCursor.type + ' ' + myCursor.owned + ' ' + myCursor.equipped + ' ' + myCursor.rarity + '" role="button" onclick="buyItem(event)"><p class="myCursor-name" style="display: none;">' + myCursor.name + '</p><img class="item-img m-3" src="' + myCursor.img + '" alt=""/><p class="item-name">' + myCursor.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
    myCursorsContainer.insertAdjacentHTML("afterbegin", itemMyCursorsTemplate);
  });
  arrPlayerGalaxies.forEach(myGalaxy => {
    itemMyGalaxiesTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myGalaxy.id + '"><div class="item-card ' + myGalaxy.type + ' ' + myGalaxy.owned + ' ' + myGalaxy.equipped + ' ' + myGalaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="myGalaxy-name" style="display: none;">' + myGalaxy.name + '</p><img class="item-img m-3" src="' + myGalaxy.img + '" alt=""/><p class="item-name">' + myGalaxy.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Travel</button><div class="equipped-tag">Current System</div></div></div>';
    myGalaxiesContainer.insertAdjacentHTML("afterbegin", itemMyGalaxiesTemplate);
  });

  //Set the visuals for the equipped items
  let EquippedShipItem = document.documentElement.querySelectorAll(".equipped.ship")[0];
  let EquippedCursorItem = document.documentElement.querySelectorAll(".equipped.cursor")[0];

  let equippedShipName = EquippedShipItem.querySelector(".myShip-name").textContent; //name
  let equippedShip = arrPlayerShips.find(ship => ship.name === equippedShipName); //arr Item from name

  let equippedCursorName = EquippedCursorItem.querySelector(".myCursor-name").textContent; //name
  let equippedCursor = arrPlayerCursors.find(cursor => cursor.name === equippedCursorName); //arr Item from name

  //update ship
  player.src = equippedShip.img

  //update cursor
  if (document.documentElement.classList.contains("disable-cursors")) {
    document.body.className = "";
    document.body.classList.add("default");
  }
  else {
    document.body.className = "";
    document.body.classList.add(equippedCursor.cssKey);
  }

};

/**---------------------------
 * ---- load Default Items----
 ----------------------------*/
function loadDefaultItems() {

  //Push default owned items to player items
  //Ships
  arrShips.forEach(myShip => {
    if (myShip.owned == "owned") {

      //Assign the item data.
      let newPlayerItem = {
        id: myShip.id,
        name: myShip.name,
        type: myShip.type,
        desc: myShip.desc,
        img: myShip.img,
        rarity: myShip.rarity,
        owned: "owned",
        equipped: myShip.equipped,
        defaultTag: false
      }

      //push to users Ship array
      arrPlayerShips.push(newPlayerItem);
      //Add corresponding user array to session storage.
      sessionStorage.setItem("playerShips", JSON.stringify(arrPlayerShips));
    }
  });

  //Cursors
  arrCursors.forEach(myCursor => {
    if (myCursor.owned == "owned") {

      //Assign the item data.
      let newPlayerItem = {
        id: myCursor.id,
        name: myCursor.name,
        cssKey: myCursor.cssKey,
        type: myCursor.type,
        desc: myCursor.desc,
        img: myCursor.img,
        rarity: myCursor.rarity,
        owned: "owned",
        equipped: myCursor.equipped,
        bonusClicks: myCursor.bonusClicks,
        defaultTag: false
      }

      //push to users Ship array
      arrPlayerCursors.push(newPlayerItem);
      //Add corresponding user array to session storage.
      sessionStorage.setItem("playerCursors", JSON.stringify(arrPlayerCursors));
    }
  });


  //Galaxies
  arrGalaxies.forEach(myGalaxy => {
    if (myGalaxy.owned == "owned") {

      //Assign the item data.
      let newPlayerItem = {
        id: myGalaxy.id,
        name: myGalaxy.name,
        type: myGalaxy.type,
        desc: myGalaxy.desc,
        img: myGalaxy.img,
        rarity: myGalaxy.rarity,
        owned: "owned",
        equipped: myGalaxy.equipped,
        galaxyKey: myGalaxy.galaxyKey,
        defaultTag: false
      }

      //push to users Ship array
      arrPlayerGalaxies.push(newPlayerItem);
      //Add corresponding user array to session storage.
      sessionStorage.setItem("playerGalaxies", JSON.stringify(arrPlayerGalaxies));
    }
  });

}

/**------------------------
 * ------ START GAME ------
 -------------------------*/

function startGame() {

  //Hide Button
  document.getElementById("btnStartGame").style.display = "none";
  gameStarted = true;

  try {
    if (gameStarted == true) {
      //Animate Out Home Planet
      let homePlanet = document.getElementById("homePlanet");
      homePlanet.classList.toggle('animateHomePlanet');
      setTimeout(function () {
        homePlanet.style.display = "none";
        homePlanet.parentElement.style.display = "none";
      }, 40000)








      //---------------------------------------------------------------------------
      //---------------------------- PLAYER ROTATION -------------------------------
      //----------------------------------------------------------------------------
      let focusedObj;//default no focus
      let focusIntervalID;

      //Define the player img bounds and rotate player to follow cursor
      let playerBounding = player.getBoundingClientRect();
      let playerCenter = {
        x: playerBounding.left + playerBounding.width / 2,
        y: playerBounding.top + playerBounding.height / 2
      };

      // ------------------ MOUSE MOVE ---------------------
      document.addEventListener("mousemove", e => {
        if(!document.documentElement.classList.contains("player-rotation-off")){
          //if I have a focused obj (planets and asteroids ONLY), remove the focus when the mouse moves.
          //clearInterval(focusIntervalID);
          //focusIntervalID = "";
          angle = Math.atan2(e.pageX - playerCenter.x, - (e.pageY - playerCenter.y)) * (180 / Math.PI);
          player.style.transform = `rotate(${angle}deg)`;
        }
        
      })

      // ------------------ FOCUSED OBJ ---------------------
      /*document.addEventListener('focus', function (e) {
        
        if(!document.documentElement.classList.contains("ship-rotation-off")){
          //get the target element from event
          focusedObj = e.target;
          //Is it an obj
          if (focusedObj.classList.contains("obj")) {
            focusIntervalID = setInterval(focusInterval, 500);
          }
        }

      }, true);

      function focusInterval() {
        let focusedObjBounding = focusedObj.getBoundingClientRect();//set bounds
        let focusedObjCenter = {
          x: focusedObjBounding.left + focusedObjBounding.width / 2,
          y: focusedObjBounding.top + focusedObjBounding.height / 2
        };
        angle = Math.atan2(focusedObjCenter.x - playerCenter.x, - (focusedObjCenter.y - playerCenter.y)) * (180 / Math.PI);
        player.style.transform = `rotate(${angle}deg)`;
      }
      */
      /*
      let focusInterval =
        function () {
          let focusedObjBounding = focusedObj.getBoundingClientRect();//set bounds
          let focusedObjCenter = {
            x: focusedObjBounding.left + focusedObjBounding.width / 2,
            y: focusedObjBounding.top + focusedObjBounding.height / 2
          };
          angle = Math.atan2(focusedObjCenter.x - playerCenter.x, - (focusedObjCenter.y - playerCenter.y)) * (180 / Math.PI);
          player.style.transform = `rotate(${angle}deg)`;
        };
      */
      //---------------------------------------------------------------------------------------











      //Begin Animations
      startAnimations();

    }
    else {
      alert(genericError);
    }
  } catch (error) {
    //Do Nothing - Expected Error
  }
}


//Toggle Menues
let storeMenu = document.getElementById("store-menu");
let mystuffMenu = document.getElementById("mystuff-menu");
let profileMenu = document.getElementById("profile-menu");
let settingsMenu = document.getElementById("settings-menu");
let activeMenu = storeMenu; //set a default menu

function toggleStore() {
  if (storeMenu.style.display == "block") {
    invincible = false;
    storeMenu.style.display = "none";
  }
  else {
    saveGame();
    invincible = true;
    activeMenu.style.display = "none";
    activeMenu = storeMenu;
    storeMenu.style.display = "block";
    storeMenu.focus();
  }
}
function toggleMyStuff() {
  if (mystuffMenu.style.display == "block") {
    invincible = false;
    mystuffMenu.style.display = "none";
  }
  else {
    saveGame();
    invincible = true;
    activeMenu.style.display = "none";
    activeMenu = mystuffMenu;
    mystuffMenu.style.display = "block";
    mystuffMenu.focus();
  }
}
function toggleProfile() {
  if (profileMenu.style.display == "block") {
    profileMenu.style.display = "none";
  }
  else {
    activeMenu.style.display = "none";
    activeMenu = profileMenu;
    profileMenu.style.display = "block";
    profileMenu.focus();
  }
}
function toggleDeathModal() {
  if (deathModal.style.display == "block") {
    deathModal.style.display = "none";
  }
  else {
    activeMenu.style.display = "none";
    deathModal.style.display = "block";
    deathModal.focus();
  }
}
function toggleMessageModal() {
  if (msgModal.style.display == "block") {
    msgModal.style.display = "none";
  }
  else {
    activeMenu.style.display = "none";
    msgModal.style.display = "block";
    msgModal.focus();
  }
}

function toggleSettings() {
  if (settingsMenu.style.display == "block") {
    invincible = false;
    settingsMenu.style.display = "none";
  }
  else {
    saveGame();
    invincible = true;
    activeMenu.style.display = "none";
    settingsMenu.style.display = "block";
    settingsMenu.focus();
  }
}

//Save game
function saveGame() {
  //Save Score and Level - NOTE: Purchased and equipped items automatically put in storage.
  sessionStorage.setItem("score", score.value);
  sessionStorage.setItem("lvl", lvl.value);
  sessionStorage.setItem("expProgress", exp.value);
  sessionStorage.setItem("expMax", exp.max);
  sessionStorage.setItem("healthVal", health.value);
  sessionStorage.setItem("healthMax", health.max);
  sessionStorage.setItem("cursorBonusClicks", bonusClicks);

  let savePopUp = document.getElementById("savePopUp");
  
  savePopUp.classList.add("flash-popup");
  savePopUp.ariaHidden = false;
  setTimeout(() => {
    savePopUp.classList.remove("flash-popup");
    savePopUp.ariaHidden = true;
  }, 5000);

  
}

//delete game data
function deleteGame() {
  //Save Score and Level - NOTE: Purchased and equipped items automatically put in storage when the page loads.
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("lvl");
  sessionStorage.removeItem("expProgress");
  sessionStorage.removeItem("expMax");
  sessionStorage.removeItem("healthVal");
  sessionStorage.removeItem("healthMax");
  sessionStorage.removeItem("healthCap");
  sessionStorage.removeItem("cursorBonusClicks");

  sessionStorage.removeItem("playerShips");
  sessionStorage.removeItem("playerCursors");
  sessionStorage.removeItem("playerGalaxies");

  window.location.href = "../Galaclixy_v3/index.html";
}

//Reload game
function reloadGame() {
  location.reload();
};

function toggleTopNav(){
  let nav = document.getElementById("nav");
  
  if (nav.style.visibility != "visible") {
    nav.style.visibility = "visible";
  }
  else {
    nav.style.visibility = "hidden";
  }
}

function reloadFromDeath(){
  //refill health from players health cap
  reloadGame();
  sessionStorage.setItem("healthVal", healthCap);
  sessionStorage.setItem("healthMax", healthCap);
  
}
