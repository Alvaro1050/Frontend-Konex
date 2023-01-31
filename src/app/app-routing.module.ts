import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';

const routes: Routes = [
  { path: 'farmacia', component: MedicamentosComponent},
  { path: '', redirectTo: '/farmacia', pathMatch: 'full' },
  { path: '**', redirectTo: '/farmacia', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

