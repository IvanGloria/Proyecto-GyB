import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

interface Update {
  id: string;
  time?: Date | null;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private collectionName = 'History';

  constructor(private firestore: AngularFirestore) {}

  addUpdate(icon: string, title: string, description: string) {
    const update = {
      icon,
      title,
      description,
      time: Timestamp.fromDate(new Date()),
    };
    return this.firestore.collection(this.collectionName).add(update);
  }

  getUpdates(): Observable<Update[]> {
    return this.firestore
      .collection<Update>(this.collectionName, (ref) => ref.orderBy('time', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(
        map((updates) =>
          updates.map((update) => ({
            ...update,
            time: update.time instanceof Timestamp ? update.time.toDate() : update.time,
          }))
        )
      );
  }

  deleteUpdate(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
