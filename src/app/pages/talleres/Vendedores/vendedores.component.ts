import { Component, OnInit } from '@angular/core';
import {ClienteService} from "../../../providers/services/clientes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {ClientesModalComponent} from "./clientes-modal/clientes-modal.component";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any = [];
  constructor(private clienteService: ClienteService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getAll$().subscribe(response => {
      this.clientes = response.data || [];
      console.log(this.clientes);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(ClientesModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Cliente',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getClientes();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(ClientesModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.cliId = item.cliId;
    modal.componentInstance.item = item;
    modal.componentInstance.title ='Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getClientes();
        Swal.fire({
          title:'Cliente',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1300
        });
      }
    });
  }

  public onDelete(item: any): void {
    const ID = item.cliId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.cliNombre;
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
          this.clienteService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 1300,
              });
              this.getClientes();
            }
          });
        }
      });
    }
  }
}

