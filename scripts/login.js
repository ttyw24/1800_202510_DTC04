// login.js

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      const db = firebase.firestore();
      const userRef = db.collection("Users").doc(user.uid);
  
      try {
        const doc = await userRef.get();
        if (!doc.exists) {
          // Try to pull name from the input (fallback to displayName or Anonymous)
          const nameInput = document.getElementById("signupName");
          const name = nameInput ? nameInput.value : user.displayName || "Anonymous";
  
          // Update Firebase Auth profile (optional if not set yet)
          if (!user.displayName && name) {
            await user.updateProfile({ displayName: name });
          }
  
          await userRef.set({
            name: name,
            email: user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log("✅ New user document created in Firestore with name:", name);
        } else {
          console.log("🔄 User already exists in Firestore.");
        }
      } catch (error) {
        console.error("🔥 Error creating user document:", error);
      }
    } else {
      console.log("🚪 User signed out or not logged in.");
    }
  });