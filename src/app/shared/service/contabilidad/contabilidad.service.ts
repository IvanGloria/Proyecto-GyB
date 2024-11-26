import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContabilidadService {
  private coleccionTransacciones = 'transacciones';
  private coleccionTrabajadores = 'nomina';

  constructor(private firestore: AngularFirestore) {}

  // Métodos para Transacciones
  obtenerTransacciones(): Observable<any[]> {
    return this.firestore.collection(this.coleccionTransacciones).valueChanges({ idField: 'id' });
  }

  agregarTransaccion(transaccion: any): Promise<void> {
    const id = this.firestore.createId();
    if (!transaccion.tipo || transaccion.monto <= 0 || !transaccion.descripcion) {
      return Promise.reject('Datos inválidos para la transacción');
    }
    return this.firestore
      .collection(this.coleccionTransacciones)
      .doc(id)
      .set({ ...transaccion, id })
      .catch((error) => {
        console.error('Error al agregar la transacción:', error);
        throw error;
      });
  }

  // Métodos para Trabajadores (Nómina)
  obtenerTrabajadores(): Observable<any[]> {
    return this.firestore.collection(this.coleccionTrabajadores).valueChanges({ idField: 'id' });
  }

  agregarTrabajador(trabajador: any): Promise<void> {
    const id = this.firestore.createId();
    if (!trabajador.nombre || !trabajador.cargo || trabajador.sueldo <= 0) {
      return Promise.reject('Datos inválidos para el trabajador');
    }
    return this.firestore
      .collection(this.coleccionTrabajadores)
      .doc(id)
      .set({ ...trabajador, id })
      .catch((error) => {
        console.error('Error al agregar el trabajador:', error);
        throw error;
      });
  }

  eliminarTrabajador(id: string): Promise<void> {
    return this.firestore
      .collection(this.coleccionTrabajadores)
      .doc(id)
      .delete()
      .catch((error) => {
        console.error('Error al eliminar el trabajador:', error);
        throw error;
      });
  }
}