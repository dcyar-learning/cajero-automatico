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

// Transferencia
document
  .getElementById('formTransferencia')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const transferenciaMessage = document.getElementById(
      'transferencia-message'
    );

    const to = this.elements['transferencia-destino'];
    const amount = this.elements['transferencia-monto'];

    if (to.value === '') {
      alertMessage(
        transferenciaMessage,
        'text-danger',
        'La cuenta de destino es obligatorio',
        2000
      );
      return;
    }

    if (to.value === user.correo) {
      alertMessage(
        transferenciaMessage,
        'text-danger',
        'No puedes transferir dinero a tu propia cuenta',
        2000
      );
      return;
    }

    const toAccount = cuentas.find((cuenta) => cuenta.correo === to.value);

    if (!toAccount) {
      alertMessage(
        transferenciaMessage,
        'text-danger',
        'La cuenta de destino no existe',
        2000
      );
      return;
    }

    if (user.saldo < parseInt(amount.value)) {
      alertMessage(
        transferenciaMessage,
        'text-danger',
        'No tienes tanto dinero :(',
        2000
      );
      return;
    }

    if (user.saldo - parseInt(amount.value) < 10) {
      alertMessage(
        transferenciaMessage,
        'text-danger',
        'No puedes transferir tanto dinero',
        2000
      );
      return;
    }

    user.saldo -= parseInt(amount.value);

    setUserCash();

    user.historial.push({
      tipo: 'transferencia',
      destino: to.value,
      monto: parseInt(amount.value),
      fecha: new Date().toDateString(),
    });

    setHistorial();

    toAccount.saldo += parseInt(amount.value);

    toAccount.historial.push({
      tipo: 'transferencia-ext',
      desde: user.correo,
      monto: parseInt(amount.value),
      fecha: new Date().toDateString(),
    });

    alertMessage(
      transferenciaMessage,
      'text-success',
      `Se ha hecho la transferencia de U$D ${amount.value} a ${to.value}`,
      2500
    );

    amount.value = 1;
    to.value = '';
  });
