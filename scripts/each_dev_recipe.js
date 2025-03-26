const recipesRef = firebase.firestore().collection("DevRecipes");

async function displayRecipe() {
    let params = new URL(window.location.href); // Get URL of search bar
    let recipeId = params.searchParams.get("docID"); // Get value for key "docID"

    const recipeDoc = await recipesRef.doc(recipeId).get();
    const recipeData = recipeDoc.data();


    const container = document.getElementById("recipeDetails");
    container.innerHTML = `<h2>${recipeData.name}</h2><h3>Ingredients & Cooking Times (In Order)</h3>`;

    // Loop through the ingredients array
    recipeData.ingredients.forEach((ing, index) => {
        const step = document.createElement("div");
        step.className = "step";

        step.innerHTML = `
          <h3>${index + 1}. ${ing.name}</h3>
          <p><span class="highlight">Start Time:</span> ${ing.time}</p>
          <p><span class="highlight">Cook Time:</span> ${ing.cookTime} minutes</p>
          <p><span class="highlight">Method:</span> ${ing.method}</p>
        `;

        container.appendChild(step);
    });
}

displayRecipe();
