const authNavigation = () => {
  const registerAuth = document.getElementById('registerAuth');
  const loginAuth = document.getElementById('loginAuth');
  const authDashboard = document.getElementById('authDashboard');
  const authProfile = document.getElementById('authProfile');
  const navigation = document.getElementById('nav');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    console.log('user is not logged in');
    registerAuth.innerHTML = `<a
        href="pages/Register/Register.html"
        class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >Register</a
            >`;
    loginAuth.innerHTML = `<a
        href="pages/Login/Login.html"
        class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >Login</a
            >`;
    navigation.appendChild(registerAuth);
    navigation.appendChild(loginAuth);
  } else {
    authProfile.innerHTML = `<a href="http://127.0.0.1:5500/frontend/pages/Recipe/ViewPage.html" target="_blank" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Recipes</a>`;
    authDashboard.innerHTML += `<button class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" id='logoutButton' onclick='logoutUser()'>Logout</button>`
    navigation.appendChild(authDashboard);
  }
};

const loginUser = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginCredentials = {
    email,
    password,
  };

  if(loginCredentials.email != '' || loginCredentials.password != '') {
    localStorage.setItem('user', JSON.stringify(loginCredentials));
    window.location.href = '/frontend/pages/Recipe/ProfilePage.html';
  }
  
};

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await loginUser();

    if (localStorage.getItem('user') !== null) {
      window.location.href = '/frontend/pages/Recipe/ProfilePage.html';
    }
  });
}

const registerUser = async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const registerCredentials = {
    name,
    email,
    password,
  };

  if(registerCredentials.name != '' || registerCredentials.email != '' || registerCredentials.password != '') {
    localStorage.setItem('user', JSON.stringify(registerCredentials));
    window.location.href = '/frontend/pages/Recipe/ProfilePage.html';
  }
};

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await registerUser();
  });
}

const logoutUser = () => {
  localStorage.removeItem('user');
  window.location.href = '/frontend/index.html';
};
