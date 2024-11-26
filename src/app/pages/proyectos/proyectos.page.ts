import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';
import { HistoryService } from 'src/app/shared/service/history/history.service';
import { ProyectosService } from 'src/app/shared/service/proyectos/proyectos.service';

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
    private historyService: HistoryService
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
    // Guarda el proyecto antes de eliminarlo
    const deletedProject = this.proyectos.find(proyecto => proyecto.id === id);
  
    if (deletedProject) {
      this.proyectosServices.deleteProject(id).then(() => {
        // Registra la acción en el historial
        this.historyService.addUpdate(
          'trash-outline', // Icono para eliminación
          'Proyecto eliminado',
          `El proyecto "${deletedProject.nombre}" ha sido eliminado.`
        );
  
        this.ionViewWillEnter(); // Recargar la lista de proyectos
      }).catch(error => {
        console.error('Error eliminando el proyecto:', error);
      });
    } else {
      console.warn('No se encontró el proyecto para eliminar.');
    }
  }
  
}
