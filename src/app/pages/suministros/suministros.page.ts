import { Component } from '@angular/core';

@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.page.html',
  styleUrls: ['./suministros.page.scss'],
})
export class SuministrosPage {
  productos: any[] = []; // Lista de productos en el inventario
  editIndex: number | null = null; // Índice del producto en edición
  currentProduct: any = {
    nombre: '',
    descripcion: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
  }; // Producto actual en el formulario

  // Método para agregar o actualizar productos
  agregarProducto(producto: any) {
    if (this.editIndex !== null) {
      // Actualizar producto existente
      this.productos[this.editIndex] = { ...producto };
      this.editIndex = null; // Salir del modo edición
    } else {
      // Agregar un nuevo producto
      this.productos.push({ ...producto });
    }
    this.resetForm(); // Limpiar el formulario
  }

  // Método para cargar datos del producto en el formulario para edición
  editarProducto(index: number) {
    this.editIndex = index; // Guardar índice en edición
    this.currentProduct = { ...this.productos[index] }; // Pasar datos al formulario
  }

  // Método para eliminar un producto
  eliminarProducto(index: number) {
    this.productos.splice(index, 1); // Eliminar producto del inventario
    if (this.editIndex === index) {
      this.resetForm(); // Limpiar el formulario si se eliminó el producto en edición
    }
  }

  // Reiniciar el formulario
  resetForm() {
    this.currentProduct = {
      nombre: '',
      descripcion: '',
      cantidad: 0,
      valorUnitario: 0,
      valorTotal: 0,
    };
    this.editIndex = null;
  }
}
