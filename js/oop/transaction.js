export default class Transaction {
  constructor({ tipo, destino = '', desde = '', monto }) {
    this.tipo = tipo;
    this.destino = destino;
    this.desde = desde;
    this.monto = monto;
    this.fecha = new Date().toLocaleString();
  }
}
