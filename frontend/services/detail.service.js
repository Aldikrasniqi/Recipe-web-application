document.addEventListener('DOMContentLoaded', async () => {
  const recipeContainer = document.getElementById('recipeContainer');
  const recipeId = window.location.search.split('=')[1];
  const apiUrl = 'http://localhost:8080/api';
  const response = await fetch(`${apiUrl}/recipe/${recipeId}`)
    .then((res) => {
      if (res.status == 500) {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Somthing went wrong</h1>`;
      }
      if (res.status == 404) {
        recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">No Recipes Found</h1>`;
      }
      return res.json();
    })
    .catch((err) => {
      console.error(`Error fetching recipe: ${err}`);
      recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Somthing went wrong</h1>`;
    });

  const recipes = response[0];

  recipeContainer.innerHTML += `
          <div class="flex">
            <h1 class="text-2xl">
              Recipe: ${recipes.id} 
            </h1>
          </div>
          <div class="card flex flex-col p-4">
              <form id="editRecipeForm">
                  <div class="mb-4 flex gap-2">
                      <label class="text-gray-400 text-xl font-bold" for="name">
                          Name:
                      </label>
                      <h1 class="font-bold text-lg">${recipes.name}</h1>
                  </div>
                  <div class="mb-4 flex gap-2">
                      <label class="text-gray-400 text-xl font-bold" for="description">
                          Description:
                      </label>
                      <h1 class="font-bold text-lg">${recipes.description}</h1>
                <h1>
                  </div>
                  <div class="mb-4 flex gap-2">
                      <label class="text-gray-400 text-xl font-bold" for="price">
                          Price:
                      </label>
                      <h1 class="font-bold text-lg">${recipes.price}</h1>
                      <h1>
                  </div>
                  <div class="mb-4 flex gap-2">
                      <label class="text-gray-400 text-xl font-bold" for="stock">
                          Stock:
                      </label>
                      <h1 class="font-bold text-lg">${recipes.stockQuantity}</h1>
                      <h1>
                  </div>
                  <div class="mb-4 flex gap-2">
                      <label class="text-gray-400 text-xl font-bold" for="date">
                          Date:
                      </label>
                      <h1 class="font-bold text-lg">${recipes.dateAdded}</h1>
                      <h1>
                  </div>

                   <a href="../Recipe/EditPage.html?id=${recipes.id}" class="btn btn-primary rounded bg-blue-400 text-center p-2">Edit</a>
                  <div class="mt-4">           
            </div>
              </form>
      `;
});
