//Get Settings Inputs -------------------------------
//Difficulty Settings
let cbxHealth = document.getElementById("cbxHealth"); // ---------------done
let rngObjSpeed = document.getElementById("rngObjSpeed");

//Accessibility Settings
let clrUIBG = document.getElementById("clrUIBG"); // ---------------done
let clrUIText = document.getElementById("clrUIText"); // ---------------done
let cbxHighContrast = document.getElementById("cbxHighContrast"); // ---------------done
let rngColorBlind = document.getElementById("rngColorBlind"); 
let cbxBlackWhite = document.getElementById("cbxBlackWhite"); // ---------------done
let cbxDarkMode = document.getElementById("cbxDarkMode");
let cbxCustomCursors = document.getElementById("cbxCustomCursors"); // ---------------done
let cbxTargetBox = document.getElementById("cbxTargetBox"); // ---------------done

//Performance
let cbxStarAnimations = document.getElementById("cbxStarAnimations");
//let cbxObjAnimations = document.getElementById("cbxObjAnimations");
let cbxShipRotation = document.getElementById("cbxShipRotation");

//Data Settings in functions

//Settings Variables
let cssKeyColorSet;
let invincible = false;
let userCustomUIHex;
let uiColorModeHealth;
let activeColorMode = "default";

//Invincible?
cbxHealth.addEventListener("change", (e) => {
    if(cbxHealth.checked){
        invincible = true;
    }
    else{
        invincible = false;
    }
  });

//UI Color?
function updateUIColors(){
    let customUIBG = clrUIBG.value;
    let customUIText = clrUIText.value;
    activeColorMode = "ui-custom-colors";

    let uiBtnElements = document.querySelectorAll(".btn");
    uiBtnElements.forEach(b => {
        b.style.setProperty("background-color", customUIBG, "important");
        b.style.setProperty("color", customUIText, "important");
        b.classList.add("ui-custom-colors");
    });
    let uiBtnElementsNoBG = document.querySelectorAll(".btn-icon-nobg");
    uiBtnElementsNoBG.forEach(b => {
        b.style.setProperty("background-color", "transparent", "important");
        b.classList.add("ui-custom-colors");
    });
    let uiBtnElementsBuyTag = document.querySelectorAll(".buy-tag");
    uiBtnElementsBuyTag.forEach(b => {
        b.style.setProperty("background-color", customUIBG, "important");
        b.style.setProperty("color", customUIText, "important");
        b.classList.add("ui-custom-colors");
    });
    let uiDividerElements = document.querySelectorAll(".divider");
    uiDividerElements.forEach(d => {
        d.style.setProperty("border-color", customUIBG, "important");
        d.classList.add("ui-custom-colors");
    });
    let uiSettingsSubElements = document.querySelectorAll(".settingsSubContainer");
    uiSettingsSubElements.forEach(c => {
        c.style.setProperty("border-color", customUIBG, "important");
        c.classList.add("ui-custom-colors");
    });
    let uiLogo = document.querySelectorAll(".logo-main");
    uiLogo.forEach(l => {
        l.style.setProperty("color", customUIBG, "important");
        l.style.setProperty("text-decoration", "underline" + customUIBG, "important");
        l.classList.add("ui-custom-colors");
    });
}

//Black and White?
cbxBlackWhite.addEventListener("change", (e) => {
    if(cbxBlackWhite.checked){
        document.documentElement.classList.add("black-and-white-mode");
    }
    else{
        document.documentElement.classList.remove("black-and-white-mode");
    }
  });

//Custom Cursors?
cbxCustomCursors.addEventListener("change", (e) => {
    if(cbxCustomCursors.checked){
        document.documentElement.classList.add("disable-cursors");
    }
    else{
        document.documentElement.classList.remove("disable-cursors");
        let EquippedCursor = document.documentElement.querySelectorAll(".equipped.cursor")[0];
        
        //find selected cursor asset
        let selectedCursorName = EquippedCursor.querySelector(".myCursor-name").textContent; //name
        let selectedCursor = arrPlayerCursors.find(cursor => cursor.name === selectedCursorName); //arr Item from name

        document.body.className = "";
        document.body.classList.add(selectedCursor.cssKey);
    }
  });

