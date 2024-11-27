import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';
import { ContabilidadService } from 'src/app/shared/service/contabilidad/contabilidad.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.page.html',
  styleUrls: ['./contabilidad.page.scss'],
})
export class ContabilidadPage implements OnInit {
  isMenuOpen = false;
  capital: number = 0;
  tipo: 'ingreso' | 'egreso' = 'ingreso';
  monto: number = 0;
  descripcion: string = '';
  transacciones: Array<{ tipo: string; monto: number; descripcion: string; fecha: string }> = [];

  nombre: string = '';
  cargo: string = '';
  sueldo: number = 0;
  trabajadores: Array<{ nombre: string; cargo: string; sueldo: number }> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private contabilidadService: ContabilidadService,
  ) {}

  ngOnInit() {
    // Cargar transacciones
    this.contabilidadService.obtenerTransacciones().subscribe((data) => {
      this.transacciones = data;
      this.capital = data.reduce((total, transaccion) =>
        transaccion.tipo === 'ingreso' ? total + transaccion.monto : total - transaccion.monto, 0);
    });

    // Cargar trabajadores
    this.contabilidadService.obtenerTrabajadores().subscribe((data) => {
      this.trabajadores = data;
    });
  }

  get totalNomina(): number {
    return this.trabajadores.reduce((total, trabajador) => total + trabajador.sueldo, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  agregarTransaccion() {
    if (!this.monto || !this.descripcion) return;

    const nuevaTransaccion = {
      tipo: this.tipo,
      monto: this.monto,
      descripcion: this.descripcion,
      fecha: new Date().toLocaleDateString(),
    };

    this.contabilidadService.agregarTransaccion(nuevaTransaccion)
      .then(() => {
        this.transacciones.unshift(nuevaTransaccion);
        this.capital += this.tipo === 'ingreso' ? this.monto : -this.monto;
        this.monto = 0;
        this.descripcion = '';
        console.log('Transacción guardada con éxito');
      })
      .catch((error) => {
        console.error('Error al guardar la transacción:', error);
      });
  }

  agregarTrabajador() {
    if (!this.nombre || !this.cargo || !this.sueldo) return;

    const nuevoTrabajador = {
      nombre: this.nombre,
      cargo: this.cargo,
      sueldo: this.sueldo,
    };

    this.contabilidadService.agregarTrabajador(nuevoTrabajador)
      .then(() => {
        this.trabajadores.unshift(nuevoTrabajador);
        this.capital -= this.sueldo;
        this.nombre = '';
        this.cargo = '';
        this.sueldo = 0;
        console.log('Trabajador guardado con éxito');
      })
      .catch((error) => {
        console.error('Error al guardar el trabajador:', error);
      });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(valor);
  }

  generateSoporteFinanciero() {
    const doc = new jsPDF() as jsPDF & { lastAutoTable: { finalY: number } };

    // Marca de agua
    const watermarkText = "GYB CONSTRUCCIONES";
    doc.setFontSize(50);
    doc.setTextColor(150, 150, 150);
    doc.text(watermarkText, 50, 150, { angle: 45 });

    // Título del documento
    doc.setFontSize(18);
    doc.text('Soporte Financiero', 10, 20);

    // Capital disponible
    doc.setFontSize(12);
    doc.text(`Capital Disponible: $${this.capital.toFixed(2)}`, 10, 30);

    // Transacciones
    const transaccionesData = this.transacciones.map((transaccion, index) => [
      index + 1,
      transaccion.tipo.toUpperCase(),
      `$${transaccion.monto.toFixed(2)}`,
      transaccion.descripcion,
      transaccion.fecha,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Tipo', 'Monto', 'Descripción', 'Fecha']],
      body: transaccionesData,
      theme: 'striped',
      headStyles: { fillColor: [100, 150, 255] },
    });

    // Nómina
    const nominaStartY = doc.lastAutoTable.finalY + 10;
    doc.text('Nómina:', 10, nominaStartY);

    const nominaData = this.trabajadores.map((trabajador, index) => [
      index + 1,
      trabajador.nombre,
      trabajador.cargo,
      `$${trabajador.sueldo.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: nominaStartY + 10,
      head: [['#', 'Nombre', 'Cargo', 'Sueldo']],
      body: nominaData,
      theme: 'striped',
      headStyles: { fillColor: [255, 200, 100] },
    });

    const totalNominaY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Nómina: $${this.totalNomina.toFixed(2)}`, 10, totalNominaY);

    doc.save('soporte-financiero.pdf');
  }
}
