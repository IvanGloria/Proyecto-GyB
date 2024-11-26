import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';
import { ProyectosService } from 'src/app/shared/service/proyectos/proyectos.service';
import { TrabajadoresService } from 'src/app/shared/service/trabajadores/trabajadores.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage {
  proyectos: any[] = [];
  isMenuOpen = false;
  filteredProyectos: any[] = [];
  searchTerm: string = '';

  constructor(
    private proyectosServices: ProyectosService,
    private router: Router,
    private authService: AuthService,
    private trabajadoresService: TrabajadoresService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  ionViewWillEnter() {
    this.proyectosServices.getAllProjects().subscribe((data) => {
      this.proyectos = data;
      this.filteredProyectos = [...this.proyectos];
    });
  }

  private loadProjects() {
    this.proyectosServices.getAllProjects().subscribe((proyectos) => {
      const workerCountObservables = proyectos.map((proyecto) =>
        this.trabajadoresService.getWorkersByProject(proyecto.id!).pipe(
          map((workers) => ({
            ...proyecto,
            workerCount: workers.length,
          }))
        )
      );

      forkJoin(workerCountObservables).subscribe((proyectosConTrabajadores) => {
        this.proyectos = proyectosConTrabajadores;
        this.filterProjects();
      });
    });
  }

  filterProjects() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProyectos = this.proyectos.filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(term)
    );
  }

  navigateToAdd() {
    this.router.navigate(['/proyectos-add']);
  }

  editProject(id: string) {
    this.router.navigate(['/proyectos-add', { id }]);
  }

  deleteProject(id: string) {
    this.proyectosServices.deleteProject(id).then(() => {
      this.ionViewWillEnter(); // Recarga la lista de proyectos después de eliminar
    });
  }
}
