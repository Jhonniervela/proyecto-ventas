
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriaService} from "../../../providers/services/categoria.service";

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css']
})
export class CategoriaModalComponent implements OnInit {

  @Input() title: any;
  @Input() cateId: any;
  @Input() item: any;
  frmCategoria: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

  private formInit(): void {
    const controls = {
      cateNombre: ['', [Validators.required]],
      cateDescripcion: ['', [Validators.required]],


    };
    this.frmCategoria = this.formBuilder.group(controls);
  }

  save():void {
    this.categoriaService.add$(this.frmCategoria.value).subscribe(response=>{
      if(response.success){
        this.activeModal.close({ success:true, massage:response.message});
      }
    });

  }

  update(): void {
    this.categoriaService.update$(this.cateId, this.frmCategoria.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  private updateData(): void {
    const data =this.item;
    this.frmCategoria.patchValue(data);
  }
}

