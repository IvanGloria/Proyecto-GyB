import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

export interface Worker {
  id?: string; 
  userId: string;
  role: string;
  identificacion: string;
  name: string;
  apellido: string;
  sexo: string;
  fn: string;
  eps: string;
  afp: string;
  fi: string;
  image?: string;
  proyectoId?: string; // Nuevo campo para el proyecto
  proyectoActivo?: boolean; // Nuevo campo para estado en el proyecto
  nombreProyecto?: string; // Para mostrar el nombre del proyecto
}

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {
  private trabajadoresCollection: AngularFirestoreCollection<Worker>;

  constructor(private firestore: AngularFirestore) {
    this.trabajadoresCollection = this.firestore.collection('Trabajadores');
  }

  getWorkers(userId: string): Observable<Worker[]> {
    return this.firestore
      .collection<Worker>('Trabajadores', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Worker;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getProjectNames(): Observable<{id: string, nombre: string}[]> {
    return this.firestore.collection('Proyectos')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({
          id: a.payload.doc.id,
          nombre: (a.payload.doc.data() as any).nombre
        })))
      );
  }

  getWorkersByProject(projectId: string): Observable<Worker[]> {
    return this.firestore
      .collection<Worker>('Trabajadores', (ref) => 
        ref.where('proyectoId', '==', projectId)
           .where('proyectoActivo', '==', true)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Worker;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  addWorker(worker: Worker): Observable<any> {
    return from(this.trabajadoresCollection.add(worker));
  }

  updateWorker(id: string, updatedWorker: Worker): Observable<void> {
    return from(this.trabajadoresCollection.doc(id).update(updatedWorker));
  }

  deleteWorker(id: string): Observable<void> {
    return from(this.trabajadoresCollection.doc(id).delete());
  }
}