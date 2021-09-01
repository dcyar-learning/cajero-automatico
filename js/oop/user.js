export default class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cash = 15;
    this.transactionHistory = [];
  }
}
