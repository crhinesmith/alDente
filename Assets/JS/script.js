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

// Array. This array will contain pushed recipes filtered by ingredient names
var ingRecipe = []

// Array to hold ALL meal options. Not sure yet if I'll need this
var allMeals = []


// Fetch request for search bar
function searchApi(query, genre) {
    
    // first, I want to fetch lists of data
    urlList = 'https://www.themealdb.com/api/json/v1/1/list.php?'
    listCategories = urlList + 'c=list';
    listIngredients = urlList + 'i=list';
    listArea = urlList + 'a=list';
    console.log(listCategories);

    // fetch category list
    fetch(listCategories)
        .then(function (res) {
            if (!res.ok) {
                throw res.json(); 
            }
            return res.json(); 
        })

        .then(function (categoryData) {
            // variable for length of the category array 
            //console.log(categoryData);
            var catLength = categoryData.meals.length;
            // Loop through each category... If user input matches one of the categories, we will use that data in results page... trigger a function to show no more than 10 recipes in that category
            for (i = 0; i < catLength; i++) {
                // if the category at index is the same as the user input, trigger function to show results!
                if ((JSON.stringify(categoryData.meals[i].strCategory)).toLowerCase() == (JSON.stringify(userQuery)).toLowerCase()) {
                    console.log("YEP");
                    // Call function for results based on user's category
                    //searchByCategory(); // Should this be defined in this JS file or the results JS file?
                }

                // Loop through each category in categoryData, and list all recipes in each category.
                function loopCategories() {
                    var category = (JSON.stringify(categoryData.meals[i].strCategory)).toLowerCase();
                    console.log(category);
                    urlSearchCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category;
                }


                // Call above function
                loopCategories()
            }
        })

    
    
    
     

    // Fetch for ingredients
    /* fetch(listIngredients)
    .then(function (res2) {
        if (!res2.ok) {
            throw res2.json(); 
        }
        return res2.json(); 
    })

    .then(function (ingredientData) {
        // variable for length of ingredient array
        var ingLength = ingredientData.meals.length;
        console.log(ingredientData.meals);
        // Loop through all 574 ingredients 
    }) */


    // URL if user chooses to search by AREA?
    if (genre !== '') {
        recipeUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?c=' + genre;
    } 
    // URL if user searches by search bar
    else {
         // URL for recipe, without parameters
        recipeUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';

        // recipeUrl = recipeUrl + parameter + '=' + query

         
        // if statements to go through parameters
    /*    // category
        if () {
            parameter = 'c'
        } 
        // ingredient
        else if () {
            parameter = 'i' ??
        }
        // name
        else {
            parameter = 's'
        } */

    }

    
} 

// Define the function triggered by 'submit' in homepage search bar
function handleSearchForm(e){
    // prevent default
    e.preventDefault(); 
    //create a variable for user input
    userQuery = userInput.value;
    //create a variable for genre
    userGenre = '';
    // On click, log the value typed into the form
    console.log(userInput.value);
    // Call function to search API and get us requested data
    searchApi(userQuery, userGenre);
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


//This was in main, question for TA//
//searchFormEl.addEventListener('click', handleSearchForm);//
//const// 

