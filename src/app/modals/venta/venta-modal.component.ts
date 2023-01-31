import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-modal',
  templateUrl: './venta-modal.component.html',
  styleUrls: ['./venta-modal.component.scss']
})
export class VentaModalComponent implements OnInit {

  form!: FormGroup;

  modeModalCreate: boolean = true;

  updatedId: string = '';

  medicamento: any = {
    id: '',
    laboratio: '',
    nombre: '',
    fecha_fabricacion: '',
    fecha_vencimiento: '',
    valor_unitario: 0,
    cantidad: 0
  }

  constructor(
    public dialogRef: MatDialogRef<VentaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ventaService: VentaService,
    private medicamentoService: MedicamentoService,
    private _snackBar: MatSnackBar) {
      this.buildForm();
      this.buildFormUpdate();
  }

  ngOnInit(): void { }

  venta(event: Event) {
    event.preventDefault();
      this.saveVenta();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  saveVenta() {
      let venta: any = this.form.value;
      delete venta.id;
      venta.fecha_hora = new Date();

      if(venta.cantidad <= this.medicamento.cantidad){
        this.medicamento.cantidad = this.medicamento.cantidad - venta.cantidad;
        venta.valor_total = venta.cantidad * venta.valor_unitario;
        this.ventaService.saveVenta(venta).subscribe((newVenta: any) => {
          this.form.patchValue({ id: newVenta.id })
          this.data = newVenta.id;
          this.medicamentoService.updateMedicamento(this.medicamento, this.medicamento.id).subscribe((updateMedicamento: any) => {
          })
          this.openSnackBar('Se creo correctamente la venta');
        })
      } else {
        this.openSnackBar('No hay suficientes productos');
      }
  }
  buildFormUpdate() {
    this.medicamentoService.getMedicamento(this.data).subscribe((medica) => {
      this.form.patchValue({
        valor_unitario: medica.valor_unitario,
        medicamento_id: medica.id
      })
      this.medicamento.id = medica.id;
      this.medicamento.valor_unitario = medica.valor_unitario;
      this.medicamento.nombre = medica.nombre;
      this.medicamento.cantidad = medica.cantidad;
      this.medicamento.laboratorio = medica.laboratorio;
      this.medicamento.fecha_fabricacion = medica.fecha_fabricacion;
      this.medicamento.fecha_vencimiento = medica.fecha_vencimiento;
    })
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [''],
      fecha_hora: ['', Validators.required],
      medicamento_id: ['', Validators.required],
      cantidad: ['', Validators.required],
      valor_unitario: ['',],
      valor_total: ['',]
    })
  }

}
