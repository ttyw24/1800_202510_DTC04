

const ingredientsData = [
  {
    name: "chicken breast",
    methods: {
      "Pan Fry": 6,
      "Bake": 25,
      "Grill": 10,
      "Boil": 20,
      "Steam": 15
    }
  },
  {
    name: "chicken thigh",
    methods: {
      "Pan Fry": 10,
      "Bake": 35,
      "Grill": 12,
      "Boil": 30,
      "Steam": 25
    }
  },
  {
    name: "chicken wings",
    methods: {
      "Pan Fry": 10,
      "Bake": 45,
      "Grill": 20,
      "Boil": 30
    }
  },
  {
    name: "steak",
    methods: {
      "Pan Fry": 6,
      "Grill": 8,
      "Bake": 15
    }
  },
  {
    name: "egg",
    methods: {
      "Boil": 10,
      "Fry": 3,
      "Steam": 12
    }
  },
  {
    name: "onion",
    methods: {
      "Fry": 7,
      "Bake": 30,
      "Grill": 10,
      "Boil": 15
    }
  },
  {
    name: "garlic",
    methods: {
      "Fry": 2,
      "Roast": 30,
      "Boil": 10
    }
  },
  {
    name: "potato",
    methods: {
      "Boil": 20,
      "Roast": 45,
      "Fry": 10,
      "Steam": 25
    }
  },
  {
    name: "broccoli",
    methods: {
      "Steam": 6,
      "Boil": 5,
      "Stir Fry": 4
    }
  },
  {
    name: "carrot",
    methods: {
      "Steam": 7,
      "Boil": 10,
      "Roast": 25,
      "Fry": 6
    }
  },
  {
    name: "green pepper",
    methods: {
      "Fry": 5,
      "Grill": 10,
      "Steam": 7
    }
  },
  {
    name: "mushroom",
    methods: {
      "Fry": 5,
      "Grill": 10,
      "Steam": 7
    }
  },
  {
    name: "salmon",
    methods: {
      "Pan Fry": 6,
      "Bake": 12,
      "Grill": 10,
      "Steam": 10
    }
  },
  {
    name: "zucchini",
    methods: {
      "Grill": 5,
      "Roast": 20,
      "Fry": 6,
      "Steam": 4
    }
  },
  {
    name: "tofu",
    methods: {
      "Fry": 8,
      "Bake": 30,
      "Grill": 10
    }
  },
  {
    name: "cauliflower",
    methods: {
      "Steam": 8,
      "Boil": 10,
      "Roast": 25
    }
  },
  {
    name: "spinach",
    methods: {
      "Steam": 3,
      "Sauté": 4,
      "Boil": 2
    }
  }
];

ingredientsData.forEach(async (ingredient) => {
  await db.collection("Ingredients").add(ingredient);
  console.log(`✅ Added ${ingredient.name}`);
});
