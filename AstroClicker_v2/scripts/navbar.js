function toggleNavHam(){
    try {
      let navLinks = document.getElementById("navLinks");
      let navHamBtn = document.getElementById("btnHam");
      
      if (navLinks.style.display == "block"){
        navLinks.classList.remove("nav-mobile");
        navLinks.style.display = "none";
        navHamBtn.focus();
      }
      else{
        navLinks.classList.add("nav-mobile");
        navLinks.style.display = "block";
        navLinks.focus();
      }
    } catch (error) {
      alert(genericErMsg + error);
    }
  }