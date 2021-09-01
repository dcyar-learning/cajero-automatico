import User from './user.js';

export default class Auth {
  constructor() {
    this.accounts = JSON.parse(localStorage.getItem('accounts'));
  }

  login(email, password) {
    if (email == '' || password == '') {
      return {
        status: 'error',
        message:
          'Los cambios de <b>correo</b> y <b>contraseña</b> son necesarios',
      };
    }

    const user = this.accounts.find(
      (account) => account.email === email && account.password == password
    );

    if (!user) {
      return {
        status: 'error',
        message: 'No existe una cuenta con estos datos.',
      };
    }

    return {
      status: 'success',
      message: 'Iniciando sesión...',
      data: user,
    };
  }

  register(name, email, password, confirmPassword) {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return {
        status: 'error',
        message: 'Todos los campos son requeridos.',
      };
    }

    if (this.accounts.find((account) => account.email === email)) {
      return {
        status: 'error',
        message: 'Ya existe una cuenta con este correo.',
      };
    }

    if (password != confirmPassword) {
      return {
        status: 'error',
        message: 'Las contraseñas deben coincidir.',
      };
    }

    const newAccount = new User(name, email, password);

    this.accounts.push(newAccount);
    this.updateAccounts(newAccount);

    return {
      status: 'success',
      message: 'Registro exitoso, redirigiendo al cajero.',
      data: newAccount,
    };
  }

  logout() {
    localStorage.removeItem('currentAccount');
  }

  updateAccounts(newAccount) {
    const accountIndex = this.accounts.findIndex(
      (account) => account.email === newAccount.email
    );

    this.accounts[accountIndex] = newAccount;
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }
}
