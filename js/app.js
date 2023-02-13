const loadData = async (cocktailName) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
    const data = await res.json();
    displayCocktails(data.drinks);
}

const displayCocktails = cocktails => {
    const cocktailContainer = document.getElementById('cocktail-container');
    cocktailContainer.textContent = '';
    cocktails.forEach(cocktail => {
        console.log(cocktail)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" onclick="loadDetails(${cocktail.idDrink})" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-center">${cocktail.strDrink}</h5>
              </div>
        </div>
        `
        cocktailContainer.appendChild(div);
    })
}

document.getElementById('btn-search').addEventListener('click', function() {
    processSearch()
})

document.getElementById('search-field').addEventListener('keydown', function(event) {
    const key = event.key;
    if(key === 'Enter') {
        processSearch();
    }
})

const processSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadData(searchValue);
}

const loadDetails = async (cocktailId) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
    const data = await res.json();
    displayDetails(data.drinks[0]);
}

const displayDetails = details => {
    console.log(details);
    const detailContainer = document.getElementById('detail-container');
    detailContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="img-fluid" src="${details.strDrinkThumb}"/>
    <h3 class="my-3">${details.strDrink}</h3>
    <p><span class="fw-semibold">Category:</span> ${details.strCategory}</p>
    <p><span class="fw-semibold">Ingredient:</span> ${details.strIngredient1}, ${details.strIngredient2}, ${details.strIngredient3}</p>
    <p><span class="fw-semibold">Glass:</span> ${details.strGlass}</p>
    <p class="fw-semibold">Instructions</p>
    <hr/>
    <p>${details.strInstructions}</p>
    <p>${details.strInstructionsDE ? details.strInstructionsDE : 'No data found'}</p>
    <p>${details.strInstructionsIT}</p>
    `
    detailContainer.appendChild(div);
}

loadData('negroni');