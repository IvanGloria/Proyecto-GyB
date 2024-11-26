import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

interface Project {
  nombre: string;
  descripcion: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private collectionName = 'Proyectos';

  constructor(private firestore: AngularFirestore) {}

  getAllProjects() {
    return this.firestore.collection(this.collectionName).snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addProject(project: any) {
    return this.firestore.collection(this.collectionName).add(project);
  }

  getProjectById(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).get();
  }

  updateProject(id: string, updatedProject: any) {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedProject);
  }

  deleteProject(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
