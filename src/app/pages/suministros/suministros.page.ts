import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';
import { HistoryService } from 'src/app/shared/service/history/history.service';
import { SuministrosService } from 'src/app/shared/service/suministros/suministros.service';

@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.page.html',
  styleUrls: ['./suministros.page.scss'],
})
export class SuministrosPage implements OnInit {
  isMenuOpen = false;
  productos: any[] = []; // Lista de productos en el inventario
  entregas: any[] = []; // Lista de entregas realizadas
  editIndex: number | null = null; // Índice del producto en edición
  currentProduct: any = {
    nombre: '',
    descripcion: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
  }; // Producto actual en el formulario

  // Datos del formulario de entrega
  entregaForm = {
    producto: '',
    cantidad: 0,
    proyecto: '',
  };

  // Variables para la paginación
  productosPorPagina = 3; // Máximo de productos por página
  paginaActualProductos = 1; // Página actual para productos
  entregasPorPagina = 5; // Máximo de entregas por página
  paginaActualEntregas = 1; // Página actual para entregas

  constructor(private suministrosService: SuministrosService, private authService: AuthService, 
    private router: Router, private historyService: HistoryService) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerEntregas();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Métodos para obtener productos y entregas desde Firebase
  obtenerProductos() {
    this.suministrosService.getSuministros().subscribe((data) => {
      this.productos = data;
    });
  }

  obtenerEntregas() {
    this.suministrosService.getEntregas().subscribe((data) => {
      this.entregas = data;
    });
  }

  // Métodos para paginación de productos
  get productosPaginados() {
    const inicio = (this.paginaActualProductos - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return this.productos.slice(inicio, fin);
  }

  cambiarPaginaProductos(pagina: number) {
    this.paginaActualProductos = pagina;
  }

  get totalPaginasProductos() {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  // Métodos para paginación de entregas
  get entregasPaginadas() {
    const inicio = (this.paginaActualEntregas - 1) * this.entregasPorPagina;
    const fin = inicio + this.entregasPorPagina;
    return this.entregas.slice(inicio, fin);
  }

  cambiarPaginaEntregas(pagina: number) {
    this.paginaActualEntregas = pagina;
  }

  get totalPaginasEntregas() {
    return Math.ceil(this.entregas.length / this.entregasPorPagina);
  }

  // Método para agregar o actualizar productos
  agregarProducto(producto: any) {
  if (this.editIndex !== null) {
    // Actualizar producto existente en Firebase
    const productoId = this.productos[this.editIndex].id;
    this.suministrosService.updateSuministro(productoId, producto).then(() => {
      this.historyService.addUpdate(
        'create-outline', 
        'Producto actualizado',
        `El producto ${producto.nombre} ha sido actualizado con éxito.`
      );
      this.editIndex = null;
      this.resetForm();
    });
  } else {
    // Agregar un nuevo producto a Firebase
    this.suministrosService.addSuministro(producto).then(() => {
      this.historyService.addUpdate(
        'add-circle-outline', 
        'Nuevo producto agregado',
        `El producto ${producto.nombre} ha sido agregado al inventario.`
      );
      this.resetForm();
    });
  }
}


  // Método para cargar datos del producto en el formulario para edición
  editarProducto(index: number) {
    this.editIndex = index;
    this.currentProduct = { ...this.productos[index] };
  }

  // Método para eliminar un producto
  eliminarProducto(index: number) {
    const producto = this.productos[index];
    const productoId = producto.id;
  
    this.suministrosService.deleteSuministro(productoId).then(() => {
      if (this.editIndex === index) {
        this.resetForm();
      }
  
      // Agregar al historial
      this.historyService.addUpdate(
        'trash-outline',
        'Producto eliminado',
        `El producto "${producto.nombre}" fue eliminado del inventario.`
      );
    });
  }
  
  // Método para registrar una entrega
  registrarEntrega() {
    const productoSeleccionado = this.productos.find(
      (p) => p.nombre === this.entregaForm.producto
    );
  
    if (!productoSeleccionado) {
      alert('Selecciona un producto válido.');
      return;
    }
  
    if (this.entregaForm.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }
  
    if (this.entregaForm.cantidad > productoSeleccionado.cantidad) {
      alert('Cantidad insuficiente en el inventario.');
      return;
    }
  
    const nuevoCantidad = productoSeleccionado.cantidad - this.entregaForm.cantidad;
  
    // Actualizar inventario
    this.suministrosService.updateSuministro(productoSeleccionado.id, {
      ...productoSeleccionado,
      cantidad: nuevoCantidad,
    });
  
    const nuevaEntrega = {
      producto: this.entregaForm.producto,
      cantidad: this.entregaForm.cantidad,
      proyecto: this.entregaForm.proyecto,
      fecha: new Date().toISOString(),
    };
  
    // Registrar la entrega
    this.suministrosService.addEntrega(nuevaEntrega).then(() => {
      // Agregar al historial
      this.historyService.addUpdate(
        'archive-outline',
        'Entrega registrada',
        `Se registró una entrega de ${this.entregaForm.cantidad} unidades del producto "${this.entregaForm.producto}" para el proyecto "${this.entregaForm.proyecto}".`
      );
  
      // Resetear el formulario
      this.entregaForm = { producto: '', cantidad: 0, proyecto: '' };
    });
  }
  


  eliminarEntrega(index: number) {
  const entregaId = this.entregas[index]?.id;
  const producto = this.entregas[index]?.producto; // Nombre del producto entregado

  if (!entregaId) {
    console.error('La entrega no tiene un ID válido.');
    return;
  }

  this.suministrosService.deleteEntrega(entregaId)
    .then(() => {
      this.historyService.addUpdate(
        'trash-outline', 
        'Entrega eliminada',
        `La entrega del producto ${producto} fue eliminada correctamente.`
      );
      console.log(`Entrega con ID ${entregaId} eliminada correctamente.`);
      this.obtenerEntregas();
    })
    .catch((error) => {
      console.error('Error al eliminar la entrega:', error);
      alert('Hubo un error al eliminar la entrega. Por favor, inténtalo de nuevo.');
    });
}
  
  

  // Reiniciar el formulario de productos
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
