// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         fetchAndDisplayRecipes();
//     } else {
//         window.location.href = "login.html";
//     }
// });

// let currentRecipeId = null;

// async function fetchAndDisplayRecipes() {
//     const user = firebase.auth().currentUser;
//     if (!user) {
//         alert("You must be logged in.");
//         return;
//     }

//     const select = document.getElementById("recipeSelect");
//     const seenNames = new Set();

//     const recipesRef = db.collection("Users").doc(user.uid).collection("MyRecipes");
//     const recipesSnapshot = await recipesRef.orderBy("createdAt", "desc").get();

//     select.innerHTML = `<option value="">-- Select --</option>`;

//     recipesSnapshot.forEach(async (doc) => {
//         const data = doc.data();

//         if (!data.name || !data.ingredients || data.ingredients.length === 0) {
//             await recipesRef.doc(doc.id).delete();
//             console.log(`Deleted empty or unnamed recipe: ${doc.id}`);
//             return;
//         }

//         const recipeName = data.name;

//         if (!seenNames.has(recipeName)) {
//             seenNames.add(recipeName);

//             const option = document.createElement("option");
//             option.value = doc.id;
//             option.textContent = recipeName;
//             select.appendChild(option);
//         }
//     });

//     select.addEventListener("change", async function () {
//         const recipeId = this.value;
//         currentRecipeId = recipeId;
//         const deleteBtn = document.getElementById("deleteRecipeBtn");

//         if (recipeId) {
//             const recipeDoc = await recipesRef.doc(recipeId).get();
//             const recipeData = recipeDoc.data();
//             displayRecipe(recipeData.name, recipeData.ingredients);
//             deleteBtn.style.display = "inline-block";
//         } else {
//             document.getElementById("recipeDetails").innerHTML = "";
//             deleteBtn.style.display = "none";
//         }
//     });

//     document.getElementById("deleteRecipeBtn").addEventListener("click", async () => {
//         if (currentRecipeId && confirm("Are you sure you want to delete this recipe?")) {
//             await recipesRef.doc(currentRecipeId).delete();
//             location.reload();
//         }
//     });
// }

// function displayRecipe(recipeName, ingredients) {
//     const container = document.getElementById("recipeDetails");
//     container.innerHTML = `<h2>${recipeName}</h2><h3>Ingredients & Cooking Times (In Order)</h3>`;

//     ingredients.forEach((ing, index) => {
//         const step = document.createElement("div");
//         step.className = "step";
//         step.innerHTML = `
//           <h3>${index + 1}. ${ing.name}</h3>
//           <p><span class="highlight">Start Time:</span> ${ing.time}</p>
//           <p><span class="highlight">Cook Time:</span> ${ing.cookTime} minutes</p>
//           <p><span class="highlight">Method:</span> ${ing.method}</p>
//         `;
//         container.appendChild(step);
//     });
// }
