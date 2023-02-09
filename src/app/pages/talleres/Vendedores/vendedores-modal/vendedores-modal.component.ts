import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClienteService} from "../../../../providers/services/clientes.service";

@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrls: ['./clientes-modal.component.css']
})
export class ClientesModalComponent implements OnInit {

  @Input() title: any;
  @Input() cliId: any;
  @Input() item: any;
  formCliente: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

  private formInit(): void {
    const controls = {
      cliNombre: ['', [Validators.required]],
      cliApellido: ['', [Validators.required]],
      cliDni: ['', [Validators.required]],
      cliDireccion: ['', [Validators.required]],
      cliTelefono: ['', [Validators.required]],
      cliEmail: ['', [Validators.required]],
    };
    this.formCliente = this.formBuilder.group(controls);
  }

  save(): void {
    this.clienteService.add$(this.formCliente.value).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  update(): void {
    this.clienteService.update$(this.cliId, this.formCliente.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  private updateData(): void {
    const data = this.item;
    this.formCliente.patchValue(data);
  }
}
