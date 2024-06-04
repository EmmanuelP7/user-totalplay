
const valid = {
  mensaje: "Todo pinta bien",
  status: "valid",
  valid: true
};

export function isValid(campo: string, dato: string): any
{

  // console.log("aplicando validacion");

  // console.log(dato);
  // console.log(campo);

  let respuesta = null;

  switch (campo)
  {
    case 'nombre':
      respuesta = validarNombre(dato);
      break;
    case 'apellidoPaterno':
      respuesta = validarApellidos(dato);
      break;
    case 'apellidoMaterno':
      respuesta = validarApellidos(dato);
      break;
    case 'telefono':
      respuesta = validarNumero(dato);
      break;
    case 'sueldo':
      respuesta = validarSueldo(dato);
      break;
    case 'fecha':
      respuesta = validarFecha(dato);
      break;


  }
  console.log("chechado el contenido");
  console.log(respuesta);

  return respuesta;
}

function validarNombre(nombre: string): any
{
  nombre = nombre.trim();
  const dosNombres = /^[A-Z]+( [A-Z]+)?$/;


  if (!dosNombres.test(nombre) || nombre === "")
  {
    return {
      mensaje: "No se admiten caracteres especiales.\nSolo puede haber un espacio entre los nombres",
      status: "invalid",
      valid: false
    };
  }

  return valid;

}

function validarApellidos(apellido: string): any
{
  const soloLetras = /^[A-Z]+$/;
  apellido = apellido.trim();

  if (!soloLetras.test(apellido) || apellido === "")
  {
    return {
      mensaje: "No se admiten caracteres especiales.",
      status: "invalid",
      valid: false
    };
  }
  return valid;

}

function validarNumero(numero: string): any
{
  const numeros = /^\d+$/;
  if (!numeros.test(numero) || numero === "")
  {
    return {
      mensaje: "Solo se admiten números.",
      status: "invalid",
      valid: false
    };
  }
  return valid;
}

function validarSueldo(sueldo: string): any
{
  const sueldoV = /^\d{1,6}(\.\d{1,2})?$/;

  if (!sueldoV.test(sueldo) || sueldo === "")
  {
    return {
      mensaje: "Solo se admiten números.\n en un rango de 0 a 299999.99",
      status: "invalid",
      valid: false
    };
  }
  return valid;
}

function validarFecha(fecha: string): any
{
  // console.log("validando la fecha");
  // console.log("daato de entrada: ", fecha);

  fecha = fecha.replace("/", "-");
  const fechaIngresada: Date = StringToDate(fecha);
  const fechaActual = new Date();

  fechaActual.setHours(0, 0, 0, 0);

  console.log("fecha actual");
  console.log(fechaActual);

  console.log("fecha ingresada");
  console.log(fechaIngresada);

  if ((fechaIngresada.getTime() < fechaActual.getTime()) || fecha == "")
  {
    return {
      mensaje: "La fecha debe ser actual o futura.",
      status: "invalid",
      valid: false
    };
  };
  return valid;

}



export function StringToDate(date: string): Date
{
  const partes = date.split('-');

  // console.log("fecha ingresada");
  // console.log(date);

  // console.log("dia", partes[2]);
  // console.log("mes", partes[1]);
  // console.log("año", partes[0]);

  const day = parseInt(partes[2], 10);
  const month = parseInt(partes[1], 10) - 1;
  const year = parseInt(partes[0], 10);

  return new Date(year, month, day);
}


export function crearCorreo(inputNombre: string, inputApellido: string): string
{

  // console.log("creando correo");

  const nombres: string[] = inputNombre?.split(" ") ?? [];

  let nombre: string = "";
  const nombreValid: any = validarNombre(inputNombre);
  const apellidoValid: any = validarApellidos(inputApellido);


  if (nombreValid.status == "valid" && apellidoValid.status == "valid")
  {

    if (nombres.length > 1)
    {
      nombre = (nombres[0].toLowerCase() + "-" + nombres[1].toLowerCase());
    }
    else
    {
      nombre = nombres[0].toLowerCase();
    }

    const apellidoPaterno: string = inputApellido?.toLowerCase() ?? "";

    return (nombre + "." + apellidoPaterno + "@totalplay.com.mx");
  }
  else
  {
    return "";
  }
}

function isEmpty(dato: String)
{
  if (dato == "")
  {
    return {
      mensaje: "No se admiten campos vacios",
      status: "invalid",
      valid: false
    };
  }
  return valid;

}

export function allIsValid(datos: any): boolean
{
  console.log("Validando todo el conjunto de datos");

  const validName = validarNombre(datos.nombre);
  const validApPat = validarApellidos(datos.apellidoPaterno);
  const validApMat = validarApellidos(datos.apellidoMaterno);
  const validTel = validarNumero(datos.telefono);
  const validSuel = validarSueldo(datos.sueldo);
  const validFecha = validarFecha(datos.fecha);
  const validActi = isEmpty(datos.actividades);

  console.log(validName.valid);
  console.log(validApPat.valid);
  console.log(validApMat.valid);
  console.log(validTel.valid);
  console.log(validSuel.valid);
  console.log(validFecha.valid);
  console.log(validActi.valid);


  if (validName.valid == false ||
    validApPat.valid == false || validApMat.valid == false ||
    validTel.valid == false || validSuel.valid == false ||
    validFecha.valid == false || validActi.valid == false
  )
  {
    return false;
  }



  return true;
}


