export function getUsers(): Promise<any[]>
{
  const url = 'http://localhost:8087/usuario/';
  console.log(url);

  return fetch(url)
    .then(response => response.json())
    .catch(error =>
    {
      console.error('Error:', error);
      return [];
    });
}
