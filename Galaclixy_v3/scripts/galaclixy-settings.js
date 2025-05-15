//Get Settings Inputs -------------------------------
//Difficulty Settings
let cbxHealth = document.getElementById("cbxHealth"); // ---------------done
let rngObjSpeed = document.getElementById("rngObjSpeed");
let cbxAltGameMode = document.getElementById("cbxAltGameMode");

//Accessibility Settings
let clrUIBG = document.getElementById("clrUIBG"); // ---------------done
let clrUIText = document.getElementById("clrUIText"); // ---------------done
let cbxHighContrast = document.getElementById("cbxHighContrast"); // ---------------done
let rngColorBlind = document.getElementById("rngColorBlind"); // -----------------done
let cbxBlackWhite = document.getElementById("cbxBlackWhite"); // ---------------done
let cbxDarkMode = document.getElementById("cbxDarkMode");//--------------- done
let cbxCustomCursors = document.getElementById("cbxCustomCursors"); // ---------------done
let cbxTargetBox = document.getElementById("cbxTargetBox"); // ---------------done

//Performance
let cbxStarAnimations = document.getElementById("cbxStarAnimations"); //----------------done
//let cbxObjAnimations = document.getElementById("cbxObjAnimations");
let cbxShipRotation = document.getElementById("cbxShipRotation"); //-------------done

//Data Settings in functions

//Settings Variables
let cssKeyColorSet;
let invincible = false;
let altGameMode = false;
let userCustomUIHex;
let uiColorModeHealth;
let activeColorMode = "default";




//Remove all animations if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {

        //noHomePlanet
        document.getElementById("homePlanet").style.display = "none";
        //invincible
        cbxHealth.checked = true;
        invincible = true;

        //no stars
        document.documentElement.classList.add("stars-off");
        cbxStarAnimations.checked = false;

        //alt game mode
        altGameMode = true;

        //no ship rotation
        document.documentElement.classList.add("player-rotation-off");
        cbxShipRotation.checked = false;
        player.style.transform = "rotate(0deg)";

    }




//Invincible?
cbxHealth.addEventListener("change", (e) => {
    if(cbxHealth.checked){
        invincible = true;
    }
    else{
        invincible = false;
    }
  });

//Alt Game mode activated?
cbxAltGameMode.addEventListener("change", (e) => {
    if(cbxAltGameMode.checked){
        altGameMode = true;
        invincible = true;
        cbxHealth.checked = true;
    }
    else{
        altGameMode = false;
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
