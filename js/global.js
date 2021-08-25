var user = null;

var cuentas = [
  {
    nombres: 'Homero Simpson',
    correo: 'homero@mail.com',
    contrasena: '123',
    saldo: 20,
    historial: [],
  },
];

function setAccount(account) {
  user = account;
  document.getElementById('currentUserName').innerText = user.nombres;
  document.getElementById('currentUserEmail').innerText = user.correo;
  setUserCash(user.saldo);
}

function setUserCash() {
  document.getElementById('currentUserCash').innerText = user.saldo;
}

function setHistorial() {
  const historialList = document.getElementById('historial-list');
  let items = '';

  if (user.historial.length) {
    user.historial.reverse().forEach((item) => {
      items += '';
      items += `
      <div class="historial-item d-flex justify-content-between">
        <div>
          <p>Operación: ${item.tipo}</p>
          ${
            item.tipo === 'transferencia'
              ? '<p>Destino: ' + item.destino + '</p>'
              : ''
          }
        </div>
        <div>
          <span class="text-bold ${
            item.tipo === 'deposito' ? 'text-success' : 'text-danger'
          }">${item.tipo === 'deposito' ? '+' : '-'} U$D ${item.monto}</span>
          <p class="text-sm">${item.fecha}</p>
        </div>
      </div>
      `;
    });
    historialList.innerHTML = items;
  } else {
    historialList.innerHTML = 'Aún no has hecho movimientos en tu cuenta';
  }
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
