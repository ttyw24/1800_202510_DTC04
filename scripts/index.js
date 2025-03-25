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