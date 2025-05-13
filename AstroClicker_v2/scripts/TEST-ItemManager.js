
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

//My Stuff Items Templates
let itemMyStuffTemplate;

//Does the user have items? If true, insert into the container.
/*try {
  if(arrPlayerItems != undefined){
    if(arrPlayerItems.length >= 1){
      updateMyStuff();
    }
  }
  else{
    arrPlayerItems = [];
  }
} catch (error) {
  alert(genericErMsg + error);
}
  */

fillShopContainers();

function fillShopContainers() {

    //Ships
    arrShips.forEach(ship => {
        if (ship.owned != "owned" && ship.hidden != "hidden") {
            isBuyable = "buyable";
        }
        else {
            isBuyable = "";
        }
        let itemShipTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + ship.id + '"><div class="item-card ' + isBuyable + ' ' + ship.hidden + ' ' + ship.owned + ' ' + ship.rarity + '" role="button" onclick="buyItem(event)"><p class="ship-id" style="display: none;">' + ship.id + '</p><img class="item-img m-3" src="' + ship.img + '" alt=""/><p class="item-name">' + ship.name + '</p><i>' + ship.desc + '</i><p class="item-cost"> <span class="material-symbols-outlined" style="width:auto;" aria-label="Cost">paid</span>' + ship.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
        shipContainer.insertAdjacentHTML("afterbegin", itemShipTemplate);
    });

    //Cursor
    arrCursors.forEach(cursor => {

        if (cursor.owned != "owned" && cursor.hidden != "hidden") {
            isBuyable = "buyable";
        }
        else {
            isBuyable = "";
        }
        let itemCursorTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + cursor.id + '"><div class="item-card ' + isBuyable + ' ' + cursor.hidden + ' ' + cursor.owned + ' ' + cursor.rarity + '" role="button" onclick="buyItem(event)"><p class="cursor-id" style="display:none;">' + cursor.id + '</p><img class="item-img m-3" src="' + cursor.img + '" alt=""/><p class="item-name">' + cursor.name + '</p><i>This item applies ' + '<span class="txt-bold color-emph">+' + cursor.bonusClicks.toString() + '</span> ' + ' to every click you make. </i><p class="item-cost"> <span class="material-symbols-outlined" style="width:auto;" aria-label="Cost">paid</span>' + cursor.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
        cursorContainer.insertAdjacentHTML("afterbegin", itemCursorTemplate);
    });


    //Galaxy
    arrGalaxies.forEach(galaxy => {
        //Galaxy
        if (galaxy.owned != "owned" && galaxy.hidden != "hidden") {
            isBuyable = "buyable";
        }
        else {
            isBuyable = "";
        }
        let itemGalaxyTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + galaxy.id + '"><div class="item-card ' + isBuyable + ' ' + galaxy.hidden + ' ' + galaxy.owned + ' ' + galaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="galaxy-id" style="display: none;">' + galaxy.id + '</p><img class="item-img m-3" src="' + galaxy.img + '" alt=""/><p class="item-name">' + galaxy.name + '</p><i>' + galaxy.desc + '</i><p class="item-cost"> <span class="material-symbols-outlined" style="width:auto;" aria-label="Cost">paid</span>' + galaxy.cost + '</p><div class="owned-tag">Owned</div><div class="buy-tag">Buy Item</div></div></div>';
        galaxyContainer.insertAdjacentHTML("afterbegin", itemGalaxyTemplate);
    });
};

//WIP

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

                    //Push owned status to default item DB
                    if (purchasedItem.type == "ship") {
                        sessionStorage.setItem("Ships", JSON.stringify(arrShips));
                    }
                    else if (purchasedItem.type == "cursor") {
                        sessionStorage.setItem("Cursors", JSON.stringify(arrCursors));
                    }
                    else if (purchasedItem.type == "galaxy") {
                        sessionStorage.setItem("Galaxies", JSON.stringify(arrGalaxies));
                    }
                    else {
                        alert(genericError);
                    }

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
        galaxyKey: purchasedItem.galaxyKey
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
    fillShopContainers();

    //Import Default Owned Items

    arrShips.forEach(myShip => {
        if (myShip.owned == "owned") {
            itemMyShipsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myShip.id + '"><div class="item-card ' + myShip.type + ' ' + myShip.owned + ' ' + myShip.equipped + ' ' + myShip.rarity + '" role="button" onclick="buyItem(event)"><p class="myShip-name" style="display: none;">' + myShip.name + '</p><img class="item-img m-3" src="' + myShip.img + '" alt=""/><p class="item-name">' + myShip.name + '</p><button class="btn btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
            myShipsContainer.insertAdjacentHTML("afterbegin", itemMyShipsTemplate);
        }
    });
    arrCursors.forEach(myCursor => {
        if (myCursor.owned == "owned") {
            itemMyCursorsTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myCursor.id + '"><div class="item-card ' + myCursor.type + ' ' + myCursor.owned + ' ' + myCursor.equipped + ' ' + myCursor.rarity + '" role="button" onclick="buyItem(event)"><p class="myCursor-name" style="display: none;">' + myCursor.name + '</p><img class="item-img m-3" src="' + myCursor.img + '" alt=""/><p class="item-name">' + myCursor.name + '</p><button class="btn btn-primary" onclick="equipItem(event)">Equip</button><div class="equipped-tag">Equipped</div></div></div>';
            myCursorsContainer.insertAdjacentHTML("afterbegin", itemMyCursorsTemplate);
        }
    });
    arrGalaxies.forEach(myGalaxy => {
        if (myGalaxy.owned == "owned") {
            itemMyGalaxiesTemplate = '<div class="col-12 col-md-6 col-lg-4" style="order: ' + myGalaxy.id + '"><div class="item-card ' + myGalaxy.type + ' ' + myGalaxy.owned + ' ' + myGalaxy.equipped + ' ' + myGalaxy.rarity + '" role="button" onclick="buyItem(event)"><p class="myGalaxy-name" style="display: none;">' + myGalaxy.name + '</p><img class="item-img m-3" src="' + myGalaxy.img + '" alt=""/><p class="item-name">' + myGalaxy.name + '</p><button class="btn btn-primary" onclick="equipItem(event)">Travel</button><div class="equipped-tag">Current System</div></div></div>';
            myGalaxiesContainer.insertAdjacentHTML("afterbegin", itemMyGalaxiesTemplate);
        }
    });


}