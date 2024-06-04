export function CrearObjeto(data: any): any
{

  const objeto =
  {

    "nombre": data.nombre,
    "apPaterno": data.apellidoPaterno,
    "apMaterno": data.apellidoMaterno,
    "telefono": data.telefono,
    "fechaIngreso": data.fecha,
    "sueldo": data.sueldo,
    "actividades": data.actividades,
    "foto": data.foto
  };

  return objeto;

}

export async function post(datos: any): Promise<any>
{

  try
  {
    const response = await fetch('http://localhost:8087/usuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });


    console.log(response);

    const data = await response.json();
    console.log('Datos recibidos:', data);

    if (response.ok)
    {
      const correo = data.correo;
      const messageResponse = "Empleado registrado correctamente\npor favor guarda tu correo: ";

      const finalResponse = {
        messageResponse: messageResponse,
        correo: correo
      };
      return finalResponse;

    }
    if (response.status == 400 && data.messageResponse != null)
    {
      const finalResponse = {
        messageResponse: data.messageResponse,
        correo: ""

      };
      return finalResponse;
    }

    throw new Error(`HTTP error! status: ${response.status}`);

    // alert(messageResponse);

  } catch (error)
  {
    // console.error('Error en la solicitud:', error);
    // alert("El usuario ya se encuentra registrado");


  }


}

export async function UploadImage(file: any): Promise<any>
{
  console.log(file);

  const formData = new FormData();
  formData.append("image", file);
  try
  {
    const response = await fetch("http://localhost:8087/subirImagen", {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    // console.log("impirminen do resultados");
    // console.log(result);

    const finalResponse = {
      messageResponse: result.message,
      status: result.status,
      urlImage: result.url
    };

    return finalResponse;

  } catch (error)
  {
    console.log("Ocurrio un error");
    console.log(error);

    const messageResponse = "Hubo un error  al subir la imagen";
    const finalResponse = {
      messageResponse: messageResponse,
      status: 400
    };
    return finalResponse;

  }


}
