import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { AuthService } from './service/authService/auth-service.service';
import { LoadingService } from './service/loadingService/loading-service.service'; 
import { AvatarComponent } from './components/avatar/avatar.component';


const Modules = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule,
];

const Components = [
  InputComponent,
  ButtonComponent,
  AvatarComponent,
];

const Providers = [
  AuthService,
];

const Controles = [
  LoadingService
];


@NgModule({
  declarations: [... Components],
  imports: [
    ... Modules
  ],
  providers: [... Providers, ... Controles],
  exports: [... Components, ... Modules]
})
export class SharedModule { }