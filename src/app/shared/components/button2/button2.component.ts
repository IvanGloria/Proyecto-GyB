import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button2',
  templateUrl: './button2.component.html',
  styleUrls: ['./button2.component.scss'],
})
export class Button2Component {
  @Input() productForm: any = {
    nombre: '',
    descripcion: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
  }; // Producto recibido del padre

  @Output() addProduct = new EventEmitter<any>(); // Emitir cambios al padre

  // Método para calcular el valor total
  calcularValorTotal() {
    this.productForm.valorTotal =
      this.productForm.cantidad * this.productForm.valorUnitario;
  }

  // Método para emitir el producto al padre
  guardarProducto() {
    this.calcularValorTotal(); // Actualizar el valor total
    this.addProduct.emit({ ...this.productForm }); // Emitir producto actualizado al padre
  }
}
