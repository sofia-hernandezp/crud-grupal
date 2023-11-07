document.addEventListener("DOMContentLoaded",()=>{
    const inputPutId = document.getElementById('inputPutId')
    const btnPut = document.getElementById('btnPut')
    const inputPutNombre = document.getElementById('inputPutNombre')
    const inputPutApellido = document.getElementById('inputPutApellido')
    const btnSendChanges = document.getElementById('btnSendChanges')
    const modalPut = new bootstrap.Modal(document.getElementById('dataModal'), {
        keyboard: false
      })

    inputPutId.addEventListener("input",()=>{
        btnPut.disabled = inputPutId.value == ""
    })
    inputPutNombre.addEventListener("input",()=>{
        btnSendChanges.disabled = inputPutNombre.value == ""
    })
    inputPutApellido.addEventListener("input",()=>{
        btnSendChanges.disabled = inputPutApellido.value == ""
    })
    btnPut.addEventListener("click",()=>{
        fetch('https://65497572e182221f8d519410.mockapi.io/users/'+inputPutId.value).then((res)=>{res.json().then((record)=>{
            inputPutNombre.value = record.name
            inputPutApellido.value = record.lastname
            btnSendChanges.disabled = inputPutNombre.value == "" && inputPutApellido.value == ""
            modalPut.show()
        })
        })
    })
    btnSendChanges.addEventListener("click",()=>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: inputPutNombre.value, lastname: inputPutApellido.value})
        };
        fetch('https://65497572e182221f8d519410.mockapi.io/users/'+inputPutId.value, requestOptions)
            .then(response => {
                if (response.status != 200) {
                    console.log("ERROR")
                }
                modalPut.hide()
            })
    })
})

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
