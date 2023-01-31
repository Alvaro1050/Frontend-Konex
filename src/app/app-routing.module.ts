import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';

const routes: Routes = [
  { path: 'students', component: MedicamentosComponent},
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: '**', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

