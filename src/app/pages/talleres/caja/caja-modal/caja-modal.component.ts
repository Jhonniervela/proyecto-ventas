import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CajaService} from "../../../../providers/services/caja.service";

@Component({
  selector: 'app-caja-modal',
  templateUrl: './caja-modal.component.html',
  styleUrls: ['./caja-modal.component.css']
})
export class CajaModalComponent implements OnInit {

  @Input() title: any;
  @Input() cajId: any;
  @Input() item: any;
  frmCaja: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private cajaService: CajaService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

   private formInit(): void {
    const controls = {
      cajPago: ['', [Validators.required]],
      cajCambio: ['', [Validators.required]],


    };
    this.frmCaja = this.formBuilder.group(controls);
  }

 save():void {
   this.cajaService.add$(this.frmCaja.value).subscribe(response=>{
     if(response.success){
       this.activeModal.close({ success:true, massage:response.message});
     }
   });

 }

  update(): void {
    this.cajaService.update$(this.cajId, this.frmCaja.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

   private updateData(): void {
    const data =this.item;
    this.frmCaja.patchValue(data);
  }
}

