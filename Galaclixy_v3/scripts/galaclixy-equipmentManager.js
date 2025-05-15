function equipItem(event) {

  //Get the selected item
  let eSelectedItem = event.target.parentNode;

  //Ship Item
  if (eSelectedItem.classList.contains("ship")) {

    //remove the currently equipped ship
    let EquippedShip = eSelectedItem.parentNode.parentNode.querySelectorAll(".equipped.ship")[0];

    if (EquippedShip) {

      //Find current equipped ship
      let equippedShipName = EquippedShip.querySelector(".myShip-name").textContent; //name
      let equippedShipIndex = arrPlayerShips.findIndex(ship => ship.name === equippedShipName); //arr Item Index from name

      EquippedShip.classList.remove("equipped");
      eSelectedItem.classList.add("equipped");

      //update the old item in the array to NOT equipped.
      arrPlayerShips[equippedShipIndex].equipped = "";

      //find selected ship asset
      let selectedShipName = eSelectedItem.querySelector(".myShip-name").textContent; //name
      let selectedShip = arrPlayerShips.find(ship => ship.name === selectedShipName); //arr Item from name
      let selectedShipIndex = arrPlayerShips.findIndex(ship => ship.name === selectedShipName); //arr Item Index from name

      //update the item in the array to equipped.
      arrPlayerShips[selectedShipIndex].equipped = "equipped";

      //update equipped status in session storage
      sessionStorage.setItem("playerShips", JSON.stringify(arrPlayerShips));

      //update image
      player.src = selectedShip.img;
    }

  }
  //------------------------------Cursor Item-----------------------------
  else if (eSelectedItem.classList.contains("cursor")) {

    //remove the currently equipped cursor
    let EquippedCursor = eSelectedItem.parentNode.parentNode.querySelectorAll(".equipped.cursor")[0];

    if (EquippedCursor) {

      //Find current equipped cursor
      let equippedCursorName = EquippedCursor.querySelector(".myCursor-name").textContent; //name
      let equippedCursorIndex = arrPlayerCursors.findIndex(cursor => cursor.name === equippedCursorName); //arr Item Index from name

      EquippedCursor.classList.remove("equipped");
      eSelectedItem.classList.add("equipped");

      //update the old item in the array to NOT equipped.
      arrPlayerCursors[equippedCursorIndex].equipped = "";

      //find selected cursor asset
      let selectedCursorName = eSelectedItem.querySelector(".myCursor-name").textContent; //name
      let selectedCursor = arrPlayerCursors.find(cursor => cursor.name === selectedCursorName); //arr Item from name
      let selectedCursorIndex = arrPlayerCursors.findIndex(cursor => cursor.name === selectedCursorName); //arr Item Index from name

      //update the item in the array to equipped.
      arrPlayerCursors[selectedCursorIndex].equipped = "equipped";

      //find and apply Cursor Buffs
      bonusClicks = arrPlayerCursors[selectedCursorIndex].bonusClicks;
      sessionStorage.setItem("cursorBonusClicks", bonusClicks);

      //update equipped status & buffs in session storage
      sessionStorage.setItem("playerCursors", JSON.stringify(arrPlayerCursors));

      //handle visual cursor change
      if (document.documentElement.classList.contains("disable-cursors")) {
        eSelectedItem.classList.add("equipped");
        document.body.className = "";
        document.body.classList.add("default");
      }
      else {
        eSelectedItem.classList.add("equipped");
        document.body.className = "";
        document.body.classList.add(selectedCursor.cssKey);
      }


    }

  }
  else if (eSelectedItem.classList.contains("galaxy")) {
    //remove the currently equipped ship
    let EquippedGalaxy = eSelectedItem.parentNode.parentNode.querySelectorAll(".equipped.galaxy")[0];

    if (EquippedGalaxy) {

      //Find current equipped galaxy
      let equippedGalaxyName = EquippedGalaxy.querySelector(".myGalaxy-name").textContent; //name
      let equippedGalaxyIndex = arrPlayerGalaxies.findIndex(galaxy => galaxy.name === equippedGalaxyName); //arr Item Index from name

      EquippedGalaxy.classList.remove("equipped");
      eSelectedItem.classList.add("equipped");

      //update the old item in the array to NOT equipped.
      arrPlayerGalaxies[equippedGalaxyIndex].equipped = "";


      //find selected galaxy item index
      let selectedGalaxyName = eSelectedItem.querySelector(".myGalaxy-name").textContent; //name
      let selectedGalaxyIndex = arrPlayerGalaxies.findIndex(galaxy => galaxy.name === selectedGalaxyName); //arr Item from name

      //Show Travel Animation
      let travelBox = document.getElementById("TravelBox");

      travelBox.style.display = "flex";
      travelBox.classList.add("flash-popup");
      saveGame();
      activeMenu.style.display = "none";//hide the opened menu

      //Save game and swap the graphics to new galaxy level asset pack
      setTimeout(function () {
        document.documentElement.classList.remove(activeGalaxy);
        activeGalaxy = arrPlayerGalaxies[selectedGalaxyIndex].galaxyKey;
        document.documentElement.classList.add(arrPlayerGalaxies[selectedGalaxyIndex].galaxyKey);
      }, 2000)

      setTimeout(() => {
        travelBox.classList.remove("flash-popup");

        //end animation
        travelBox.style.display = "none";
      }, 4000);

    }

  }
  else {
    alert(genericError);
  }

}
