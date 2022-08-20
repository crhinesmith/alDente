
// Querying TheMealDb for Recipie results that match the selected search parameters //    
function getSelectedGenreRecipes () {
    var fromIndex = globalThis.mySharedData.resultsData;
    var queryRecipes = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + fromIndex//+ whatever selection var is chosen from homepage;
    fetch(queryRecipes)
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

    });

    }



    // Event listener for the selected recipe brief overview tile, brings user to full recipe breakout //
//     $("").on("click", function(event) {
//     event.preventDefault();
//     console.log("Button pressed!");
// });

// Event listener for the navbar button //
$("#resultsNavBtn").on("click", function() {
console.log("Button pressed!");
location.href = "Assets\\HTML\\cookbook.html"
});

// If I have time try to make this work //
// $("#arrowLeft").on("click", function() {
//     console.log("Button pressed!");
//     i -= 12;
//     });

// $("#arrowRight").on("click", function() {
//     console.log("Button pressed!");
//     i = 12;
//     });
