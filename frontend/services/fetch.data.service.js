document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'http://localhost:8080/api';
  const recipeContainer = document.getElementById('recipeContainer');
  const create_more = document.getElementById('create_more'); 
  const showCreatedRecipes = async () => {

    try {
      const recipeResponse = await fetch(`${API_URL}/recipe`);
      console.log(recipeResponse);
      if (recipeResponse.status === 404) {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">No Recipes Found</h1>`;
        create_more.classList.add('hidden');
      }
      if (recipeResponse.status === 500) {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Something went wrong</h1>`;
        create_more.classList.add('hidden');
      }

      const recipes = await recipeResponse.json();
      if (recipes.length === 0) {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">No Recipes Found</h1>`;
        create_more.innerHTML = 'Create one'
      } else {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Recipes</h1>`;
        create_more.classList.remove('hidden');
      }
      recipes.forEach((recipe) => {
        recipeContainer.innerHTML += `
          <div class="card flex flex-col p-4">
            <h1 class="card-title text-xl">Name: <span class="text-base text-gray-500">${recipe.name}</span></h1>
            <h1 class="card-title text-xl">Description: <span class="text-base text-gray-500">${recipe.description}</span></h1>
            <h1 class="card-title text-xl">Price: <span class="text-base text-gray-500">${recipe.price}</span></h1>
            <h1 class="card-title text-xl">Stock: <span class="text-base text-gray-500">${recipe.stockQuantity}</span></h1>
            <h1 class="card-title text-xl">Date: <span class="text-base text-gray-500">${recipe.dateAdded}</span></h1>
            <div class="mt-4">
              <a href="../Recipe/SingleRecipeViewPage.html?id=${recipe.id}" class="btn btn-primary rounded bg-blue-400 text-center p-2">View</a>
            </div>
          </div>
          <hr>
        `;
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Something went wrong</h1>`;
      create_more.classList.add('hidden');
    }
  };

  showCreatedRecipes();
});
