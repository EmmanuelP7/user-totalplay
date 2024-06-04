import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { getUsers } from './Utils/get';
import { deleteUser } from './Utils/delete';
import { FormUpdateComponent } from '../form-update/form-update.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormUpdateComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent
{

  allUsers: any[] = [];
  showConfirmation: boolean = false;
  showConfirmationResponse: boolean = false;
  MessageConfirmationResponse: string = "";

  showUsers: boolean = true;
  deleteConfirm = false;

  usuarioNombre = "-1";
  usuarioApPaterno = "";
  usuarioApMaterno = "";
  usuarioUserId = -1;

  user = {
    userId: -1,
    foto: '',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    telefono: '',
    sueldo: '',
    fecha: new Date,
    correo: '',
    actividades: ''
  };





  constructor () { }

  async ngOnInit()
  {

    this.allUsers = await getUsers();
    console.log(this.allUsers);
    this.addNoRegistro();
  }

  addNoRegistro(): void
  {
    this.allUsers.forEach((user, index) =>
    {
      user.noRegistro = index + 1;
    });
  }

  async delete(userId: number)
  {
    console.log(userId);
    const response = await deleteUser(userId);

    this.showConfirmation = !this.showConfirmation;

    this.showConfirmationResponse = true;

    this.MessageConfirmationResponse = response.messageResponse;


  }

  recargar()
  {
    this.showConfirmationResponse = false;
    window.location.reload();
  }

  toggleConfirmation(nombre: string, apPaterno: string, apMaterno: string, userId: number)
  {
    this.usuarioNombre = nombre;
    this.usuarioApPaterno = apPaterno;
    this.usuarioApMaterno = apMaterno;
    this.usuarioUserId = userId;

    this.showConfirmation = !this.showConfirmation;
  }

  editar(registro: number)
  {

    console.log("editando");

    const usuario = this.allUsers[registro - 1];

    this.user = {
      userId: usuario.userId,
      foto: usuario.foto,
      nombre: usuario.nombre,
      apPaterno: usuario.apPaterno,
      apMaterno: usuario.apMaterno,
      telefono: usuario.telefono,
      sueldo: usuario.sueldo,
      fecha: usuario.fechaIngreso.replace("T00:00:00.000+00:00", ""),
      correo: usuario.correo,
      actividades: usuario.actividades
    };

    this.showUsers = false;

  }



}
