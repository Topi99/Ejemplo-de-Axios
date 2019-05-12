document.addEventListener("DOMContentLoaded", async () => {
  // Esta funcion regresa las personas que se obtienen de la petición
  const getPersonas = async () => {
    // Se obtienen por medio de Axios
    const res = await axios.get('/informacion/personas.json');
    
    return res.data.personas;
  };

  // Se inicializan las variables y constantes
  const personasSelect = document.querySelector('#personasSelect');
  const zonasSelect = document.querySelector('#zonasSelect');
  const personas = await getPersonas();
  let zonas;
  let option;
  
  // Por cada persona obtenida se agrega una opción al Select
  personas.forEach((persona, index) => {
    option = document.createElement('option')
    option.value = index;
    option.text = persona.nombre;
    personasSelect.appendChild(option);
  });

  // Se agrega un evento que ejecuta una función cada vez que cambia el valor del select de personas
  personasSelect.addEventListener('change', e => {
    zonasSelect.innerHTML = '<option selected disabled>Selecciona una zona..</option>';
    zonas = personas[e.target.value].zonas;

    // Por cada zona de la persona seleccionada, se agrega una opción nueva al select de zonas
    zonas.forEach((zona, index) => {
      option = document.createElement('option');
      option.value = index;
      option.text = zona.nombre;
      zonasSelect.appendChild(option);
    });
  });

  // Se agrega un evento que ejecuta una función cada que cambia el valor del select de zona
  zonasSelect.addEventListener('change', e => {
    document.querySelector('#precio').innerHTML = `$${zonas[e.target.value].precio}`
  });
});