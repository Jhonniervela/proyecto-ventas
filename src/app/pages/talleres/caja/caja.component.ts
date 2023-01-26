import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CajaModalComponent} from "./caja-modal/caja-modal.component";
import {CajaService} from "../../../providers/services/caja.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  cajas: any = [];
  constructor(private cajaService: CajaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCajas();
  }

  getCajas(): void {
    this.cajaService.getAll$().subscribe(response => {
      this.cajas = response.data || [];
      console.log(this.cajas);
    });
  }
  openModal(): void {
    const modal = this.modalService.open(CajaModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Caja',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getCajas();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(CajaModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.cajId = item.cajId;
    modal.componentInstance.item = item;
    modal.componentInstance.title ='Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getCajas();
        Swal.fire({
          title:'Caja',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1300
        });
      }
    });
  }

  public onDelete(item: any): void {
    const ID = item.cajId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.cajPago;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#a82935',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.cajaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 1300,
              });
              this.getCajas();
            }
          });
        }
      });
    }
  }
}



