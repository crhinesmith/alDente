// variables
var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("search-text");
var APIKey = "1";
var recipeOTDContainer = document.getElementById("recipe-today")
var searchGenre = document.getElementById("searchGenre");
var resultsURL = 'Assets/HTML/results.html';

// Array to hold ALL meal options. Not sure yet if I'll need this
var allMeals = [];

// Clicked element to send to results page
globalThis.mySharedData = {resultsData: ''};

//object for meal of the day
var mealOTD = {
    ingredients: [],
    measurements: [],
    recipe: "",
    timeDataWasRetrieved: "",
    instructions: "",
}

// Indigo's code
// Search API
function getRecipeArray () {
// first, I want to fetch lists of data
urlList = 'https://www.themealdb.com/api/json/v1/1/list.php?'
listCategories = urlList + 'c=list';
listIngredients = urlList + 'i=list';
listArea = urlList + 'a=list';
console.log(listCategories);

fetch(listCategories)
.then(function (res) {
    if (!res.ok) {
        throw res.json(); 
    }
    return res.json(); 
})

.then (function (categoryData) {
    console.log(categoryData);
    catLength = categoryData.meals.length;
    console.log(catLength);

    for (i = 0; i < catLength; i++) {
        // Loop through each category in categoryData, and list all recipes in each category.
        var category = (JSON.stringify(categoryData.meals[i].strCategory)).toLowerCase();
        category = JSON.parse(category);
        //console.log(category);

        // Because this is in a loop, it will plug each category into the url.
        urlSearchCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category;
        //console.log(urlSearchCat);

        // Request data from each url
        fetch (urlSearchCat)
        .then(function (res3) {
            if (!res3.ok) {
                throw res3.json(); 
            }
            return res3.json(); 
        })
        .then (function(print) {
            //console.log(print.meals);
            // ANOTHER for loop to get each index (meal) of each of the 14 categories
            for (b = 0; b < print.meals.length; b++) {
                allMeals.push(print.meals[b]);
                // make a variable for the id of each meal
                //var mealID = print.meals[b].idMeal;
                // here is the url for each meal
                //mealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealID;
            }

        })

    }

    // Autocomplete Widget
    $(function () {
        console.log(allMeals);
        // will populate this with allMeals[x].strMeal.
        var mealNames = []; 
        // for loop to populate mealNames array
        for (x = 0; x < allMeals.length; x++) {
            //console.log(JSON.stringify(allMeals[x].strMeal));
            mealNames.push(JSON.stringify(allMeals[x].strMeal));
        }
        console.log(mealNames);
        $('#search-text').autocomplete({
            source: mealNames,
        });
    });
     
})

};

getRecipeArray();

// For Search by Genre
// This selects all li elements (the 14 categories) inside the ul 
var selectedGenre = searchGenre.querySelectorAll('li');
//console.log(selectedGenre[4].innerHTML);

// Loop through each category to give each of the li elements a click event
for (z = 0; z < 14; z++) {

    
    selectedGenre[z].addEventListener('click', function getSelectedGenreRecipes (event) {
        console.log(event.target);
        var listEl = event.target;
        //console.log(listEl.innerHTML);
        var clickedCategory = listEl.innerHTML
        globalThis.mySharedData = {resultsData: clickedCategory};
        //var queryRecipes = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + clickedCategory//+ whatever selection var is chosen from homepage;
        // Also call this function to switch to the results page
        function switchPage() {
            location.href = resultsURL;
        };

        switchPage();
    }, 
    );
}      


        // Copied Tyler's code from results.js
        // Querying TheMealDb for Recipie results that match the selected search parameters // 
    /*    fetch(queryRecipes)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for(var i = 0; i < 9; i++)
            $("#recipeSuggestions").append(
                `<div class="flex flex-col border-solid border-2 border-light-blue-500 resultCards" id="${data.meals[i].idMeal}">
                    <p class="h-1/5" id="resultsText">${data.meals[i].strMeal}</p>
                    <img class="justify-self-end h-4/5"src=${data.meals[i].strMealThumb}>
                </div>`
            )
        }); */

        
    

   



// Calvin's code
function makeHTML(mealData) {
    var h1El = document.createElement('h1');
    h1El.textContent = "Try the Recipe of the Day...";

    var h2El = document.createElement('h2');
    h2El.textContent = mealData.recipe;

    var h4El = document.createElement('h4');
    h4El.textContent = "Ingredients:" 

    var ulEl = document.createElement('ul')
    
    for (var i = 0; i< mealData.ingredients.length ;i++){
        var ingredientsItem = document.createElement('li');
        ingredientsItem.textContent = mealData.measurements[i] + " " + mealData.ingredients[i];
        ulEl.appendChild(ingredientsItem);
    }

    var instructionsEl = document.createElement('p')
    instructionsEl.textContent = "Instructions: " + mealData.instructions;

    recipeOTDContainer.append(h1El, h2El, h4El, ulEl, instructionsEl)
}

function getData() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            mealOTD.recipe = data.meals[0].strMeal
            mealOTD.instructions = data.meals[0].strInstructions
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
    console.log('help')
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