//Targeting System?
cbxTargetBox.addEventListener("change", (e) => {
    if(cbxTargetBox.checked){
        document.documentElement.classList.add("target-boxes");
    }
    else{
        document.documentElement.classList.remove("target-boxes");
    }
  });

//High Contrast?
cbxHighContrast.addEventListener("change", (e) => {
    
    if(cbxHighContrast.checked){
        document.documentElement.classList.remove(activeColorMode);
        //also remove dark mode - cannot have high contrast mode with dark mode

        if(document.documentElement.classList.contains("dark-mode")){
            document.documentElement.classList.remove("dark-mode");
            cbxDarkMode.checked = false;
        }

        if(document.documentElement.classList.contains("light-mode")){
            document.documentElement.classList.remove("light-mode");
            cbxLightMode.checked = false;
        }
        
        rngColorBlind.value = 0;

        document.documentElement.classList.add("high-contrast-mode");
        activeColorMode = "high-contrast-mode";

    }
    else{
        document.documentElement.classList.remove("high-contrast-mode");
    }
  });

//Color Blind Mode?
rngColorBlind.addEventListener("change", (e) => {
    
    if(rngColorBlind.value == 0){
        //return to defaul mode;
        document.documentElement.classList.remove(activeColorMode);
        cbxHighContrast.checked = false;
        activeColorMode = "default";
        document.documentElement.classList.add(activeColorMode);
    }
    else if(rngColorBlind.value == 1){
        document.documentElement.classList.remove(activeColorMode);
        cbxHighContrast.checked = false;
        activeColorMode = "color-blind-deu-pro";
        document.documentElement.classList.add(activeColorMode);
    }
    else if(rngColorBlind.value == 2){
        document.documentElement.classList.remove(activeColorMode);
        cbxHighContrast.checked = false;
        activeColorMode = "color-blind-tri";
        document.documentElement.classList.add(activeColorMode);
    }
  });

//DarkMode?
cbxDarkMode.addEventListener("change", (e) => {
    
    if(cbxDarkMode.checked){
        //remove default mode if it exists
        if(document.documentElement.classList.contains("default")){
            document.documentElement.classList.remove("default");
        }
        //remove high contrast mode - cannot have high contrast mode with dark mode
        if(document.documentElement.classList.contains("high-contrast-mode")){
            document.documentElement.classList.remove("high-contrast-mode");
            cbxHighContrast.checked = false;
        }
        //remove high contrast mode - cannot have high contrast mode with dark mode
        if(document.documentElement.classList.contains("light-mode")){
            document.documentElement.classList.remove("light-mode");
            cbxLightMode.checked = false;
        }
        document.documentElement.classList.add("dark-mode");
    }
    else{
        document.documentElement.classList.remove("dark-mode");
    }
  });

  //DarkMode?
cbxLightMode.addEventListener("change", (e) => {
    
    if(cbxLightMode.checked){
        //remove default mode if it exists
        if(document.documentElement.classList.contains("default")){
            document.documentElement.classList.remove("default");
        }
        //remove high contrast mode - cannot have high contrast mode with dark mode
        if(document.documentElement.classList.contains("high-contrast-mode")){
            document.documentElement.classList.remove("high-contrast-mode");
            cbxHighContrast.checked = false;
        }
        //remove high contrast mode - cannot have high contrast mode with dark mode
        if(document.documentElement.classList.contains("dark-mode")){
            document.documentElement.classList.remove("dark-mode");
            cbxDarkMode.checked = false;
        }
        document.documentElement.classList.add("light-mode");
    }
    else{
        document.documentElement.classList.remove("light-mode");
    }

  });

// Start Animations?
cbxStarAnimations.addEventListener("change", (e) => {
    
    if(!cbxStarAnimations.checked){
        document.documentElement.classList.add("stars-off");
        cbxStarAnimations.checked = false;
    }
    else{
        document.documentElement.classList.remove("stars-off");
        cbxStarAnimations.checked = true;
    }

  });

// Start Animations?
cbxShipRotation.addEventListener("change", (e) => {
    
    if(!cbxShipRotation.checked){
        document.documentElement.classList.add("player-rotation-off");
        cbxShipRotation.checked = false;
        player.style.transform = "rotate(0deg)";
    }
    else{
        document.documentElement.classList.remove("player-rotation-off");
        cbxShipRotation.checked = true;
    }

  });

    
  















