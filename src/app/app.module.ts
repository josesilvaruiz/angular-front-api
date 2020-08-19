import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Http 

import { HttpClientModule } from '@angular/common/http';

//Services

import { ClienteService } from './clientes/cliente.service';

//Routing

import { RouterModule, Routes } from '@angular/router';

// Forms 

import { FormsModule } from '@angular/forms';

// Locale

import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

//Components

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch:'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'cliente/form', component: FormComponent},
  {path: 'cliente/form/:id', component: FormComponent}
 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
