const devRecipeButton = document.getElementById('devRecipe1');
devRecipeButton.addEventListener('click', function () {
    // Define the docID you want to use (this can be dynamic or fixed based on your data)
    const docID = "2q4g5N71LwEpnnmM1fFv";  // You can replace this with a dynamic value or fetch it from a data attribute

    // Redirect to the next page using the docID
    window.location.href = "each_dev_recipe.html?docID=" + docID;
});


function displayRecipe(recipeName, ingredients) {
    const container = document.getElementById("devrecipeDetails");
    container.innerHTML = `<h2>${recipeName}</h2><h3>Ingredients & Cooking Times (In Order)</h3>`;

    ingredients.forEach((ing, index) => {
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