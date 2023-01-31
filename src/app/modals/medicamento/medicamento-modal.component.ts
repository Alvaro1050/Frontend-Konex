import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-medicamento-modal',
  templateUrl: './medicamento-modal.component.html',
  styleUrls: ['./medicamento-modal.component.scss']
})
export class MedicamentoModalComponent implements OnInit {

  form!: FormGroup;

  modeModalCreate: boolean = true;

  updatedId: string = '';

  asignedCourseData: any = {
    IdEstudiante: 0,
    IdCurso: 0,
    NotaFinal: 0
  }

  constructor(
    public dialogRef: MatDialogRef<MedicamentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private _snackBar: MatSnackBar) {
      this.buildForm();
      this.isUpdate();
  }

  ngOnInit(): void { }

  isUpdate() {
    if (this.data !== null) {
      this.modeModalCreate = false;
      this.buildFormUpdate();
    }
  }

  buildFormUpdate() {
    this.medicamentoService.getMedicamento(this.data).subscribe((medicamento) => {
      console.log(JSON.stringify(medicamento));
      this.form.patchValue({
        id: medicamento.id,
        nombre: medicamento.nombre,
        laboratorio: medicamento.laboratorio,
        fecha_fabricacion: medicamento.fecha_fabricacion,
        fecha_vencimiento: medicamento.fecha_vencimiento,
        cantidad: medicamento.cantidad,
        valor_unitario: medicamento.valor_unitario
      })
    })
  }

  saveOrUpdateStudent(event: Event) {
    event.preventDefault();
    if (this.modeModalCreate) {
      this.saveMedicamento();
    } else {
      this.updateMedicamento();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  saveMedicamento() {
    if (this.form.valid) {
      let medicamento: any = this.form.value;
      delete medicamento.id;

      this.medicamentoService.saveMedicamento(medicamento).subscribe((newMedicamento: any) => {
        this.form.patchValue({ id: newMedicamento.id })
        this.data = newMedicamento.id;
        this.modeModalCreate = false;
        this.openSnackBar('Se creo correctamente el medicamento');
      })
    }
  }

  updateMedicamento() {
    if (this.form.valid) {
      let medicamento: any = this.form.value;

      this.medicamentoService.updateMedicamento(medicamento, this.data).subscribe((updateMedicamento: any) => {
        this.modeModalCreate = false;
        this.openSnackBar('Se actualizo correctamente el medicamento.');
      })
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      laboratorio: ['', Validators.required],
      fecha_fabricacion: ['', Validators.required],
      fecha_vencimiento: ['',],
      cantidad: ['', Validators.required],
      valor_unitario: ['',]
    })
  }

}
