let URL = 'https://65497572e182221f8d519410.mockapi.io'
let urlUsuarios = 'https://65497572e182221f8d519410.mockapi.io/users'



const inputNombre = document.getElementById('inputPostNombre');
const inputApellido = document.getElementById('inputPostApellido');
const btnAgregar = document.getElementById('btnPost'); 

btnAgregar.addEventListener('click', () => {

    const nombre = inputNombre.value;
    const apellido = inputApellido.value;

    const datosAgregar = {
        name: nombre,
        lastname: apellido
    };

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAgregar)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud POST no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            console.log('Nuevo registro creado:', data);
            inputNombre.value = '';
            inputApellido.value = '';
            mostrarDatosEnLista(data);
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
});

    inputNombre.addEventListener('input', actualizarBotonAgregar);
    inputApellido.addEventListener('input', actualizarBotonAgregar);

    function actualizarBotonAgregar() {
        const nombre = inputNombre.value;
        const apellido = inputApellido.value;
        btnAgregar.disabled = nombre.trim() === '' || apellido.trim() === '';
    }

    function mostrarDatosEnLista(data) {
        const resultsContainer = document.getElementById('results');
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('list-group-item', 'text-white');
        nuevoItem.textContent = `Nombre: ${data.name}, Apellido: ${data.lastname}`;
        resultsContainer.appendChild(nuevoItem);
    }