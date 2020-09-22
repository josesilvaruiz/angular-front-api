import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service'
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'profile-cliente',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Perfil del cliente"
  private imagenSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {}
  seleccionarImagen(event){
    
    this.imagenSeleccionada =  event.target.files[0];
    this.progreso = 0;
    console.log(this.imagenSeleccionada) 
    if(this.imagenSeleccionada.type.indexOf('image') < 0){
      swal('Error al seleccionar imagen', 'El archivo debe ser una imagen', 'error')
    }
  }
  subirImagen(){

    if(!this.imagenSeleccionada){
      swal('Error: Upload', 'Imagen no seleccionada', 'error')
    }    if(this.imagenSeleccionada.type.indexOf('image') < 0){
      swal('Error al seleccionar imagen', 'El archivo debe ser una imagen', 'error')
    }else{
    
    this.clienteService.subirImagen(this.imagenSeleccionada, this.cliente.id)   
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round(100 * event.loaded / event.total)
      } else if(event.type == HttpEventType.Response){
        let response:any = event.body;
        this.cliente = response.cliente as Cliente;
        swal('Imagen subida', response.mensaje, 'success')
      }
      

    })
  }
}
}
