class Auth {
  constructor(alertMessageElement) {
    this.user = null;
    this.accounts = [
      {
        nombres: 'Homero Sanchez',
        correo: 'homero@mail.com',
        contrasena: '123',
        saldo: 20,
        historial: [],
      },
    ];
    this.alertMessageElement = alertMessageElement;
  }

  get user() {
    return this.user;
  }

  set user(value) {
    this.user = value;
  }

  login(email, password) {
    if (email == '' || password == '') {
      alertMessage(
        this.alertMessageElement,
        'text-danger',
        'Los campos de <b>correo</b> y <b>contraseña</b> son necesarios.',
        2500
      );
      return;
    }

    const user = this.accounts.find(
      (account) => account.correo === email && account.contrasena == password
    );

    if (!user) {
      alertMessage(
        this.alertMessageElement,
        'text-danger',
        'No existe una cuenta con estos datos.',
        2500
      );
    }

    return user;
  }
}
