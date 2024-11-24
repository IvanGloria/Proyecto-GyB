import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadoresService } from 'src/app/shared/service/trabajadores/trabajadores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/service/storageService/supabase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-trabajadores-add',
  templateUrl: './trabajadores-add.page.html',
  styleUrls: ['./trabajadores-add.page.scss'],
})
export class TrabajadoresAddPage implements OnInit {
  workerForm!: FormGroup;
  userId: string | undefined;
  editId: string | null = null;
  selectedImage: File | null = null;

  epsOptions: string[] = ['Sura', 'Coomeva', 'Mutual ser', 'Sanitas', 'Coosalud', 'Salud total', 'Cajacopi', 'Confamiliar'];
  afpOptions: string[] = ['Colfondos', 'Colpensiones', 'Fonprecon', 'Porvenir', 'Proteccion'];

  constructor(
    private router: Router, private trabajadoresService: TrabajadoresService, private fb: FormBuilder,
    private supabaseS: SupabaseService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      fn: ['', Validators.required],
      sexo: ['', Validators.required],
      eps: ['', Validators.required],
      afp: ['', Validators.required],
      fi: ['', Validators.required],
      image: ['']
    });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { worker: any };
    if (state?.worker) {
      this.workerForm.patchValue(state.worker);
      this.editId = state.worker.id; 
    }
  }

  async onSubmit() {
    if (this.workerForm.valid && this.userId) {
      try {
        const workerData = { ...this.workerForm.value, userId: this.userId };

        if (this.selectedImage) {
          const uploadResult = await this.supabaseS.uploadFoto(this.selectedImage);
          if (uploadResult) {
            const imageUrl = await this.supabaseS.getFotoUrl(uploadResult.path);
            workerData.image = imageUrl;
          }
        }

        if (this.editId) {
          await this.trabajadoresService.updateWorker(this.editId, workerData).toPromise();
        } else {
          await this.trabajadoresService.addWorker(workerData).toPromise();
        }

        this.router.navigate(['/trabajadores']);
      } catch (error) {
        console.error('Error saving worker:', error);
      }
    }
  }
}