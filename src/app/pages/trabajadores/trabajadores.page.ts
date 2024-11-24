import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadoresService, Worker } from 'src/app/shared/service/trabajadores/trabajadores.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];
  searchTerm: string = '';
  userId: string | undefined;

  constructor(
    private router: Router, 
    private trabajadoresService: TrabajadoresService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadWorkers();
      }
    });
  }

  loadWorkers() {
    if (this.userId) {
      this.trabajadoresService.getWorkers(this.userId).subscribe(workers => {
        this.workers = workers;
        this.filteredWorkers = [...this.workers];
      });
    }
  }

  onSearch() {
    this.filteredWorkers = this.workers.filter(worker =>
      worker.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      worker.apellido.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteWorker(worker: Worker) {
    if (worker.id) { 
      this.trabajadoresService.deleteWorker(worker.id)
        .subscribe({
          next: () => {
            console.log('Trabajador eliminado exitosamente');
            this.loadWorkers(); // Recargar la lista
          },
          error: (error) => {
            console.error('Error al eliminar trabajador:', error);
          }
        });
    }
  }

  editWorker(worker: Worker) {
    this.router.navigate(['/trabajadores-add'], { state: { worker } });
  }

  goToAddWorker() {
    this.router.navigate(['/trabajadores-add']);
  }
}