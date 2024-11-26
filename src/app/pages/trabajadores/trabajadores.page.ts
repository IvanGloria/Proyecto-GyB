import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadoresService, Worker } from 'src/app/shared/service/trabajadores/trabajadores.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HistoryService } from 'src/app/shared/service/history/history.service';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  isMenuOpen = false;
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];
  searchTerm: string = '';
  userId: string | undefined;

  constructor(
    private router: Router, 
    private trabajadoresService: TrabajadoresService,
    private afAuth: AngularFireAuth,
    private historyService: HistoryService,
    private authService: AuthService
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
        this.trabajadoresService.getProjectNames().subscribe(proyectos => {
          this.workers = workers.map(worker => ({
            ...worker,
            nombreProyecto: proyectos.find(p => p.id === worker.proyectoId)?.nombre || 'Sin proyecto'
          }));
          this.filteredWorkers = [...this.workers];
        });
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
      this.trabajadoresService.deleteWorker(worker.id).subscribe({
        next: () => {
          this.historyService.addUpdate(
            'person-remove-outline', 
            'Trabajador eliminado',
            `El trabajador ${worker.name} ${worker.apellido} ha sido eliminado.`
          );
          this.loadWorkers();
        },
        error: (error) => console.error('Error al eliminar trabajador:', error),
      });
    }
  }
  
  editWorker(worker: Worker) {
    this.router.navigate(['/trabajadores-add'], { state: { worker } });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  goToAddWorker() {
    this.router.navigate(['/trabajadores-add']);
  }
}