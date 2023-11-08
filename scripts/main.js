let URL = 'https://65497572e182221f8d519410.mockapi.io'
let urlUsuarios = 'https://65497572e182221f8d519410.mockapi.io/users'

const errorAlert = document.getElementById('alert-error');

function showAlert() {
  errorAlert.classList.add('show')
  setTimeout(()=> errorAlert.classList.remove('show'),2000)
};

document.addEventListener("DOMContentLoaded",()=>{

    const inputPutId = document.getElementById('inputPutId')
    const btnPut = document.getElementById('btnPut')
    const inputPutNombre = document.getElementById('inputPutNombre')
    const inputPutApellido = document.getElementById('inputPutApellido')
    const btnDelete = document.getElementById('btnDelete')
    const inputDelete = document.getElementById('inputDelete')
    const btnSendChanges = document.getElementById('btnSendChanges')
    const modalPut = new bootstrap.Modal(document.getElementById('dataModal'), {
        keyboard: false
      })
    const resultsContainer = document.getElementById('results');

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
        fetch('https://65497572e182221f8d519410.mockapi.io/users/'+inputPutId.value).then((res)=>{
            if (!res.ok) {
                throw new Error('La solicitud GET no fue exitosa');
            }
            return res.json()})
            .then((record)=>{
                inputPutNombre.value = record.name
                inputPutApellido.value = record.lastname
                btnSendChanges.disabled = inputPutNombre.value == "" && inputPutApellido.value == ""
                modalPut.show()
            }).catch(error => {
                console.error('Error en la solicitud GET:', error);
                showAlert()
              });
    })

btnSendChanges.addEventListener("click",()=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputPutNombre.value, lastname: inputPutApellido.value})
    };
    fetch('https://65497572e182221f8d519410.mockapi.io/users/'+inputPutId.value, requestOptions).then(response => {
        if (!response.ok) {
            throw new Error('La solicitud PUT no fue exitosa');
        }
        return response.json()}).then(res => {
            modalPut.hide()
            mostrarListaCompleta()
        }).catch(error => {
            console.error('Error en la solicitud PUT:', error);
            showAlert()
        });
})

function mostrarListaCompleta() {
    fetch('https://65497572e182221f8d519410.mockapi.io/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
           
          throw new Error('La solicitud GET no fue exitosa');
        }
        response.json().then((lista) => {
            resultsContainer.innerHTML = '';
            console.log(resultsContainer)
            lista.forEach(item => {
                console.log(item.name)
                let nuevoItem = document.createElement('li')
                nuevoItem.classList.add("border-bottom")
                nuevoItem.innerHTML = ` <span>ID:${item.id}</span><br>
                <span>NAME:${item.name}</span><br>
                <span>LASTNAME:${item.lastname}</span>`
                resultsContainer.appendChild(nuevoItem)
            });
        })
      })
      .then(data => {

      })
      .catch(error => {
        console.error('Error en la solicitud GET:', error);
        showAlert()
      });
  }

const btnBuscar = document.getElementById("btnGet1");
const inputBuscarID = document.getElementById("inputGet1Id");

btnBuscar.addEventListener("click", ()=> {

    if(inputBuscarID.value !== "") {
        mostrarDatosUsuario()
    } else {
        mostrarListaCompleta()
    }

})

function mostrarDatosUsuario() {
    fetch('https://65497572e182221f8d519410.mockapi.io/users/' + inputBuscarID.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
           
          throw new Error('La solicitud GET no fue exitosa');
        }
        response.json().then((lista) => {
            resultsContainer.innerHTML = '';
            console.log(lista)
                let nuevoItem = document.createElement('li')
                nuevoItem.classList.add("border-bottom")
                nuevoItem.innerHTML = ` <span>ID:${lista.id}</span><br>
                <span>NAME:${lista.name}</span><br>
                <span>LASTNAME:${lista.lastname}</span>`
                resultsContainer.appendChild(nuevoItem)
        })
      })
      .then(data => {

      })
      .catch(error => {
        console.error('Error en la solicitud GET:', error);
        showAlert();
      });
}


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
    fetch('https://65497572e182221f8d519410.mockapi.io/users', {
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
            mostrarListaCompleta()
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
            showAlert()
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

function habilitarBoton(espacioInput, botonSeleccionado) {
  var valorInput = espacioInput.value;

  if (valorInput.trim() !== '') {
    botonSeleccionado.removeAttribute('disabled');
  } else {
    botonSeleccionado.disabled = true;
  }
}
inputDelete.addEventListener('change', () =>{
  habilitarBoton(inputDelete, btnDelete);
})

const inputDeleteID = document.getElementById("inputDelete");
const btnDeleteID = document.getElementById("btnDelete");

 btnDeleteID.addEventListener("click", () => {
    
 fetch(`https://65497572e182221f8d519410.mockapi.io/users/`+ inputDeleteID.value, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  },
  body: null
 }).then(response => {
     if (!response.ok) {
         throw new Error('Error en la solicitud Delete');
     }
     return response.json();
  }).then(data => {
     mostrarListaCompleta()
  }).catch(error => {
      console.error('Error en la solicitud Delete:', error);
      showAlert()
    })
})
})
