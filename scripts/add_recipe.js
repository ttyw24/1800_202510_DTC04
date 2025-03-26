let ingredientsData = {};
let selectedIngredients = [];

async function loadIngredients() {
  const snapshot = await db.collection("Ingredients").get();
  ingredientsData = {};
  snapshot.forEach(doc => {
    const data = doc.data();
    const name = data.name;
    const methods = data.methods;

    if (!ingredientsData[name]) {
      ingredientsData[name] = {};
    }

    for (let method in methods) {
      ingredientsData[name][method] = methods[method];
    }
  });

  populateIngredientDropdown();
}

function populateIngredientDropdown() {
  ingredientDropdown.innerHTML = "";
  const ingredientNames = Object.keys(ingredientsData).sort();
  ingredientNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    ingredientDropdown.appendChild(option);
  });

  updateMethodDropdown();
}

function updateMethodDropdown() {
  methodDropdown.innerHTML = "";

  const selectedIngredient = ingredientDropdown.value;
  const methods = ingredientsData[selectedIngredient];

  if (!methods) {
    const opt = document.createElement("option");
    opt.textContent = "No methods available";
    opt.disabled = true;
    methodDropdown.appendChild(opt);
    return;
  }

  Object.keys(methods).forEach(method => {
    const option = document.createElement("option");
    option.value = method;
    option.textContent = method;
    methodDropdown.appendChild(option);
  });
}

function updatePreview() {
  previewList.innerHTML = "";

  const sorted = Object.values(selectedIngredients).sort((a, b) => b.cookTime - a.cookTime);
  const maxTime = sorted.length > 0 ? sorted[0].cookTime : 0;

  sorted.forEach((item, index) => {
    const li = document.createElement("li");
    const startAt = maxTime - item.cookTime;
    li.textContent = `${index + 1}. ${item.name} (${item.method}, ${item.cookTime} min) - Start at ${startAt}:00`;


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.addEventListener("click", () => deleteIngredient(item.name, item.method)); // Handle deletion


    li.appendChild(deleteBtn);


    previewList.appendChild(li);
  });
}


function deleteIngredient(name, method) {
  const key = `${name}-${method}`;
  delete selectedIngredients[key];
  updatePreview();
}

ingredientDropdown.addEventListener("change", updateMethodDropdown);

document.getElementById("addIngredientBtn").addEventListener("click", () => {
  const name = ingredientDropdown.value;
  const method = methodDropdown.value;

  if (!ingredientsData[name] || !ingredientsData[name][method]) {
    alert("Invalid ingredient or method.");
    return;
  }

  const cookTime = ingredientsData[name][method];
  selectedIngredients[`${name}-${method}`] = { name, method, cookTime };

  updatePreview();
});

document.getElementById("recipeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please log in first.");
    return;
  }

  const recipeName = document.getElementById("recipeName").value.trim();
  if (!recipeName || Object.keys(selectedIngredients).length === 0) {
    alert("Please provide a recipe name and ingredients.");
    return;
  }

  const sorted = Object.values(selectedIngredients).sort((a, b) => b.cookTime - a.cookTime);
  const maxTime = sorted[0].cookTime;

  const schedule = sorted.map(item => ({
    name: item.name,
    method: item.method,
    cookTime: item.cookTime,
    time: `${maxTime - item.cookTime}:00`
  }));

  const recipe = {
    name: recipeName,
    ingredients: schedule,
    totalTime: `${maxTime}:00`,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  const recipesRef = db.collection("Users").doc(user.uid).collection("MyRecipes");
  // const existing = await recipesRef.where("name", "==", recipeName).get();

  const recipeId = new URLSearchParams(window.location.search).get("docID");

  if (recipeId) {
    await recipesRef.doc(recipeId).update(recipe);
  } else {
    const existing = await recipesRef.where("name", "==", recipeName).get();
    if (!existing.empty) {
      const confirmOverwrite = confirm(`A recipe named '${recipeName}' already exists. Overwrite it?`);
      if (!confirmOverwrite) return;

      const batch = db.batch();
      existing.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }
  }


  // if (!existing.empty) {
  //   const confirmOverwrite = confirm(`A recipe named '${recipeName}' already exists. Overwrite it?`);
  //   if (!confirmOverwrite) return;

  //   const batch = db.batch();
  //   existing.forEach(doc => batch.delete(doc.ref));
  //   await batch.commit();
  // }

  await recipesRef.add(recipe);

  alert("✅ Recipe saved successfully!");
  selectedIngredients = {};
  document.getElementById("recipeForm").reset();
  previewList.innerHTML = "";
  updateMethodDropdown();

  // Redirect to my_recipes.html
  window.location.href = "my_recipes.html";
});


async function prePopulateForm() {
  let params = new URL(window.location.href); //get URL of search bar
  let recipeId = params.searchParams.get("docID"); //get value for key "id"

  if (recipeId != null) {
    const user = firebase.auth().currentUser;
    const recipesRef = db.collection("Users").doc(user.uid).collection("MyRecipes");
    const recipeDoc = await recipesRef.doc(recipeId).get();
    const recipeData = recipeDoc.data();
    document.getElementById("recipeName").value = recipeData.name;
    document.getElementById("pageTitle").innerText = "Edit Saved Recipe"
    recipeData.ingredients.forEach((element) => {
      const cookTime = element.cookTime;
      const name = element.name;
      const method = element.method;
      selectedIngredients[`${name}-${method}`] = { name, method, cookTime };
    })
    updatePreview();
  }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    loadIngredients();
    prePopulateForm();
  }
});
