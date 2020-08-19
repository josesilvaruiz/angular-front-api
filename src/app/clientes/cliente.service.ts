import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common'
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }
    /** getClientes(): Observable<Cliente[]> {
     *     return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[] ));
     * 
     */
     
  getClientes(): Observable<Cliente[]> {

    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map(response => {
        
        let clientes = response as Cliente[];
        return clientes.map( cliente =>  {
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe = new DatePipe('es')
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM, yyyy' )
          //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return  cliente;
        });
      } 
      )
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal('Error al crear el cliente', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['clientes']);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal('Error al editar el cliente', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal('Error al borrar el cliente', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
}
