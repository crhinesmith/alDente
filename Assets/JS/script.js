// variables
var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("search-text");
var APIKey = "1";
var recipeOTDContainer = document.getElementById("recipe-today")

//object for meal of the day
var mealOTD = {
    ingredients: [],
    measurements: [],
    recipe: "",
    timeDataWasRetrieved: ""
}

// Working on fetch request with search bar

// Define the function triggered by 'submit' in homepage search bar
function handleSearchForm(e) {
    // prevent default
    e.preventDefault();
    // On click, log the value typed into the form
    console.log(userInput.value);
}

// Event listener, upon search
searchFormEl.addEventListener('click', handleSearchForm);

function makeHTML(mealData) {
    console.log(mealData)
    var h1El = document.createElement('h1');
    h1El.textContent = "Try the Recipe of the Day...";

    var h3El = document.createElement('h2');
    h3El.textContent = mealOTD.recipe;

    var h3El = document.createElement('h2');
    h3El.textContent = "Ingredients:"

    var ulEl = document.createElement('ul')
    // make html

    recipeOTDContainer.append(h1El)

   
}

function getData() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            mealOTD.recipe = data.meals[0].strMeal
            var meal = data.meals[0]
            for (var e = 1; e < 21; e++) {
                var ingredient = mealOTD["strIngredient" + e]
                var measurement = mealOTD["strMeasure" + e]
                if (ingredient !== null && ingredient !== "") {
                    mealOTD.ingredients.push(meal["strIngredient" + e])
                }

                if (measurement !== null && measurement !== "") {
                    mealOTD.measurements.push(meal["strMeasure" + e])
                }
            }
            var today =  moment().format('YYYY-MM-DD');
            console.log(today)
            mealOTD.timeDataWasRetrieved = today
            localStorage.setItem('mealOfTheDay', JSON.stringify(mealOTD))
            makeHTML(mealOTD)
        })
}

function generateRecipeOTD() {
    while (recipeOTDContainer.firstChild) {
        recipeOTDContainer.removeChild(recipeOTDContainer.firstChild)
    }

    var savedData = localStorage.getItem('mealOfTheDay') // read from local storage

    
    if (savedData !== null) {
        // use the data already
        var todaysDate = moment().format('YYYY-MM-DD')
        if (moment(todaysDate).isAfter(mealOTD.timeDatawasRetrieved)) {
            getData()
        } else {
            // use saved data
            var parsedData = JSON.parse(savedData)
            makeHTML(parsedData)
        }
    } else {
        getData()
    }
}
generateRecipeOTD();


<<<<<<< HEAD
=======
//This was in main, question for TA//
//searchFormEl.addEventListener('click', handleSearchForm);//
//const// 

>>>>>>> 6fa9237f7003c3d6aa67dd3063de6373f62fd9a8
