import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { allIsValid, isValid } from '../formulario/Utils/Validation';
import { CrearObjeto, put } from './utils/put';
import { UploadImage } from '../formulario/Utils/Post';

@Component({
  selector: 'app-form-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class FormUpdateComponent
{
  @Input() user: any;
  formGroup !: FormGroup;
  fotoUrl: string = "";

  constructor (private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {


    this.formGroup = this.formBuilder.group({
      id: -1,
      foto: [''],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      telefono: [''],
      sueldo: [''],
      fecha: [''],
      correo: [''],
      actividades: ['']
    });

    if (this.user)
    {
      this.formGroup.patchValue({
        id: this.user.userId,
        nombre: this.user.nombre,
        apellidoPaterno: this.user.apPaterno,
        apellidoMaterno: this.user.apMaterno,
        telefono: this.user.telefono,
        sueldo: this.user.sueldo,
        fecha: this.user.fecha,
        correo: this.user.correo,
        actividades: this.user.actividades
      });
    }
    this.imageSrc = this.user.foto;
    console.log(this.imageSrc);


  }

  cancelar()
  {
    window.location.reload();


  }

  showNotification = false;
  notificationMessage = "";
  notificationsEmail = "";
  notifactionType = "";
  allValid = false;
  okResponse = false;

  fotofinal: File | null = null;
  fotoDriveUrl: string = "";



  valid = {
    mensaje: "",
    status: "",
    campo: ""
  };

  imageSrc: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  maxFileSize = 40 * 1024;

  private timeoutId: any;


  closeNotification()
  {
    this.showNotification = false;

    if (this.okResponse && this.allValid)
    {
      this.okResponse = false;
      this.allValid = false;
      window.location.reload();
    }
  }


  imageBlob: Blob | undefined;

  triggerFileInputClick(): void
  {
    const fileInput = document.getElementById('exampleFormControlFile1') as HTMLInputElement;
    fileInput.click();
  }


  async subirfoto()
  {
    console.log(this.fotofinal);

    if (this.fotofinal != null)
    {
      console.log("si esta lleno");
      const respuesta = await UploadImage(this.fotofinal);
      console.log("imprimiendo respuesta");
      console.log(respuesta);
      this.fotoDriveUrl = respuesta.urlImage;
      return;
    }

    console.log("sin imagen");
    this.formGroup.value.foto = "";
  }

  onFileSelected(event: Event): void
  {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0])
    {
      let file = input.files[0];
      if (this.maxFileSize < file.size)
      {
        this.errorMessage = 'El archivo excede el tamaño máximo permitido 4KB.';
        this.imageSrc = "";
        return;
      }
      this.fotofinal = file;
      this.subirfoto();
      // console.log("tama;os maximo y de file");

      // console.log(this.maxFileSize);

      // console.log(file.size);

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) =>
      {
        if (e.target && e.target.result)
        {
          this.imageSrc = e.target.result;
          this.imageBlob = file;

        }
      };



      reader.readAsDataURL(file);
      this.errorMessage = '';
    }
    this.imageSrc = this.fotoDriveUrl;
  }
  validar(campo: string, dato: string)
  {

    console.log("url de la foto");

    console.log(this.fotoDriveUrl);

    console.log("DATOS DE FORM GROUP");
    console.log(this.formGroup.value);

    this.valid.campo = campo;
    console.log(this.valid.campo);
    console.log(dato);

    console.log("DATOS DE MENSAJE Y EL ESTADO");

    console.log(this.valid.mensaje);
    console.log(this.valid.status);


    if (this.timeoutId)
    {
      clearTimeout(this.timeoutId);
    }

    const result = (isValid(campo, dato));

    this.valid.mensaje = result.mensaje;
    this.valid.status = result.status;

    const time = this.valid.status == "valid" ? 1000 : 3500;

    this.timeoutId = setTimeout(() =>
    {
      this.valid.mensaje = '';
      if (this.valid.status == 'valid')
      {
        this.valid.status = '';
      }

    }, time);

  }

  async actualizar()
  {
    this.formGroup.value.foto = this.fotoDriveUrl;
    console.log(this.formGroup.value);

    this.allValid = allIsValid(this.formGroup.value);

    if (this.allValid)
    {
      const respuesta = await put(CrearObjeto(this.formGroup.value));

      this.notificationMessage = respuesta.messageResponse;
      if (respuesta.messageResponse == "Este usuario ya se encuentra registrado")
      {
        this.notifactionType = 'alert-danger';

      } else
      {
        this.notifactionType = 'alert-secondary';
        this.okResponse = true;
      }

      this.notificationsEmail = respuesta.correo;
      this.showNotification = true;



    } else
    {
      this.notifactionType = 'alert-danger';
      this.showNotification = true;
      this.notificationMessage = "DATOS INCORRECTOS\nPor favor verifica tus datos ";
    }



  }


}
