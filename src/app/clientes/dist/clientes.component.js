"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientesComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var operators_1 = require("rxjs/operators");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(clienteService) {
        this.clienteService = clienteService;
    }
    ClientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var page = 0;
        this.clienteService.getClientes(page).pipe(operators_1.tap(function (response) {
            console.log('ClientesComponent: tap 3');
            response.content.forEach(function (cliente) {
                console.log(cliente.nombre);
            });
        })).subscribe(function (response) { return _this.clientes = response.content; });
    };
    ClientesComponent.prototype["delete"] = function (cliente) {
        var _this = this;
        this.clienteService["delete"](cliente.id).subscribe(function (reponse) {
            _this.clientes = _this.clientes.filter(function (cli) { return cli !== cliente; });
            sweetalert2_1["default"]('Cliente Eliminado!', 'Cliente eliminado con exito.', 'success');
        });
    };
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
            templateUrl: './clientes.component.html'
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
