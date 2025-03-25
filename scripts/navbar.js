document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-placeholder");
    if (!navbarContainer) {
      console.warn("No navbar placeholder found.");
      return;
    }
  
    fetch("components/navbar.html")
      .then((res) => res.text())
      .then((data) => {
        navbarContainer.innerHTML = data;
  
        // Wait until Firebase is ready
        if (typeof firebase === "undefined") {
          console.error("❌ Firebase not loaded. Make sure firebaseAPI_TEAMDTC04.js is included first.");
          return;
        }
  
        firebase.auth().onAuthStateChanged((user) => {
          const loginNav = document.getElementById("loginNav");
          const logoutNav = document.getElementById("logoutNav");
  
          if (user) {
            if (loginNav) loginNav.style.display = "none";
            if (logoutNav) logoutNav.style.display = "block";
          } else {
            if (loginNav) loginNav.style.display = "block";
            if (logoutNav) logoutNav.style.display = "none";
          }
        });
      })
      .catch((err) => {
        console.error("❌ Failed to load navbar:", err);
      });
  });
  
  // Logout function
  function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    });
  }
  