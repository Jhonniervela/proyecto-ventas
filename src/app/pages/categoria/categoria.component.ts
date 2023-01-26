
import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import {CategoriaService} from "../../providers/services/categoria.service";
import {CategoriaModalComponent} from "./categoria-modal/categoria-modal.component";

// @ts-ignore
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: any = [];
  constructor(private categoriasService: CategoriaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriasService.getAll$().subscribe( response => {
      this.categorias = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(CategoriaModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Categoria',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getCategorias();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(CategoriaModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.cateId = item.cateId;
    modal.componentInstance.item = item;
    modal.componentInstance.title ='Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getCategorias();
        Swal.fire({
          title:'Categoria',
          text: `${res.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1300
        });
      }
    });
  }

  public onDelete(item: any): void {
    const ID = item.cateId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.cateNombre;
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
          this.categoriasService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 1300,
              });
              this.getCategorias();
            }
          });
        }
      });
    }
  }
}
