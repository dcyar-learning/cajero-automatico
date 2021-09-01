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
    localStorage.setItem('currentAccount', JSON.stringify(value));

    this._currentAccount = value;
  }

  printCurrentAccountData() {
    document.getElementById('currentUserName').innerText =
      this.currentAccount.name;
    document.getElementById('currentUserEmail').innerText =
      this.currentAccount.email;

    this.printCurrentAccountCash();
  }

  printCurrentAccountCash() {
    document.getElementById('currentUserCash').innerText =
      this.currentAccount.cash;
  }
}
