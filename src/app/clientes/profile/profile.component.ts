import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service'
import swal from 'sweetalert2';

@Component({
  selector: 'profile-cliente',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  cliente: Cliente;
  titulo: string = "Perfil del cliente"
  private imagenSeleccionada: File;
  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente;
        });
      }
    });
    
  }
  seleccionarImagen(event){
    this.imagenSeleccionada =  event.target.files[0];
    console.log(this.imagenSeleccionada) 
  }
  subirImagen(){
    
    this.clienteService.subirImagen(this.imagenSeleccionada, this.cliente.id)   
    .subscribe(cliente => {
      this.cliente = cliente;
      swal('Imagen subida', `${cliente.imagen}`, 'success')

    })
  }
}
