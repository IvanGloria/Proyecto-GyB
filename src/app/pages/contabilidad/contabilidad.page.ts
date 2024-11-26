import { Component } from '@angular/core';
import  jsPDF  from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.page.html',
  styleUrls: ['./contabilidad.page.scss'],
})
export class ContabilidadPage {
  // Capital y transacciones
  capital: number = 0;
  tipo: 'ingreso' | 'egreso' = 'ingreso';
  monto: number = 0;
  descripcion: string = '';
  transacciones: Array<{ tipo: string; monto: number; descripcion: string; fecha: string }> = [];

  // Nómina
  nombre: string = '';
  cargo: string = '';
  sueldo: number = 0;
  trabajadores: Array<{ nombre: string; cargo: string; sueldo: number }> = [];

  // Total de la nómina
  get totalNomina(): number {
    return this.trabajadores.reduce((total, trabajador) => total + trabajador.sueldo, 0);
  }

  // Agregar transacción
  agregarTransaccion() {
    if (!this.monto || !this.descripcion) return;

    const nuevaTransaccion = {
      tipo: this.tipo,
      monto: this.monto,
      descripcion: this.descripcion,
      fecha: new Date().toLocaleDateString(),
    };

    this.transacciones.unshift(nuevaTransaccion);
    this.capital += this.tipo === 'ingreso' ? this.monto : -this.monto;

    // Resetear campos
    this.monto = 0;
    this.descripcion = '';
  }

  // Agregar trabajador
  agregarTrabajador() {
    if (!this.nombre || !this.cargo || !this.sueldo) return;

    const nuevoTrabajador = {
      nombre: this.nombre,
      cargo: this.cargo,
      sueldo: this.sueldo,
    };

    this.trabajadores.unshift(nuevoTrabajador);
    this.capital -= this.sueldo;

    // Resetear campos
    this.nombre = '';
    this.cargo = '';
    this.sueldo = 0;

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
  
    // Total de la nómina
    const totalNominaY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Nómina: $${this.totalNomina.toFixed(2)}`, 10, totalNominaY);
  
    // Descargar el PDF
    doc.save('soporte-financiero.pdf');
  }
}

