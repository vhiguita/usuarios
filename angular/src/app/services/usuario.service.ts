import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {CommonService} from './common.service';
import {AlertService} from './alert.service';

@Injectable()
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }
  //get users
  obtenerUsuarios(): Promise<any> {
    const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios';
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log('usuario.service.obtenerUsuarios:', response);
        if(response) {
          return response;
        } else {
          /*if (response && response['estado'] == 'ERROR') {
            this.alertService.error(response['mensaje']);
          }*/
        }
      })
      .catch((err) => this.commonService.handlePromiseError(err));
  }
  //get rols
  obtenerRoles(): Promise<any> {
    const url = this.commonService.obtenerPrefijoUrlServicio() + '/rols';
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log('usuario.service.obtenerRoles:', response);
        if(response) {
          return response;
        } else {
          /*if (response && response['estado'] == 'ERROR') {
            this.alertService.error(response['mensaje']);
          }*/
        }
      })
      .catch((err) => this.commonService.handlePromiseError(err));
  }
  //create user
  crearUsuario(queryParams: any): Promise<any>{
    const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios/add';
    return this.http.post(url + queryParams,{})
    .toPromise()
    .then(response => {
      console.log('usuario.service.crearUsuario:', response);
      return response;
    })
    .catch((err) => this.commonService.handlePromiseError(err));
  }
  //update user
  actualizarUsuario(usuario: any): Promise<any>{
    const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios/update';
    return this.http.post(url + usuario, {}, {responseType: 'text'})
    .toPromise()
    .then(response => {
      console.log('usuario.service.actualizarUsuario:', response);
      return response;
    })
    .catch((err) => this.commonService.handlePromiseError(err));
  }
  //get user (id)
  obtenerUsuario(id): Promise<any> {
    if (id > -1) {
      const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios/' + id;
      return this.http.get(url)
        .toPromise()
        .then(response => {
          console.log('usuario.service.obtenerUsuario:', response);
          if(response) {
            return response;
          } else {
            /*if (response && response['estado'] == 'ERROR') {
              this.alertService.error(response['mensaje']);
            }*/
          }
        })
        .catch((err) => this.commonService.handlePromiseError(err));
     }

    }
    //delete user (id)
    eliminarUsuario(id): Promise<any> {
      if (id > -1) {

        const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios/delete/' + id;
        return this.http.get(url,{responseType: 'text'})
          .toPromise()
          .then(response => {
            console.log('usuario.service.eliminarUsuario:', response);
            if(response) {
              return response;
            } else {
              /*if (response && response['estado'] == 'ERROR') {
                this.alertService.error(response['mensaje']);
              }*/
            }
          })
          .catch((err) => this.commonService.handlePromiseError(err));
      }
    }
    //get user by name
    obtenerUsuarioPorNombre(nombre){
      const url = this.commonService.obtenerPrefijoUrlServicio() + '/usuarios/getName/' + nombre;
      return this.http.get(url)
        .toPromise()
        .then(response => {
          console.log('usuario.service.obtenerUsuario:', response);
          if(response) {
            return response;
          } else {
            /*if (response && response['estado'] == 'ERROR') {
              this.alertService.error(response['mensaje']);
            }*/
          }
        })
        .catch((err) => this.commonService.handlePromiseError(err));
    }
}
