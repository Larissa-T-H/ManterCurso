import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';
import { CursoComponent } from './curso.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
   CursoComponent

  ],
  providers: [

  ]
})
export class CursoModule { }