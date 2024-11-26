import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SuministrosService {
  private suministrosCollection = this.firestore.collection('suministros');
  private entregasCollection = this.firestore.collection('entregas');

  constructor(private firestore: AngularFirestore) {}

  // Métodos para suministros
  getSuministros() {
    return this.suministrosCollection.valueChanges({ idField: 'id' });
  }

  addSuministro(suministro: any) {
    return this.suministrosCollection.add(suministro);
  }

  updateSuministro(id: string, suministro: any) {
    return this.suministrosCollection.doc(id).update(suministro);
  }

  deleteSuministro(id: string) {
    return this.suministrosCollection.doc(id).delete();
  }

  // Métodos para entregas
  getEntregas() {
    return this.firestore.collection('entregas').valueChanges({ idField: 'id' });
  }
  
  addEntrega(entrega: any) {
    return this.entregasCollection.add(entrega);
  }

  deleteEntrega(entregaId: string): Promise<void> {
    return this.firestore.collection('entregas').doc(entregaId).delete();
  }
  
  
}

