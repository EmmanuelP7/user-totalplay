export function CrearObjeto(data: any): any
{

  const objeto =
  {

    "userId": data.id,
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



export async function put(datos: any): Promise<any>
{

  try
  {
    const response = await fetch('http://localhost:8087/usuario/', {
      method: 'PUT',
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
      const messageResponse = "Registro actualizado correctamente\npor favor guarda tu correo: ";

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

