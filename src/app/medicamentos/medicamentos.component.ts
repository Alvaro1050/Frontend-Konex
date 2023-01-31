import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicamentoModalComponent } from '../modals/medicamento/medicamento-modal.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicamentoService } from '../services/medicamento.service';
import { VentaModalComponent } from '../modals/venta/venta-modal.component';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {

  medicamentos: any = []
  ventas: any = []

  displayedColumns: string[] = ['#', 'Nombre', 'Laboratorio','Fecha fabricacion','Fecha vencimiento','Cantidad','Valor unitario', 'Accion'];
  displayedColumnsV: string[] = ['#', 'Fecha', 'Medicamento','Cantidad','Valor Unitario','Valor total'];
  dataSource = new MatTableDataSource();
  dataSourceVenta = new MatTableDataSource();


  nombreFilter = new FormControl('');
  laboratorioFilter = new FormControl('');
  cantidadFilter = new FormControl('');
  valorUnitarioFilter = new FormControl('');

  filterValues = {
    nombre: '',
    laboratorio: '',
    cantidad: '',
    valor_unitario: ''
  };

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private medicamentoService: MedicamentoService,
    private ventaService: VentaService
    ) {
    this.getAllMedicamentos();
    this.getAllVentas();
    this.dataSource.filterPredicate = this.createFilter();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(MedicamentoModalComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMedicamentos();
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogVenta(id: string) {
    const dialogRef = this.dialog.open(VentaModalComponent, { data: id });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMedicamentos();
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogUpdate(id: string) {
    const dialogRef = this.dialog.open(MedicamentoModalComponent, { data: id });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMedicamentos();
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.buildFilters();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteMedicamento(id: String){
    this.medicamentoService.deleteMedicamento(id).subscribe((data) => {
      this.getAllMedicamentos();
      this.openSnackBar('Se elimino correctamente el estudiante');
    }, error => {
      console.log(error.error.error.message);
      this.openSnackBar('No se pudo eliminar el mediamento por que esta asociado a una venta');
    })
  }

  getAllMedicamentos() {
    this.medicamentoService.getAllMedicamentos().subscribe(data => {
      this.medicamentos = data;
      this.dataSource.data = data;
    });
  }

  getAllVentas() {
    this.ventaService.getAllVentas().subscribe(data => {
      this.ventas = data;
      this.dataSourceVenta.data = data;
    });
  }

  buildFilters(){
    this.nombreFilter.valueChanges
      .subscribe(
        nombre => {
          this.filterValues.nombre = nombre;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.laboratorioFilter.valueChanges
      .subscribe(
        laboratorio => {
          this.filterValues.laboratorio = laboratorio;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.cantidadFilter.valueChanges
      .subscribe(
        cantidad => {
          this.filterValues.cantidad = cantidad;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.valorUnitarioFilter.valueChanges
      .subscribe(
        valor_unitario => {
          this.filterValues.valor_unitario = valor_unitario;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: any) => boolean {
    let filterFunction = function(data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && data.laboratorio.toString().toLowerCase().indexOf(searchTerms.laboratorio.toLowerCase()) !== -1
        && data.cantidad.toString().toLowerCase().indexOf(searchTerms.cantidad.toString().toLowerCase()) !== -1
        && data.valor_unitario.toString().toLowerCase().indexOf(searchTerms.valor_unitario.toString().toLowerCase()) !== -1;
    }
    return filterFunction;
  }
}
