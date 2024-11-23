import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadoresService, Worker } from 'src/app/shared/service/trabajadores/trabajadores.service';

@Component({
  selector: 'app-trabajadores-add',
  templateUrl: './trabajadores-add.page.html',
  styleUrls: ['./trabajadores-add.page.scss'],
})
export class TrabajadoresAddPage implements OnInit {
  worker: Worker = { id: 0, role: '', name: '', identificacion: '', apellido: '', sexo: '', fn: '', eps: '', afp: '', fi: '' };
  epsOptions: string[] = ['Sura', 'Coomeva', 'Mutual ser', 'Sanitas', 'Coosalud', 'Salud total', 'Cajacopi',
    'Confamiliar'];
  afpOptions: string[] = ['Colfondos', 'Colpensiones', 'Fonprecon', 'Porvenir', 'Proteccion'];
  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router, 
    private trabajadoresService: TrabajadoresService) {}

    ngOnInit() {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { worker: Worker };
      if (state?.worker) {
        this.worker = { ...state.worker };
      }
    }
  
    onSubmit() {
      if (this.worker.id) {
        this.trabajadoresService.updateWorker(this.worker);
      } else {
        this.trabajadoresService.addWorker(this.worker);
      }
      this.router.navigate(['/trabajadores']);
    }
}
