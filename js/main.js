import Auth from './oop/auth.js';
import Atm from './oop/atm.js';
import User from './oop/user.js';

import { alertMessage, clearInputs } from './helpers.js';

if (!localStorage.accounts) {
  localStorage.setItem(
    'accounts',
    JSON.stringify([new User('Homero Sanchez', 'homero@mail.com', '123')])
  );
}

var auth = new Auth();
var atm = new Atm();

if (localStorage.currentAccount) {
  atm.printCurrentAccountData();
  showView('historial');
} else {
  toggleMenu();
  showView('login');
}

document
  .getElementById('login-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const loginMessage = document.getElementById('login-messages');

    const email = this.elements['login-email'];
    const password = this.elements['login-password'];

    const response = auth.login(email.value, password.value);

    if (response.status === 'error') {
      alertMessage(loginMessage, 'error', response.message, 2500);
      return;
    }

    atm.currentAccount = response.data;
    atm.printCurrentAccountData();

    alertMessage(loginMessage, 'success', response.message, 1500);

    setTimeout(() => {
      clearInputs([email, password]);
      toggleMenu();
      showView('historial');
    }, 1500);
  });

document
  .getElementById('register-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const registerMessage = document.getElementById('register-message');

    const name = this.elements['register-name'];
    const email = this.elements['register-email'];
    const password = this.elements['register-password'];
    const confirmPassword = this.elements['register-confirm-password'];

    const response = auth.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    if (response.status === 'error') {
      alertMessage(registerMessage, 'error', response.message, 2500);
      return;
    }

    atm.currentAccount = response.data;
    atm.printCurrentAccountData();

    alertMessage(registerMessage, 'success', response.message, 1500);

    setTimeout(() => {
      clearInputs([name, email, password, confirmPassword]);
      toggleMenu();
      showView('historial');
    }, 1500);
  });

document.getElementById('logout').addEventListener('click', function () {
  showView('login');
  toggleMenu();
  auth.logout();
});
