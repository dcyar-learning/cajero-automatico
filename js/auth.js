// Login Form
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = this.elements['login-email'];
  const password = this.elements['login-password'];
  const loginMessage = document.getElementById('login-messages');

  if (email.value == '' || password.value == '') {
    authMessage(
      loginMessage,
      'text-danger',
      'Los campos de <b>correo</b> y <b>contraseña</b> son necesarios.'
    );
    return;
  }

  const account = cuentas.find(
    (cuenta) =>
      cuenta.correo === email.value && cuenta.contrasena === password.value
  );

  if (!account) {
    authMessage(
      loginMessage,
      'text-danger',
      'No existe una cuenta con estos datos'
    );
    return;
  }

  user = account;
  toggleMenu();
  showView('cuenta');
  clearInputs([email, password]);
});
// End Login Form

// Register Form
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const registerMessage = document.getElementById('register-message');
  const nombres = document.getElementById('registro-nombres');
  const email = document.getElementById('registro-email');
  const password = document.getElementById('registro-password');
  const confirmPassword = document.getElementById('registro-confirm-password');

  if (
    nombres.value === '' ||
    email.value === '' ||
    password.value === '' ||
    confirmPassword.value === ''
  ) {
    authMessage(
      registerMessage,
      'text-danger',
      'Todos los campos son requeridos.'
    );
    return;
  }

  if (cuentas.find((cuenta) => cuenta.correo === email.value)) {
    authMessage(
      registerMessage,
      'text-danger',
      'Ya existe una cuenta con este correo'
    );
    return;
  }

  if (password.value != confirmPassword.value) {
    authMessage(
      registerMessage,
      'text-danger',
      'Las contraseñas deben coincidir'
    );
    return;
  }

  const newAccount = {
    nombres: nombres.value,
    correo: email.value,
    contrasena: password.value,
    saldo: 10,
    historial: [],
  };

  cuentas.push(newAccount);
  user = newAccount;
  toggleMenu();
  showView('cuenta');
  clearInputs([nombres, email, password, confirmPassword]);

  console.log(cuentas);
  console.log(user);
});
// End Register Form

// Logout
const logout = document.getElementById('logout');

logout.addEventListener('click', function () {
  showView('login');
  toggleMenu();
});
// End Logout

function authMessage(element, clase, text) {
  element.classList.remove('d-none');
  element.classList.add(clase);
  element.innerHTML = text;
  setTimeout(() => {
    element.classList.add('d-none');
    element.classList.remove(clase);
  }, 1500);
}

function clearInputs(inputs) {
  inputs.forEach((input) => (input.value = ''));
}
