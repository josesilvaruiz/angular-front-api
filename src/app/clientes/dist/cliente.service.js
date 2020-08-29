"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var ClienteService = /** @class */ (function () {
    function ClienteService(http, router) {
        this.http = http;
        this.router = router;
        this.urlEndPoint = 'http://localhost:8080/api/clientes';
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    /** getClientes(): Observable<Cliente[]> {
     *     return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[] ));
     *
     */
    ClienteService.prototype.getClientes = function (page) {
        return this.http.get(this.urlEndPoint + '/page/' + page).pipe(operators_1.tap(function (response) {
            console.log('ClienteService: tap 1');
            response.content.forEach(function (cliente) {
                console.log(cliente.nombre);
            });
        }), operators_1.map(function (response) {
            response.content.map(function (cliente) {
                cliente.nombre = cliente.nombre.toUpperCase();
                var datePipe = new common_1.DatePipe('es');
                //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM, yyyy' )
                //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
                return cliente;
            });
            return response;
        }), operators_1.tap(function (response) {
            console.log('ClienteService: tap 2');
            response.content.forEach(function (cliente) {
                console.log(cliente.nombre);
            });
        }));
    };
    ClienteService.prototype.create = function (cliente) {
        return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(operators_1.catchError(function (e) {
            if (e.status == 400) {
                return rxjs_1.throwError(e);
            }
            sweetalert2_1["default"]('Error al crear el cliente', e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.getCliente = function (id) {
        var _this = this;
        return this.http.get(this.urlEndPoint + "/" + id).pipe(operators_1.catchError(function (e) {
            _this.router.navigate(['clientes']);
            sweetalert2_1["default"]('Error al editar', e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.update = function (cliente) {
        return this.http.put(this.urlEndPoint + "/" + cliente.id, cliente, { headers: this.httpHeaders }).pipe(operators_1.catchError(function (e) {
            if (e.status == 400) {
                return rxjs_1.throwError(e);
            }
            sweetalert2_1["default"]('Error al editar el cliente', e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype["delete"] = function (id) {
        return this.http["delete"](this.urlEndPoint + "/" + id, { headers: this.httpHeaders }).pipe(operators_1.catchError(function (e) {
            sweetalert2_1["default"]('Error al borrar el cliente', e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService = __decorate([
        core_1.Injectable()
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
