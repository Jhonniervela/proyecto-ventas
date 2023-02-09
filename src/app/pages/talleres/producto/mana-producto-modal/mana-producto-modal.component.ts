
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductoService} from "../../../../providers/services/producto.service";
import {CategoriaService} from "../../../../providers/services/categoria.service";



@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css']

})
export class ProductoModalComponent implements OnInit {

  @Input() title: any;
  @Input() prodId: any;
  @Input() item: any;
  //@ts-ignore
  frmProductos: FormGroup;
  categorias: any = [];
  constructor( public activeModal: NgbActiveModal,
               private formBuilder:FormBuilder,
               private productoService: ProductoService,
               private categoriaService: CategoriaService  ) { }


  ngOnInit(): void {
    this.formInit(); //el formulario esta inicializado
    this.getCategorias();
    if(this.item){
      this.updateData()
    }
  }

  getCategorias(): void {
    this.categoriaService.getAll$().subscribe(response => {
      this.categorias = response.data || [];
    });
  }

  formInit(): void {
    const controls = {
      prodNombre: [''],
      prodPrecio: [''],
      prodStock: [''],
      catId: ['']
    };
    this.frmProductos= this.formBuilder.group(controls);// construir formulario
  }

  save(): void {
    let data = Object.assign(this.frmProductos.value,{categoria: {catId: this.frmProductos.value.catId}});
    this.productoService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  update(): void {
    let data = Object.assign(this.frmProductos.value,{categoria: {catId: this.frmProductos.value.catId}});
    this.productoService.update$(this.prodId, data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });//serializa y envia formato tipo JS
  }
  updateData(): void {
    let data = Object.assign(this.item, {catId: this.item.categoria.catId});
    this.frmProductos.patchValue(data)
  }
}
