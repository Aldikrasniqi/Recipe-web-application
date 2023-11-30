document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'http://localhost:8080/api';

  const fetchUserData = async () => {
    try {
      const profileContainer = document.getElementById('profileContainer');
      const notification = document.createElement('p');
      // const user = await getUser();
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.email) {
        notification.innerHTML = `Welcome ${user.email}`;
        profileContainer.appendChild(notification);
      } else {
        notification.innerHTML = 'You are not logged in';
        profileContainer.appendChild(notification);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  fetchUserData();

  const createRecipe = async () => {
    const form = document.getElementById('formRecipe');
    const nameError = document.getElementById('nameError');
    const descError = document.getElementById('descErorr');
    const priceError = document.getElementById('priceError');
    const stockError = document.getElementById('stockError');
    const dateError = document.getElementById('dateError');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const stock = document.getElementById('stockQuantity').value;
      const date = document.getElementById('date').value;
      console.log(name, description, price, stock, date);

      nameError.innerHTML = '';
      descError.innerHTML = '';
      priceError.innerHTML = '';
      stockError.innerHTML = '';
      dateError.innerHTML = '';

      try {
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
        if (date == '') {
          dateError.innerHTML = 'Date is required';
          return;
        }

        const recipe = {
          name,
          description,
          price,
          stockQuantity: stock,
          dateAdded: date,
        };
        const options = {
          method: 'POST',
          body: JSON.stringify(recipe),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const fetchErr = document.createElement('p');
        const response = await fetch(`${API_URL}/recipe`, options);
        const data = await response.json();

        if (response.ok) {
          window.location.href = '../Recipe/ViewPage.html';
        } else {
          fetchErr.innerHTML = 'Something went wrong';
          form.appendChild(fetchErr);
        }

        return data;
      } catch (error) {
        console.error('Error creating recipe:', error);
      }
    });
  };
  createRecipe();
});
