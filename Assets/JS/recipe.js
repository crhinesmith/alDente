let currentGenre = ""
let currentRecipe = ""
let currentRecipeId = ""


function makeList() {
  var savedRecipe = prompt("would you like to save this recipe?")

  if (savedRecipe = true) {
    alert("saved to cookbook!");
  } else {
    alert("oh bummer"); return null
  }

  var recipesSaved = confirm();

  var recipesSaved = {
    savedRecipe: savedRecipe,
  };

  return recipesSaved
}

const cookBook = document.getElementById("cookBook");
const input = document.getElementById("input");
const recipeSubmit = document.getElementById("recipeSubmit");
const recipes = document.getElementById("recipes");

let recipeList = localStorage.getItem("recipes")
  ? JSON.parse(localStorage.getItem("recipes"))
  : [];

cookBook.addEventListener("submit", (e) => {
  e.preventDefault();
  currentGenre = "Chicken"
  currentRecipe = "Chick-Fil-A Sandwich"
  currentRecipeId = "53016"
  const recipeObject = {
    genre: currentGenre,
    recipe: currentRecipe,
    recipeId: currentRecipeId,
  }
  recipeList.push(recipeObject);
  localStorage.setItem("recipes", JSON.stringify(recipeList));
  listBuilder(input.value);
  input.value = "";
});

const listBuilder = (text) => {
  const recipe = document.createElement("li");
  recipe.innerHTML = text + ' <button onclick="deleteRecipe(this)">x</button>';
  recipes.appendChild(recipe);
};

const getRecipe = JSON.parse(localStorage.getItem("recipes"));
//getNotes.forEach((recipe) => {
//listBuilder(recipe);
//});

const deleteNote = (btn) => {
  let el = btn.parentNode;
  const index = [...el.parentElement.children].indexOf(el);
  recipeStorage.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipeStorage));
  el.remove();
  // this seems to work kind of. it will display if i put it in the console but not without console. i want to beable to hit save and it saves to local storage AND displays a list in Cookbook html 
  for (var i = 0; i < localStorage.length; i++) {
    alert(localStorage.getItem(localStorage.key(i)));
    cookBook.addEventListener("submit");
  }
};


