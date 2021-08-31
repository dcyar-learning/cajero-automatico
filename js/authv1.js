// Login Form
document
  .getElementById('login-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const email = this.elements['login-email'];
    const password = this.elements['login-password'];
    const loginMessage = document.getElementById('login-messages');

    const auth = new Auth(loginMessage);

    const currentUser = auth.login(email.value, password.value);

    // setAccount(account);
    // setHistorial();
    // clearInputs([email, password]);
    // toggleMenu();
    // showView('historial');
  });
// End Login Form

// Register Form
document
  .getElementById('register-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const registerMessage = document.getElementById('register-message');
    const nombres = document.getElementById('registro-nombres');
    const email = document.getElementById('registro-email');
    const password = document.getElementById('registro-password');
    const confirmPassword = document.getElementById(
      'registro-confirm-password'
    );

    if (
      nombres.value === '' ||
      email.value === '' ||
      password.value === '' ||
      confirmPassword.value === ''
    ) {
      alertMessage(
        registerMessage,
        'text-danger',
        'Todos los campos son requeridos.'
      );
      return;
    }

    if (cuentas.find((cuenta) => cuenta.correo === email.value)) {
      alertMessage(
        registerMessage,
        'text-danger',
        'Ya existe una cuenta con este correo'
      );
      return;
    }

    if (password.value != confirmPassword.value) {
      alertMessage(
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
    setAccount(user);
    setHistorial();
    clearInputs([nombres, email, password, confirmPassword]);
    toggleMenu();
    showView('historial');
  });
// End Register Form

// Logout
document.getElementById('logout').addEventListener('click', function () {
  showView('login');
  toggleMenu();
});
// End Logout
