
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductoService} from "../../../../providers/services/producto.service";
import {CategoriaService} from "../../../../providers/services/categoria.service";
import {ClienteService} from "../../../../providers/services/clientes.service";
import Swal from "sweetalert2";



@Component({
  selector: 'app-mana-producto-modal',
  templateUrl: './mana-producto-modal.component.html',
  styleUrls: ['./mana-producto-modal.component.css']

})
export class ManaProductoModalComponent implements OnInit {

  @Input() title: any;
  @Input() prodId: any;
  @Input() item: any;
  //@ts-ignore
  frmProductosclientes: FormGroup;
  categorias: any = [];
  clientes: any = [];
  productos: any = [];

  constructor( public activeModal: NgbActiveModal,
               private formBuilder:FormBuilder,
               private productoService: ProductoService,
               private clienteService:ClienteService) { }


  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getClientes();
    this.getProductos();
    if(this.item){

    }
  }


  getClientes(): void {
    this.clienteService.getAll$().subscribe(response => {
      this.clientes = response.data || [];
    });
  }
  getProductos(): void {
    this.productoService.getAll$().subscribe(response => {
      this.productos = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      cliente: ['', [Validators.required]],
      producto: ['', [Validators.required]]
    };
    this.frmProductosclientes= this.formBuilder.group(controls);// construir formulario
  }

  assign(): void {
    let data = Object.assign(this.frmProductosclientes.value,
      {cliente: {cliId: this.frmProductosclientes.value.cliente}},
      {producto: {prodId: this.frmProductosclientes.value.producto}});
    this.productoService.add$(data).subscribe(response =>{  // error por producto
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }

  public onAsistio(item: any): void {
    const IdAsistio = item.petaId;
    const cliIdAsistio = item.cliente.cliId;
    const prodIdAsistio = item.producto.prodId
    const mensaje = '¿ Estas seguro que asistio ?';
    Swal.fire({
      title: 'Confirmación de la asistencia',
      text: `${mensaje}`,
      backdrop: true,
      //animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0F3971',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        let data = Object.assign(
          {cliente: {cliId: cliIdAsistio}},
          {producto: {prodId: prodIdAsistio}},
          {petaAsistencia: 'A'}); // construir error
        // @ts-ignore
        this.productoService.update$(IdAsistio, data).subscribe(response => {
          if (response.success) {
            Swal.fire({
              title: 'Asistencia guardada',
              text: response.message,
              backdrop: true,
              //animation: true,
              showConfirmButton: false,
              confirmButtonColor: '#0F3971',
              timer: 1500,
            });

            this.getClientes();
            this.getProductos();
          }
        });
      }
    });
  }

  public onFalto(item: any): void {
    const IDFalto = item.petaId;
    const prodIdFalto = item.producto.prodId;
    const cliIdFalto = item.cliente.cliId
    const mensaje = '¿ Estas seguro que NO asistio ?';
    Swal.fire({
      title: 'Confirmación la inasistencia',
      text: `${mensaje}`,
      backdrop: true,
      //animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0F3971',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let data = Object.assign(
          {cliente: {cliId: cliIdFalto}},
          {producto: {prodId: prodIdFalto}},
          {petaAsistencia: 'F'});
        // @ts-ignore
        this.personaTallerService.update$(IDFalto, data).subscribe(response => {
          if (response.success) {
            Swal.fire({
              title: 'Inasistencia guardada',
              text: response.message,
              backdrop: true,
              //animation: true,
              showConfirmButton: false,
              confirmButtonColor: '#0F3971',
              timer: 1500,
            });

            this.getClientes();
            this.getProductos();
          }
        });

      }
    });

  }
}

