function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("recipeCardTemplate"); // Template for the card

    db.collection(collection)
        .get()
        .then(allRecipes => {
            allRecipes.forEach(doc => {
                var name = doc.data().name;
                var description = doc.data().description;
                var docID = doc.id;

                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector('.card-title').innerHTML = name;
                newCard.querySelector('.card-text').innerHTML = description;
                newCard.querySelector('a').href = "each_dev_recipe.html?docID=" + docID;

                // Attach the new card to the container with id "devRecipes"
                document.getElementById("devRecipes").appendChild(newCard);
            })
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
}

displayCardsDynamically("DevRecipes");


// Function to fetch data from Firestore and populate cards
async function fetchAndPopulateCards() {
    const recipesRef = db.collection("Recipes"); // Reference to your collection, adjust as needed

    // Get all recipes from Firestore
    const querySnapshot = await recipesRef.get();

    // Get the container element where we will insert the cards
    const devRecipesContainer = document.getElementById("devRecipes");

    // Loop through each recipe document from the Firestore collection
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create a new card element for each recipe
        const card = document.createElement("div");
        card.classList.add("col");

        // Set the inner HTML of the card
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <a href="recipe-detail.html?docID=${doc.id}" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;

        // Append the new card to the container
        devRecipesContainer.appendChild(card);
    });
}

// Call the function to fetch data and populate the cards
fetchAndPopulateCards();