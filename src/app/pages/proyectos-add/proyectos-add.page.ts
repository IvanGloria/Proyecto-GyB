import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/authService/auth-service.service';
import { HistoryService } from 'src/app/shared/service/history/history.service';
import { ProyectosService } from 'src/app/shared/service/proyectos/proyectos.service';

@Component({
  selector: 'app-proyectos-add',
  templateUrl: './proyectos-add.page.html',
  styleUrls: ['./proyectos-add.page.scss'],
})
export class ProyectosAddPage implements OnInit {
  projectForm: FormGroup;
  isMenuOpen = false;
  editMode = false;
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectosServices: ProyectosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private historyService: HistoryService
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.editId = id;

      this.proyectosServices.getProjectById(id).subscribe((doc: any) => {
        if (doc.exists) {
          const project = doc.data();
          this.projectForm.patchValue(project);
        }
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  saveProject() {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      if (this.editMode && this.editId) {
        this.proyectosServices.updateProject(this.editId, projectData).then(() => {
          this.historyService.addUpdate(
            'create-outline', // Icono para actualización
            'Proyecto actualizado',
            `El proyecto "${projectData.nombre}" ha sido actualizado.`
          );
          this.router.navigate(['/proyectos']);
        });
      } else {
        this.proyectosServices.addProject(projectData).then(() => {
          this.historyService.addUpdate(
            'add-outline', // Icono para nuevo proyecto
            'Nuevo proyecto agregado',
            `Se agregó el proyecto "${projectData.nombre}".`
          );
          this.router.navigate(['/proyectos']);
        });
      }
    }
  }
}
