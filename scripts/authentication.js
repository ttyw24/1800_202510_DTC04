// authentication.js - Handles login/sign-up and Firestore user doc creation

window.onload = function () {
    document.getElementById("login-form").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      const db = firebase.firestore();
  
      // Try to sign in first
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("🔐 Logged in as existing user:", userCredential.user.email);
          window.location.href = "main.html";
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(async (userCredential) => {
                const user = userCredential.user;
                console.log("✅ New user created:", user.email);
  
                await user.updateProfile({ displayName: name });
                console.log("👤 Display name set to:", name);
  
                console.log("📤 Attempting to write user to Firestore...");

                try {
                await db.collection("Users").doc(user.uid).set({
                    name: name,
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log("✅ Firestore user document successfully created!");
                window.location.href = "main.html";
                } catch (err) {
                console.error("🔥 Firestore write FAILED:", err);
                }

                
              })
              .catch((err) => {
                console.error("❌ Error creating user:", err.message);
                alert("Error: " + err.message);
              });
          } else {
            console.error("❌ Login failed:", error.message);
            alert("Error: " + error.message);
          }
        });
    });
  };
  