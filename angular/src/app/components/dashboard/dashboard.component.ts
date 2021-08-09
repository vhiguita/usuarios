import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {UsuarioService} from '../../services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pName = "";
  disabled = true;
  isReadOnly = true;
  saveDisabledBtn = true;
  editDisabledBtn = true;
  cancelDisabledBtn = true;
  rolSelectDisabled = true;
  deleteDisabledBtn = true;
  usuario: any = {idUsuario:"", idRol:"",nombre:"",activo:""};
  usuarios: any []=[];
  usuarios_: any []=[];
  roles: any []=[];
  constructor(private modalService: NgbModal,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = {};
    this.usuario.activo = false;
    this.obtenerUsuarios();
    this.obtenerRoles();
  }
  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios().then(response => {
        console.log(response);
        this.usuarios = response;
        this.usuarios_ = response;
     });
  }
  obtenerRoles(){
    this.usuarioService.obtenerRoles().then(response => {
        console.log(response);
        this.roles = response;
    });
  }
  clear() {
    this.pName = "";
    this.usuarios = this.usuarios_;
  }
  search() {
    // console.log(this.filtro(this.pName));
    if(this.pName!=""){
      this.usuarios = this.filter(this.pName);
    }else{
      this.clear();
    }
  }
  filter(nombre) {
  	return this.usuarios.filter(object => {
  		return object['nombre'].toUpperCase().includes(nombre.toUpperCase());
  	});
  }
  create() {
    this.isReadOnly = false;
    this.rolSelectDisabled = false;
    this.disabled = false;
    this.saveDisabledBtn = false;
    this.cancelDisabledBtn = false;
    this.usuario.idUsuario = "";
    this.usuario.nombre = " ";
    this.usuario.idRol = "";
    this.usuario.activo = false;
  }
  cancel(){
    //alert("Cancelando");
    this.disable();
  }
  disable(){
    this.isReadOnly = true;
    this.rolSelectDisabled = true;
    this.disabled = true;
    this.saveDisabledBtn = true;
    this.editDisabledBtn = true;
    this.deleteDisabledBtn = true;
    this.cancelDisabledBtn = true;
    this.usuario.idUsuario = "";
    this.usuario.nombre = " ";
    this.usuario.idRol = "";
    this.usuario.activo = false;
  }
  onClick(id){
   this.disable();
   console.log(id);
   this.obtenerUsuario(id);
  }
  obtenerUsuario(id){
    this.usuarioService.obtenerUsuario(id).then(response => {
        console.log(response);
        console.log(response.idUsuario);
        console.log(response.nombre);
        this.usuario.idUsuario = response.idUsuario;
        this.usuario.nombre = response.nombre;
        this.usuario.idRol = response.idRol;
        if(response.activo=="1"){
          this.usuario.activo = true;
        }else{
          this.usuario.activo = false;
        }
        this.isReadOnly = false;
        this.rolSelectDisabled = false;
        this.disabled = false;
        this.editDisabledBtn = false;
        this.deleteDisabledBtn = false;
        this.cancelDisabledBtn = false;
     });
  }
  delete(){
    let that = this;
    swal({
      title: '¿Esta seguro de borrar el usuario?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(function (s) {
      console.log(s);
     if(s.dismiss !== undefined){
       if (s.dismiss.toString() === 'cancel') {
       }
     }else{
       if(s.value!== undefined){
          that.eliminarUsuario(that.usuario.idUsuario);
       }
     }
   }).catch(swal.noop);
    //this.eliminarUsuario(this.usuario.idUsuario);
  }
  eliminarUsuario(id){
    this.usuarioService.eliminarUsuario(id).then(response => {
        console.log(response);
        if(response=="Usuario eliminado correctamente."){
           let index = this.usuarios.map(obj => obj.idUsuario).indexOf(id);
           this.usuarios.splice(index,1);
           this.usuarios_ = this.usuarios;
           swal({
             title: 'Mensaje',
             text: 'El usuario ha sido eliminado correctamente.',
             type: 'success'
            }).catch(swal.noop);
            this.disable();
        }
     });
  }
  crearActualizarUsuario(){
    if(this.usuario.idUsuario!=""){
      let activo;
      if(this.usuario.activo){
        activo = '1';
      }else{
        activo = '0';
      }

      const usuario = `?idUsuario=${this.usuario.idUsuario}&idRol=${this.usuario.idRol}&nombre=${this.usuario.nombre.trim().toLowerCase()}&activo=${activo}`;
      this.usuarioService.actualizarUsuario(usuario).then(response => {
       if(response=="Usuario modificado exitosomante"){
          for(let i=0;i<this.usuarios.length;i++){
             if(parseInt(this.usuarios[i].idUsuario) == parseInt(this.usuario.idUsuario)){
               this.usuarios[i].idRol =parseInt(this.usuario.idRol);
               this.usuarios[i].nombre = this.usuario.nombre;
               this.usuarios[i].activo = activo;
               break;
             }
          }
          this.usuarios_=this.usuarios;
          swal({
            title: 'Mensaje',
            text: 'El usuario ha sido modificado exitosomante',
            type: 'success'
           }).catch(swal.noop);
           this.disable();
        }
      });
    }else{
      this.usuarioService.obtenerUsuarioPorNombre(this.usuario.nombre.trim().toLowerCase()).then(response => {
          if(response === undefined){
            let activo;
            if(this.usuario.activo){
              activo = '1';
            }else{
              activo = '0';
            }
            const queryParams = `?idRol=${this.usuario.idRol}&nombre=${this.usuario.nombre.trim().toLowerCase()}&activo=${activo}`;
            console.log(queryParams);
             this.usuarioService.crearUsuario(queryParams).then(response => {
               this.usuarios.push({idUsuario:response.idUsuario,idRol:response.idRol,nombre:response.nombre,activo:response.activo});
               this.usuarios_=this.usuarios;
               swal({
                 title: 'Mensaje',
                 text: 'El usuario ha sido creado exitosomante',
                 type: 'success'
                }).catch(swal.noop);
               this.disable();
             });
          }else{
            swal({
              title: 'Mensaje',
              text: 'Ya existe un usuario con el mismo nombre',
              type: 'warning'
             }).catch(swal.noop);
          }
      });
      // let activo;
      // if(this.usuario.activo){
      //   activo = '1';
      // }else{
      //   activo = '0';
      // }
      //
      // const queryParams = `?idRol=${this.usuario.idRol}&nombre=${this.usuario.nombre.toLowerCase()}&activo=${activo}`;
      // console.log(queryParams);
      //  this.usuarioService.crearUsuario(queryParams).then(response => {
      //    this.usuarios.push({idUsuario:response.idUsuario,idRol:response.idRol,nombre:response.nombre,activo:response.activo});
      //    this.usuarios_=this.usuarios;
      //    this.disable();
      //  });
    }
  }
}
