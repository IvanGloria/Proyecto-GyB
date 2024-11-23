import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadoresService, Worker } from 'src/app/shared/service/trabajadores/trabajadores.service';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private trabajadoresService: TrabajadoresService) {}

  ngOnInit() {
    // Suscribirse directamente al observable
    this.trabajadoresService.getWorkers().subscribe(workers => {
      this.workers = workers;
      this.filteredWorkers = [...this.workers];
    });
  }

  onSearch() {
    this.filteredWorkers = this.workers.filter(worker =>
      worker.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteWorker(id: number) {
    this.trabajadoresService.deleteWorker(id);
  }

  editWorker(worker: Worker) {
    this.router.navigate(['/trabajadores-add'], { state: { worker } });
  }

  goToAddWorker() {
    this.router.navigate(['/trabajadores-add']);
  }
}
