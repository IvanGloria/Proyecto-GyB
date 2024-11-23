import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Worker {
  id: number;
  role: string;
  identificacion: string;
  name: string;
  apellido: string;
  sexo: string;
  fn: string;
  eps: string;
  afp: string;
  fi: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {
  private workers: Worker[] = [];
  private workersSubject = new BehaviorSubject<Worker[]>([]);
  private currentId = 1;

  constructor() {}

  getWorkers() {
    return this.workersSubject.asObservable(); // Observable para que los componentes se suscriban
  }

  addWorker(worker: Worker): void {
    worker.id = this.currentId++;
    this.workers.push(worker);
    this.workersSubject.next([...this.workers]); // Emitir nueva lista
  }

  updateWorker(updatedWorker: Worker): void {
    const index = this.workers.findIndex(worker => worker.id === updatedWorker.id);
    if (index > -1) {
      this.workers[index] = { ...updatedWorker };
      this.workersSubject.next([...this.workers]); // Emitir nueva lista
    }
  }

  deleteWorker(id: number): void {
    this.workers = this.workers.filter(worker => worker.id !== id);
    this.workersSubject.next([...this.workers]); // Emitir nueva lista
  }
}
