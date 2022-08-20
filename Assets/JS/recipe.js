// let currentGenre = ""
// let currentRecipe = ""
// let currentRecipeId = ""

var clickedRecipeId = localStorage.getItem('clickedRecipe');
var clickedRecipeName = localStorage.getItem('clickedName');


var generatedMeal = {
  ingredients: [],
  measurements: [],
  recipe: "",
  instructions: "",
}

function generateHTML (selectedMealData) {
  var h1El = document.getElementById('recipe-title');
  var ingredientsEl = document.getElementById('ingredient-cont');
  var instructionsEl = document.getElementById('instructions-cont');
  var ingredientsListEl = document.getElementById('ingredients-list');

  h1El.textContent = selectedMealData.recipe

  var instructionsText = document.createElement('p');
  instructionsText.textContent = selectedMealData.instructions

  for (var i = 0; i< selectedMealData.ingredients.length ;i++){
    var ingredientsItem = document.createElement('li');
    ingredientsItem.textContent = selectedMealData.measurements[i] + " " + selectedMealData.ingredients[i];
    ingredientsListEl.appendChild(ingredientsItem);
}

  instructionsEl.append(instructionsText)
  ingredientsEl.append(ingredientsListEl)

  
}

function getRecipeByIdData(){
  fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + clickedRecipeId)
    .then(function (response) {
      return response.json()
  })
    .then(function (data) {
      generatedMeal.recipe = data.meals[0].strMeal
      generatedMeal.instructions = data.meals[0].strInstructions
      var meal = data.meals[0]
      for (var e = 1; e < 21; e++) {
        var ingredient = generatedMeal["strIngredient" + e]
        var measurement = generatedMeal["strMeasure" + e]
        if (ingredient !== null && ingredient !== "") {
            generatedMeal.ingredients.push(meal["strIngredient" + e])
        }

        if (measurement !== null && measurement !== "") {
            generatedMeal.measurements.push(meal["strMeasure" + e])
        }
    }
    generateHTML(generatedMeal)
  })
}

function whichType() {
  if (localStorage.getItem('type') === 'genre') {
    getRecipeByIdData();
  }
  else if (localStorage.getItem('type') === 'name') {
    getRecipeByNameData()
  }
}

whichType()

function getRecipeByNameData(){
  console.log('yelp');
  console.log(JSON.stringify(clickedRecipeName));
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + clickedRecipeName)
    .then(function (response) {
      return response.json()
  })
    .then(function (data) {
      generatedMeal.recipe = data.meals[0].strMeal;
      //console.log(generatedMeal.recipe);
      generatedMeal.instructions.textContent = data.meals[0].strInstructions;
      var meal = data.meals[0]
      for (var e = 1; e < 21; e++) {
        var ingredient = generatedMeal["strIngredient" + e]
        var measurement = generatedMeal["strMeasure" + e]
        if (ingredient !== null && ingredient !== "") {
            generatedMeal.ingredients.push(meal["strIngredient" + e])
        }

        if (measurement !== null && measurement !== "") {
            generatedMeal.measurements.push(meal["strMeasure" + e])
        }
    }
    generateHTML(generatedMeal);
  })
  
}


// function makeList() {
//   var savedRecipe = prompt("would you like to save this recipe?")

//   if (savedRecipe = true) {
//     alert("saved to cookbook!");
//   } else {
//     alert("oh bummer"); return null
//   }

//   var recipesSaved = confirm();

//   var recipesSaved = {
//     savedRecipe: savedRecipe,
//   };

//   return recipesSaved
// }

// const cookBook = document.getElementById("cookBook");
// const input = document.getElementById("input");
// const recipeSubmit = document.getElementById("recipeSubmit");
// const recipes = document.getElementById("recipes");

// let recipeList = localStorage.getItem("recipes")
//   ? JSON.parse(localStorage.getItem("recipes"))
//   : [];

// cookBook.addEventListener("submit", (e) => {
//   e.preventDefault();
//   currentGenre = "Chicken"
//   currentRecipe = "Chick-Fil-A Sandwich"
//   currentRecipeId = "53016"
//   const recipeObject = {
//     genre: currentGenre,
//     recipe: currentRecipe,
//     recipeId: currentRecipeId,
//   }
//   recipeList.push(recipeObject);
//   localStorage.setItem("recipes", JSON.stringify(recipeList));
//   listBuilder(input.value);
//   input.value = "";
// });

// const listBuilder = (text) => {
//   const recipe = document.createElement("li");
//   recipe.innerHTML = text + ' <button onclick="deleteRecipe(this)">x</button>';
//   recipes.appendChild(recipe);
// };

// const getRecipe = JSON.parse(localStorage.getItem("recipes"));
// //getNotes.forEach((recipe) => {
// //listBuilder(recipe);
// //});

// const deleteNote = (btn) => {
//   let el = btn.parentNode;
//   const index = [...el.parentElement.children].indexOf(el);
//   recipeStorage.splice(index, 1);
//   localStorage.setItem("recipes", JSON.stringify(recipeStorage));
//   el.remove();
//   // this seems to work kind of. it will display if i put it in the console but not without console. i want to beable to hit save and it saves to local storage AND displays a list in Cookbook html 
//   for (var i = 0; i < localStorage.length; i++) {
//     alert(localStorage.getItem(localStorage.key(i)));
//     cookBook.addEventListener("submit");
//   }
// };


