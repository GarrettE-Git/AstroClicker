
//Store Containers - Ship, Cursor, and Galaxy
let shipContainer = document.getElementById("ship-container");
let cursorContainer = document.getElementById("cursor-container");
let galaxyContainer = document.getElementById("galaxy-container");

//Travel Container
let travelContainer = document.getElementById("travel-container");

//My Stuff Container
let myStuffContainer = document.getElementById("mystuff-container"); //depricate
let myShipsContainer = document.getElementById("myships-container");
let myCursorsContainer = document.getElementById("mycursors-container");
let myGalaxiesContainer = document.getElementById("mygalaxies-container");

//Custom arr Merge Default and Customs - remove duplicates
let arrNoDefaultShips;
let arrNoDefaultCursors;
let arrNoDefaultGalaxies;

//My Stuff Items Templates
let itemMyStuffTemplate;

//On page load
document.addEventListener('DOMContentLoaded', function () {
  //Does the user have items? If true fill shop accordingly.
  try {
    if (customShopNeeded === true) {
      //custom merged arrays
      fillShopContainersWithCustoms();
    }
    else {
      //default arrays
      fillShopContainersWithDefaults();
    }
  } catch (error) {
    alert(genericErMsg + error);
  }
});

/**------------------------------
* ---------- FILL SHOPS  --------
---------------------------------*/

