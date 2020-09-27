import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region'
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  public errores: string[];
  public regiones: Region[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    });
    this.clienteService.getRegiones().subscribe((regiones) => this.regiones = regiones)
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Nuevo', `Cliente ${this.cliente.nombre} creado con exito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];

      }
      )
  }
  update(): void {
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes'])
     swal('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con exito!`, 'success')
    },
      err => {
        this.errores = err.error.errors as string[];
        
      })
  }

  compararRegion(o1:Region, o2:Region){

    if(o1 == undefined && o2 == undefined){
      return true;
    }
    return o1 == null || o2 ==null ? false: o1.id===o2.id;
  }

}