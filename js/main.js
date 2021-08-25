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

    setUserCash(user.saldo);

    user.historial.push({
      tipo: 'deposito',
      destino: '',
      monto: parseInt(amount.value),
      fecha: new Date().toDateString(),
    });

    setHistorial(user.historial);

    alertMessage(
      depositMessage,
      'text-success',
      `Se ha hecho el depósito de U$D ${amount.value} a tu cuenta.`,
      3000
    );

    amount.value = 1;
  });
