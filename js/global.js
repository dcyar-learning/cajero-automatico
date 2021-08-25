var user = null;

var cuentas = [
  {
    nombres: 'Homero Simpson',
    correo: 'homero@mail.com',
    contrasena: '123',
    saldo: 10,
    historial: [
      {
        tipo: 'deposito', // deposito, retiro, transferencia
        hacia: '',
        monto: 10,
        fecha: new Date().toDateString(),
      },
    ],
  },
];

function setAccount(account) {
  user = account;
  document.getElementById('currentUserName').innerText = user.nombres;
  document.getElementById('currentUserEmail').innerText = user.correo;
  setUserCash(user.saldo);
}

setAccount(cuentas[0]);

function setUserCash(cash) {
  document.getElementById('currentUserCash').innerText = cash;
}

function alertMessage(element, clase, text, time = 1000) {
  element.classList.remove('d-none');
  element.classList.add(clase);
  element.innerHTML = text;
  setTimeout(() => {
    element.classList.add('d-none');
    element.classList.remove(clase);
  }, time);
}

function clearInputs(inputs) {
  inputs.forEach((input) => (input.value = ''));
}
