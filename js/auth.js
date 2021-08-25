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
  }, 3000);
}

function clearInputs(inputs) {
  inputs.forEach((input) => (input.value = ''));
}
