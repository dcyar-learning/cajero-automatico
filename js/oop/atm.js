export default class Atm {
  constructor() {
    this._currentAccount = localStorage.currentAccount
      ? JSON.parse(localStorage.currentAccount)
      : null;
  }

  get currentAccount() {
    return this._currentAccount;
  }

  set currentAccount(value) {
    this._currentAccount = value;
    localStorage.setItem(
      'currentAccount',
      JSON.stringify(this._currentAccount)
    );
  }

  printCurrentAccountData() {
    document.getElementById('currentUserName').innerText =
      this.currentAccount.name;
    document.getElementById('currentUserEmail').innerText =
      this.currentAccount.email;

    this.printCurrentAccountCash();
    this.printTransactionHistory();
  }

  printCurrentAccountCash() {
    document.getElementById('currentUserCash').innerText =
      this.currentAccount.cash;
  }

  printTransactionHistory() {
    const transactionHistoryList = document.getElementById('historial-list');
    let items = '';

    if (this.currentAccount.transactionHistory.length) {
      const transactionHistory = [...this.currentAccount.transactionHistory];
      transactionHistory.reverse().forEach((item) => {
        items += '';
        items += `
      <div class="historial-item d-flex justify-content-between">
        <div>
          <p>Operación: ${item.tipo}</p>
          ${
            item.tipo === 'transferencia'
              ? '<p class="text-sm">Destino: ' + item.destino + '</p>'
              : item.tipo === 'transferencia-ext'
              ? '<p class="text-sm">Desde: ' + item.desde + '</p>'
              : ''
          }
        </div>
        <div>
          <span class="text-bold ${
            item.tipo === 'deposito' || item.tipo === 'transferencia-ext'
              ? 'text-success'
              : 'text-danger'
          }">${
          item.tipo === 'deposito' || item.tipo === 'transferencia-ext'
            ? '+'
            : '-'
        } U$D ${item.monto}</span>
          <p class="text-sm">${item.fecha}</p>
        </div>
      </div>
      `;
      });
      transactionHistoryList.innerHTML = items;
    } else {
      transactionHistoryList.innerHTML =
        'Aún no has hecho movimientos en tu cuenta';
    }
  }

  depositMoney(amount) {
    if (this.currentAccount.cash + amount >= 990) {
      return {
        status: 'error',
        message: 'Tu saldo no puede ser mayor a <b>U$D 990.</b>',
      };
    }

    this.currentAccount.cash += amount;
    this.currentAccount.transactionHistory.push({
      tipo: 'deposito',
      destino: '',
      monto: amount,
      fecha: new Date().toDateString(),
    });

    this.currentAccount = this.currentAccount;
    this.printCurrentAccountCash();
    this.printTransactionHistory();

    return {
      status: 'success',
      message: `Se ha hecho el depósito de <b>U$D ${amount}</b> a tu cuenta.`,
    };
  }

  withdrawMoney(amount) {
    if (amount > this.currentAccount.cash) {
      return {
        status: 'error',
        message: 'No tienes el saldo suficiente.',
      };
    }

    if (this.currentAccount.cash - amount < 10) {
      return {
        status: 'error',
        message: 'Tu saldo no puede quedarse con menos de <b>U$D 10</b>.',
      };
    }

    this.currentAccount.cash -= amount;
    this.currentAccount.transactionHistory.push({
      tipo: 'retiro',
      destino: '',
      monto: amount,
      fecha: new Date().toDateString(),
    });
    this.currentAccount = this.currentAccount;
    this.printCurrentAccountCash();
    this.printTransactionHistory();

    return {
      status: 'success',
      message: `Se ha hecho el retiro de <b>U$D ${amount}</b> correctamente.`,
    };
  }

  transferMoney(accounts, destinationAccount, amount) {
    if (destinationAccount === '') {
      return {
        status: 'error',
        message: 'La cuenta de destino es obligatoria.',
      };
    }

    if (destinationAccount === this.currentAccount.email) {
      return {
        status: 'error',
        message: 'No puedes transferir dinero a tu propia cuenta.',
      };
    }

    const toAccount = accounts.find(
      (account) => account.email === destinationAccount
    );

    if (!toAccount) {
      return {
        status: 'error',
        message: 'La cuenta de destino no existe.',
      };
    }

    if (this.currentAccount.cash < amount) {
      return {
        status: 'error',
        message: 'No tienes tanto dinero :(',
      };
    }

    if (this.currentAccount.cash - amount < 10) {
      return {
        status: 'error',
        message: 'No puedes transferir tanto dinero.',
      };
    }

    // Validar que la cuenta de destino no tenga saldo mayor a U$D990

    this.currentAccount.cash -= amount;
    this.currentAccount.transactionHistory.push({
      tipo: 'transferencia',
      destino: destinationAccount,
      monto: amount,
      fecha: new Date().toDateString(),
    });
    toAccount.cash += amount;
    toAccount.transactionHistory.push({
      tipo: 'transferencia-ext',
      desde: this.currentAccount.email,
      monto: amount,
      fecha: new Date().toDateString(),
    });

    this.currentAccount = this.currentAccount;

    this.printCurrentAccountCash();
    this.printTransactionHistory();

    return {
      status: 'success',
      message: `Se ha hecho la transferencia de U$D ${amount} a ${destinationAccount}.`,
      data: toAccount,
    };
  }
}
