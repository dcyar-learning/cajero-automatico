// Deposito
document
  .getElementById('formDeposito')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const depositMessage = document.getElementById('deposit-message');
    const amount = this.elements['deposito-monto'];

    if (!(user.saldo + parseInt(amount.value) <= 990)) {
      alertMessage(
        depositMessage,
        'text-danger',
        'Tu saldo no puede ser mayor a U$D 990',
        3000
      );
      return;
    }

    user.saldo += parseInt(amount.value);

    setUserCash();

    user.historial.push({
      tipo: 'deposito',
      destino: '',
      monto: parseInt(amount.value),
      fecha: new Date().toDateString(),
    });

    setHistorial();

    alertMessage(
      depositMessage,
      'text-success',
      `Se ha hecho el depósito de U$D ${amount.value} a tu cuenta.`,
      3000
    );

    amount.value = 1;
  });

// Retiro
document
  .getElementById('formRetiro')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const retiroMessage = document.getElementById('retiro-message');
    const amount = this.elements['retiro-monto'];

    if (parseInt(amount.value) > user.saldo) {
      alertMessage(
        retiroMessage,
        'text-danger',
        'No tienes el saldo suficiente',
        2000
      );
      return;
    }

    if (user.saldo - parseInt(amount.value) < 10) {
      alertMessage(
        retiroMessage,
        'text-danger',
        'Tu saldo no puede quedarse con menos de U$D 10',
        2000
      );
      return;
    }

    user.saldo -= parseInt(amount.value);

    setUserCash();

    user.historial.push({
      tipo: 'retiro',
      destino: '',
      monto: parseInt(amount.value),
      fecha: new Date().toDateString(),
    });

    setHistorial();

    alertMessage(
      retiroMessage,
      'text-success',
      `Se ha hecho el retiro de U$D ${amount.value} correctmanete.`,
      3000
    );

    amount.value = 1;
  });