/** Fill shop with customs  */
function fillShopContainersWithCustoms() {

  //merge the default array and player arrays
  arrShipsMergeShop = arrPlayerShips.concat(arrShips);
  arrCursorsMergeShop = arrPlayerCursors.concat(arrCursors);
  arrGalaxiesMergeShop = arrPlayerGalaxies.concat(arrGalaxies);


  //remove the default duplicates based on name 
  arrNoDefaultShips = arrShipsMergeShop.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name && o.defaultTag == true)) {
      unique.push(o);
    }
    return unique;
  }, []);

  arrNoDefaultCursors = arrCursorsMergeShop.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name && o.defaultTag == true)) {
      unique.push(o);
    }
    return unique;
  }, []);

  arrNoDefaultGalaxies = arrGalaxiesMergeShop.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name && o.defaultTag == true)) {
      unique.push(o);
    }
    return unique;
  }, []);

  arrNoDefaultShips.forEach(ship => {
    //ShipTemplate
    if (ship.owned != "owned" && ship.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemShipTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + ship.id + '"><div class="item-card ' + isBuyable + ' ' + ship.hidden + ' ' + ship.owned + ' ' + ship.rarity + '" role="button" onclick="buyItem(event)"><p class="ship-id" style="display: none;">' + ship.id + '</p><img class="item-img m-3" src="' + ship.img + '" alt=""/><p class="item-name">' + ship.name + '</p><i>' + ship.desc + '</i><p class="item-cost"> <span class="icon-coin"></span>' + ship.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    shipContainer.insertAdjacentHTML("afterbegin", itemShipTemplate);
  });

  arrNoDefaultCursors.forEach(cursor => {
    //Cursor
    if (cursor.owned != "owned" && cursor.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemCursorTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + cursor.id + '"><div class="item-card ' + isBuyable + ' ' + cursor.hidden + ' ' + cursor.owned + ' ' + cursor.rarity + '" role="button" onclick="buyItem(event)"><p class="cursor-id" style="display:none;">' + cursor.id + '</p><img class="item-img m-3" src="' + cursor.img + '" alt=""/><p class="item-name">' + cursor.name + '</p><i>This item applies ' + '<span class="txt-bold color-emph">+' + cursor.bonusClicks.toString() + '</span> ' + ' to every click you make. </i><p class="item-cost"> <span class="icon-coin"></span>' + cursor.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    cursorContainer.insertAdjacentHTML("afterbegin", itemCursorTemplate);
  });

  arrNoDefaultGalaxies.forEach(galaxy => {
    //Galaxy
    if (galaxy.owned != "owned" && galaxy.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemGalaxyTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + galaxy.id + '"><div class="item-card ' + isBuyable + ' ' + galaxy.hidden + ' ' + galaxy.owned + ' ' + galaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="galaxy-id" style="display: none;">' + galaxy.id + '</p><img class="item-img m-3" src="' + galaxy.img + '" alt=""/><p class="item-name">' + galaxy.name + '</p><i>' + galaxy.desc + '</i><p class="item-cost"> <span class="icon-coin"></span>' + galaxy.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    galaxyContainer.insertAdjacentHTML("afterbegin", itemGalaxyTemplate);
  });
};


/** Fill shop with defaults  */

function fillShopContainersWithDefaults() {
  arrShips.forEach(ship => {
    //ShipTemplate
    if (ship.owned != "owned" && ship.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemShipTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + ship.id + '"><div class="item-card ' + isBuyable + ' ' + ship.hidden + ' ' + ship.owned + ' ' + ship.rarity + '" role="button" onclick="buyItem(event)"><p class="ship-id" style="display: none;">' + ship.id + '</p><img class="item-img m-3" src="' + ship.img + '" alt=""/><p class="item-name">' + ship.name + '</p><i>' + ship.desc + '</i><p class="item-cost"> <span class="icon-coin"></span>' + ship.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    shipContainer.insertAdjacentHTML("afterbegin", itemShipTemplate);
  });

  arrCursors.forEach(cursor => {
    //Cursor
    if (cursor.owned != "owned" && cursor.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemCursorTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + cursor.id + '"><div class="item-card ' + isBuyable + ' ' + cursor.hidden + ' ' + cursor.owned + ' ' + cursor.rarity + '" role="button" onclick="buyItem(event)"><p class="cursor-id" style="display:none;">' + cursor.id + '</p><img class="item-img m-3" src="' + cursor.img + '" alt=""/><p class="item-name">' + cursor.name + '</p><i>This item applies ' + '<span class="txt-bold color-emph">+' + cursor.bonusClicks.toString() + '</span> ' + ' to every click you make. </i><p class="item-cost"> <span class="icon-coin"></span>' + cursor.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    cursorContainer.insertAdjacentHTML("afterbegin", itemCursorTemplate);
  });

  arrGalaxies.forEach(galaxy => {
    //Galaxy
    if (galaxy.owned != "owned" && galaxy.hidden != "hidden") {
      isBuyable = "buyable";
    }
    else {
      isBuyable = "";
    }
    let itemGalaxyTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + galaxy.id + '"><div class="item-card ' + isBuyable + ' ' + galaxy.hidden + ' ' + galaxy.owned + ' ' + galaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="galaxy-id" style="display: none;">' + galaxy.id + '</p><img class="item-img m-3" src="' + galaxy.img + '" alt=""/><p class="item-name">' + galaxy.name + '</p><i>' + galaxy.desc + '</i><p class="item-cost"> <span class="icon-coin"></span>' + galaxy.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
    galaxyContainer.insertAdjacentHTML("afterbegin", itemGalaxyTemplate);
  });
};


/**---------------------------------
 * ------- CLICK TO BUY ITEM -------
 ----------------------------------*/
function buyItem(event) {
  //Find the index of selected item based on plant Id
  let eSelectedItem = event.target.parentNode;
  let eSelectedItemID;

  try {
    //If clicked a Ship
    if (eSelectedItem.querySelector(".ship-id")) {
      //Get ID of Ship
      eSelectedItemID = eSelectedItem.querySelector(".ship-id").textContent;
      eArrItem = arrShips[eSelectedItemID - 1];
      purchase(eArrItem);
    }
    //If clicked a Cursor
    else if (eSelectedItem.querySelector(".cursor-id")) {
      //Get ID of Cursor
      eSelectedItemID = eSelectedItem.querySelector(".cursor-id").textContent;
      eArrItem = arrCursors[eSelectedItemID - 1];
      purchase(eArrItem);
    }
    //If clicked a Galaxy
    else if (eSelectedItem.querySelector(".galaxy-id")) {
      //Get ID of Galaxy
      eSelectedItemID = eSelectedItem.querySelector(".galaxy-id").textContent;
      eArrItem = arrGalaxies[eSelectedItemID - 1];
      purchase(eArrItem);
    }
  } catch (error) {
    alert(genericError);
  }

  /**---------------------------------
  * ------- PURCHASING  --------------
  ----------------------------------*/
  function purchase(eArrItem) {
    try {
      //Does the player already own this item?
      //N
      if (eArrItem.owned != "owned") {
        //Does the player have enough points to purchase?
        if (score.value >= eArrItem.cost) {
          score.value = Number(score.value) - eArrItem.cost;

          let purchasedItem = eArrItem;
          eArrItem.owned = "owned";
          transferItemToPlayer(purchasedItem);
        }
        //N
        else {
          alert("You don't have enough Galaxy Tokens for this item!");
          return;
        }
      }
      //Y
      else {
        alert("You already own this item!");
        return;
      }
    } catch (error) {
      alert(genericError);
    }
  }
}


/**---------------------------------
  * ------- TRANSFER TO PLAYER  --------------
  ----------------------------------*/
function transferItemToPlayer(purchasedItem) {

  //Assign the item data.
  newPlayerItem = {
    id: purchasedItem.id,
    name: purchasedItem.name,
    cssKey: purchasedItem.cssKey,
    type: purchasedItem.type,
    desc: purchasedItem.desc,
    img: purchasedItem.img,
    rarity: purchasedItem.rarity,
    owned: "owned",
    equipped: purchasedItem.equipped,
    bonusClicks: purchasedItem.bonusClicks,
    galaxyKey: purchasedItem.galaxyKey,
    defaultTag: false
  }

  if (newPlayerItem.type == "ship") {
    //push to users Ship array
    arrPlayerShips.push(newPlayerItem);
    //Add corresponding user array to session storage.
    sessionStorage.setItem("playerShips", JSON.stringify(arrPlayerShips));
  }
  else if (newPlayerItem.type == "cursor") {
    //push to users Ship array
    arrPlayerCursors.push(newPlayerItem);
    //Add corresponding user array to session storage.
    sessionStorage.setItem("playerCursors", JSON.stringify(arrPlayerCursors));
  }
  else if (newPlayerItem.type == "galaxy") {
    //push to users Ship array
    arrPlayerGalaxies.push(newPlayerItem);
    //Add corresponding user array to session storage.
    sessionStorage.setItem("playerGalaxies", JSON.stringify(arrPlayerGalaxies));
  }

  //Add user item to container
  updateMyStuff();
}


/**------------------------
 * ----UPDATE MY STUFF----
 -------------------------*/
function updateMyStuff() {
  myShipsContainer.innerHTML = "";//Clear existing content to overwrite
  myCursorsContainer.innerHTML = "";//Clear existing content to overwrite
  myGalaxiesContainer.innerHTML = "";//Clear existing content to overwrite

  //Update the store
  shipContainer.innerHTML = "";//Clear existing content to overwrite
  cursorContainer.innerHTML = "";//Clear existing content to overwrite
  galaxyContainer.innerHTML = "";//Clear existing content to overwrite
  fillShopContainersWithCustoms();

  //Import Default Owned Items

  arrNoDefaultShips.forEach(myShip => {
    if (myShip.owned == "owned") {
      itemMyShipsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myShip.id + '"><div class="item-card ' + myShip.type + ' ' + myShip.owned + ' ' + myShip.equipped + ' ' + myShip.rarity + '" role="button" onclick="buyItem(event)"><p class="myShip-name" style="display: none;">' + myShip.name + '</p><img class="item-img m-3" src="' + myShip.img + '" alt=""/><p class="item-name">' + myShip.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
      myShipsContainer.insertAdjacentHTML("afterbegin", itemMyShipsTemplate);
    }
  });
  arrNoDefaultCursors.forEach(myCursor => {
    if (myCursor.owned == "owned") {
      itemMyCursorsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myCursor.id + '"><div class="item-card ' + myCursor.type + ' ' + myCursor.owned + ' ' + myCursor.equipped + ' ' + myCursor.rarity + '" role="button" onclick="buyItem(event)"><p class="myCursor-name" style="display: none;">' + myCursor.name + '</p><img class="item-img m-3" src="' + myCursor.img + '" alt=""/><p class="item-name">' + myCursor.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
      myCursorsContainer.insertAdjacentHTML("afterbegin", itemMyCursorsTemplate);
    }
  });
  arrNoDefaultGalaxies.forEach(myGalaxy => {
    if (myGalaxy.owned == "owned") {
      itemMyGalaxiesTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myGalaxy.id + '"><div class="item-card ' + myGalaxy.type + ' ' + myGalaxy.owned + ' ' + myGalaxy.equipped + ' ' + myGalaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="myGalaxy-name" style="display: none;">' + myGalaxy.name + '</p><img class="item-img m-3" src="' + myGalaxy.img + '" alt=""/><p class="item-name">' + myGalaxy.name + '</p><button class="btn btn-3d btn-primary" onclick="equipItem(event)">Travel</button><div class="equipped-tag">Current System</div></div></div>';
      myGalaxiesContainer.insertAdjacentHTML("afterbegin", itemMyGalaxiesTemplate);
    }
  });


}

