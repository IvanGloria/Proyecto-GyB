import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private updates: { icon: string; title: string; description: string; time: Date }[] = [];

  constructor() {}

  // Método para agregar una nueva actualización
  addUpdate(icon: string, title: string, description: string) {
    this.updates.unshift({
      icon,
      title,
      description,
      time: new Date(),
    });
  }

  // Obtener todas las actualizaciones
  getUpdates() {
    return this.updates;
  }
}