/*

cbxHighContrast.addEventListener("change", (e) => {
    if(cbxHighContrast.checked){
        cssKeyColorSet = {
            tag: "high-contrast",
            clr1: "#000000",
            clr2: "#FFFFFF",
            clr3: "#FFFF00",
            clremph: "#00F7FF",
            clrcommon: "#3CFF00",
            clrrare: "#B7FFF8",
            clrunique: "#FFC800",
            clrmythic: "#FCC4FF"
        };
        changeColorSet();
    }
    else{
        //resetColors();
    }
  });









  
  function changeColorSet(){
    let uiBtnElements = document.querySelectorAll(".btn");
    uiBtnElements.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clr3, "important");
        e.style.setProperty("color", cssKeyColorSet.clr1, "important");
        e.classList.add("ui-custom-colors");
    });
    let uiBtnElementsNoBG = document.querySelectorAll(".btn-icon-nobg");
    uiBtnElementsNoBG.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clr3, "important");
        e.style.setProperty("color", cssKeyColorSet.clr1, "important")
        e.classList.add("ui-custom-colors");
    });
    let uiBtnElementsBuyTag = document.querySelectorAll(".buy-tag");
    uiBtnElementsBuyTag.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clr3, "important");
        e.style.setProperty("color", cssKeyColorSet.clr1, "important");
        e.classList.add("ui-custom-colors");
    });
    let uiDividerElements = document.querySelectorAll(".divider");
    uiDividerElements.forEach(e => {
        e.style.setProperty("border-color", cssKeyColorSet.clr3, "important");
        e.classList.add("ui-custom-colors");
    });
    let uiSettingsSubElements = document.querySelectorAll(".settingsSubContainer");
    uiSettingsSubElements.forEach(e => {
        e.style.setProperty("border-color", cssKeyColorSet.clr3, "important");
        e.classList.add("ui-custom-colors");
    });
    let uiLogo = document.querySelectorAll(".logo-main");
    uiLogo.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr3, "important");
        e.classList.add("ui-custom-colors");
    });
    //non-interactive. Leave off ui-custom-colors class
    let uiModalElements = document.querySelectorAll(".modal");
    uiModalElements.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clr1, "important");
    });
    let uiH1Elements = document.querySelectorAll("h1");
    uiH1Elements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiH2Elements = document.querySelectorAll("h2");
    uiH2Elements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiH3Elements = document.querySelectorAll("h3");
    uiH2Elements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiH4Elements = document.querySelectorAll("h4");
    uiH2Elements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiPElements = document.querySelectorAll("p");
    uiPElements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiLableElements = document.querySelectorAll("label");
    uiLableElements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiOwnedTagElements = document.querySelectorAll(".owned-tag");
    uiOwnedTagElements.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clremph, "important");
        e.style.setProperty("color", cssKeyColorSet.clr1, "important");
    });
    let ui = document.querySelectorAll(".owned-tag");
    uiOwnedTagElements.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clremph, "important");
        e.style.setProperty("color", cssKeyColorSet.clr1, "important");
    });
    let uiItemCardElements = document.querySelectorAll(".item-card");
    uiItemCardElements.forEach(e => {
        e.style.setProperty("background-color", cssKeyColorSet.clr1, "important");
    });
    let uiItemCardNameElements = document.querySelectorAll(".item-name");
    uiItemCardNameElements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiItemCostElements = document.querySelectorAll(".item-cost");
    uiItemCostElements.forEach(e => {
        e.style.setProperty("color", cssKeyColorSet.clr2, "important");
    });
    let uiItemCommon = document.querySelectorAll(".common");
    uiItemCommon.forEach(e => {
        e.style.setProperty("border","7px solid" + cssKeyColorSet.clrcommon, "important");
    });
    let uiItemRare = document.querySelectorAll(".rare");
    uiItemRare.forEach(e => {
        e.style.setProperty("border","7px solid" + cssKeyColorSet.clrrare, "important");
    });
    let uiItemUnique = document.querySelectorAll(".unique");
    uiItemUnique.forEach(e => {
        e.style.setProperty("border","7px solid" + cssKeyColorSet.clrunique, "important");
    });
    let uiItemMythic = document.querySelectorAll(".mythic");
    uiItemMythic.forEach(e => {
        e.style.setProperty("border","7px solid" + cssKeyColorSet.clrmythic, "important");
    });
   
  }
*/
