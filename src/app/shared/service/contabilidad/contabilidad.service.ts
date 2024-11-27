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

  obtenerTransacciones(): Observable<any[]> {
    return this.firestore.collection(this.coleccionTransacciones).valueChanges({ idField: 'id' });
  }

  agregarTransaccion(transaccion: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.coleccionTransacciones).doc(id).set({ ...transaccion, id });
  }

  obtenerTrabajadores(): Observable<any[]> {
    return this.firestore.collection(this.coleccionTrabajadores).valueChanges({ idField: 'id' });
  }

  agregarTrabajador(trabajador: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.coleccionTrabajadores).doc(id).set({ ...trabajador, id });
  }

  eliminarTrabajador(id: string): Promise<void> {
    return this.firestore.collection(this.coleccionTrabajadores).doc(id).delete();
  }
}
