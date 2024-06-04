import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isValid, allIsValid } from './Utils/Validation';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CrearObjeto, UploadImage, post } from './Utils/Post';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent
{
  correo: string = "";
  imageSrc: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  maxFileSize = 40 * 1024;
  valid = {
    mensaje: "",
    status: "",
    campo: ""
  };

  showNotification = false;
  notificationMessage = "";
  notificationsEmail = "";
  notifactionType = "";
  allValid = false;
  okResponse = false;




  private readonly _formBuilder = inject(FormBuilder);
  formGroup = this._formBuilder.group({
    foto: [""],
    nombre: [""],
    apellidoPaterno: [""],
    apellidoMaterno: [""],
    telefono: [""],
    sueldo: [""],
    fecha: [""],
    correo: [""],
    actividades: [""]
  });

  fotofinal: File | null = null;
  fotoDriveUrl: string = "";



  private timeoutId: any;

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

      console.log(reader);

      reader.onload = (e: ProgressEvent<FileReader>) =>
      {
        if (e.target && e.target.result)
        {
          this.imageSrc = e.target.result;
        }
      };

      reader.readAsDataURL(file);
      this.errorMessage = '';
    }
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




  async registrar()
  {



    this.formGroup.value.foto = this.fotoDriveUrl;

    this.allValid = allIsValid(this.formGroup.value);


    if (this.allValid)
    {
      const respuesta = await post(CrearObjeto(this.formGroup.value));
      // console.log("ya salio, aqui esta respuesta");
      // console.log(respuesta);

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


}


