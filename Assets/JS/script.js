// variables
var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("search-text");

// Working on fetch request with search bar

// Define the function triggered by 'submit' in homepage search bar
function handleSearchForm(e){
    // prevent default
    e.preventDefault(); 
    // On click, log the value typed into the form
    console.log(userInput.value);
}

// Event listener, upon search
searchFormEl.addEventListener('click', handleSearchForm); 


const 