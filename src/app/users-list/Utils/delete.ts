export async function deleteUser(userId: number)
{
  const url = 'http://localhost:8087/usuario/eliminar/' + userId;
  console.log(url);

  try
  {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

    });

    const responseData = await response.json();
    console.log(responseData);


    if (!response.ok)
    {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return responseData;

  } catch (error)
  {
    console.error('Error en la solicitud:', error);

  }
}
