import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from "@angular/core";
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(
        response => this.clientes = response.content as Cliente[]
      );

    });
  }
  delete(cliente: Cliente): void {
    this.clienteService.delete(cliente.id).subscribe(
      reponse => {
        this.clientes = this.clientes.filter(cli => cli !== cliente)
        swal(
          'Cliente Eliminado!',
          'Cliente eliminado con exito.',
          'success'
        )
      })
  }


}
