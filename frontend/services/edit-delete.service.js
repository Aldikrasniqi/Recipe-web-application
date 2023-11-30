document.addEventListener('DOMContentLoaded', async () => {
  const apiUrl = 'http://localhost:8080/api';
  const recipeContainer = document.getElementById('recipeContainer');
  const modalEdit = document.getElementById('modal');

  const displayRecipe = (recipeToEdit) => {
    console.log(recipeToEdit);
    recipeContainer.innerHTML += `
        <h1 class="text-2xl">
            Recipe: ${recipeToEdit.id} 
        </h1>
        <div class="card flex flex-col p-4">
            <form id="editRecipeForm">
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="name">
                        Name
                    </label>
                    <input value="${recipeToEdit.name}" name="name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <span class="text-red-500" id="nameError"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="description">
                        Description
                    </label>
                    <input value="${recipeToEdit.description}" name="description" type="text" id="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <span class="text-red-500" id="descError"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="price">
                        Price
                    </label>
                    <input value="${recipeToEdit.price}" name="price" type="number" id="price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <span class="text-red-500" id="priceError"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="stock">
                        Stock
                    </label>
                    <input value="${recipeToEdit.stockQuantity}" name="stock" type="number" id="stock" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <span class="text-red-500" id="stockError"></span>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-400 text-sm font-bold mb-2" for="date">
                        Date
                    </label>
                    <input value="${recipeToEdit.dateAdded}" name="date" type="date" id="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <span class="text-red-500" id="dateError"></span>
                </div>
                <button type="submit" class="btn btn-primary rounded bg-lime-700 text-white p-2 px-5">Edit</button>
                <Button type="button" class="btn btn-primary rounded bg-red-600 text-center p-2 deleteBtn" data-id="${recipeToEdit.id}" id="deleteRecipe">Delete</Button>
                <div class="mt-4">
          </div>
            </form>
            
    `;
  };

  try {
    const recipeId = window.location.search.split('=')[1];
    const recipeToEdit = await fetchRecipe(apiUrl, recipeId);

    displayRecipe(recipeToEdit[0]);

    const editRecipeForm = document.getElementById('editRecipeForm');
    const deleteRecipe = document.getElementById('deleteRecipe');

    editRecipeForm.addEventListener('submit', (e) =>
      handleEditRecipe(e, recipeToEdit[0], apiUrl, recipeId, modalEdit)
    );
    deleteRecipe.addEventListener('click', (e) =>
      handleDeleteRecipe(e, recipeToEdit, apiUrl, recipeId, modalEdit)
    );
  } catch (error) {
    recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">No Recipes Found  </h1>`;
  }

  async function fetchRecipe(apiUrl, recipeId) {
    const response = await fetch(`${apiUrl}/recipe/${recipeId}`);
    if (!response) {
      recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Somthing goes wrong with
      your request
      </h1>`;
    } 
    if(response.status == 404) {
      recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">No Recipes Found</h1>`;
    }
    if(response.status == 500) {
      recipeContainer.innerHTML = `<h1 class="text-4xl text-white font-bold mb-5">Somthing goes wrong with
      your request
      </h1>`;
    }
    return await response.json();
  }

  const handleEditRecipe = (e, recipeToEdit, apiUrl, recipeId, modalEdit) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const date = document.getElementById('date').value;

    const nameError = document.getElementById('nameError');
    const descError = document.getElementById('descError');
    const priceError = document.getElementById('priceError');
    const stockError = document.getElementById('stockError');
    const dateError = document.getElementById('dateError');
    nameError.innerHTML = '';
    descError.innerHTML = '';
    priceError.innerHTML = '';
    stockError.innerHTML = '';
    dateError.innerHTML = '';
    
    recipeToEdit = {
      name,
      description,
      price,
      stockQuantity: stock,
      dateAdded: date,
    };

    if (name == '') {
      nameError.innerHTML = 'Name is required';
      return;
    }
    if (description == '') {
      descError.innerHTML = 'Description is required';
      return;
    }
    if (price == '') {
      priceError.innerHTML = 'Price is required';
      return;
    }
    if (stock == '') {
      stockError.innerHTML = 'Stock is required';
      return;
    }
    if (date == '' || date == null) {
      dateError.innerHTML = 'Date is required';
      return;
    }

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToEdit),
    };
    // chaining promises to update the recipe
    const updateRecipe = async () => {
      const response = await fetch(
        `${apiUrl}/recipe/${recipeId}`,
        options
      ).then((res) => res.json());
      if (response) {
        modalEdit.innerHTML = `
        <div class="fixed inset-0 z-50 justify-center items-center">

        <div class="bg-white p-8 rounded shadow-lg">
          <p class="text-lg font-bold mb-4">Recipe Updated!</p>
          <button type="button" id="closeModal" class="bg-blue-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>`;

        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
          modalEdit.classList.add('hidden');
        });
      } else if (response.status == 400 || response.status == 500) {
        nameError.innerHTML = response.message;
        descError.innerHTML = response.message;
        priceError.innerHTML = response.message;
        stockError.innerHTML = response.message;
        dateError.innerHTML = response.message;
      }
      setTimeout(() => {
        window.location.href = '/frontend/pages/Recipe/ViewPage.html';
      }, 2000);
    };
    updateRecipe();
  };

  const handleDeleteRecipe = (e, recipeToEdit, apiUrl, recipeId, modalEdit) => {
    e.preventDefault();
    modalEdit.innerHTML = `
    <div class="fixed inset-0 z-50 justify-center items-center">

    <div class="bg-white p-8 block rounded shadow-lg">
      <p class="text-lg font-bold mb-4">Are you sure you want to delete the recipe ${recipeToEdit[0].name}? </p>
      <button type="button" id="closeModal" class="bg-blue-500  text-white py-2 px-4 rounded">Cancel</button>
      <button type="button" id="deleteRecipeModal" class="bg-red-500  text-white py-2 px-4 rounded">Delete</button>
    </div>
    </div>`;
    const deleteRecipeModal = document.getElementById('deleteRecipeModal');
    deleteRecipeModal.addEventListener('click', async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // chaining promises to delete the recipe
      const response = await fetch(
        `${apiUrl}/recipe/${recipeId}`,
        options
      ).then((res) => res.status);
      console.log(response);
      if (response == 200) {
        modalEdit.innerHTML = `
        <div class="fixed block inset-0 z-50 justify-center items-center">
        <div class="bg-white p-8 rounded shadow-lg">
          <p class="text-lg font-bold mb-4">Recipe Deleted!</p>
          <button type="button" id="closeModal" class="bg-blue-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>`;

        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
          modalEdit.classList.add('hidden');
        });
      }
      setTimeout(() => {
        window.location.href = '/frontend/pages/Recipe/ViewPage.html';
      }, 2000);
    });
    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', () => {
      console.log('close');
      modalEdit.classList.add('hidden');
    });
  };
});
