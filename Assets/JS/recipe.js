const cookBook = document.getElementById("cookBook");
const input = document.getElementById("input");
const recipeSubmit = document.getElementById("recipeSubmit");
const recipes = document.getElementById("recipes");

let recipeList = localStorage.getItem("recipes")
  ? JSON.parse(localStorage.getItem("recipes"))
  : [];

  cookBook.addEventListener("submit", (e) => {
    e.preventDefault();
    recipeList.push(input.value);
    localStorage.setItem("recipes", JSON.stringify(recipeList));
    listBuilder(input.value);
    input.value = "";
  });

  const listBuilder = (text) => {
    const recipe = document.createElement("li");
    recipe.innerHTML = text + ' <button onclick="deleteNote(this)">x</button>';
    recipes.appendChild(recipe);
  };

  const getNotes = JSON.parse(localStorage.getItem("recipes"));
//getNotes.forEach((recipe) => {
 // listBuilder(recipe);
//});

const deleteNote = (btn) => {
    let el = btn.parentNode;
    const index = [...el.parentElement.children].indexOf(el);
    recipeStorage.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipeStorage));
    el.remove();
  };