const recipesRef = firebase.firestore().collection("DevRecipes");

async function displayRecipe(recipeName, ingredients) {
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

        // Append the step to the container
        container.appendChild(step);
    });
}

// Sample call with a recipe and ingredients
const recipeName = "Spaghetti Bolognese";
const ingredients = [
    {
        name: "Onion",
        time: "Start by chopping the onion",
        cookTime: 5,
        method: "Sauté the onion in oil until translucent."
    },
    {
        name: "Tomato Sauce",
        time: "Add tomato sauce",
        cookTime: 15,
        method: "Simmer with the ground beef."
    },
    {
        name: "Spaghetti",
        time: "Boil water and add spaghetti",
        cookTime: 10,
        method: "Cook spaghetti until al dente."
    }
];

// Display the recipe with sample data
displayRecipe(recipeName, ingredients);
