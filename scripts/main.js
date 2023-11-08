let URL = 'https://65497572e182221f8d519410.mockapi.io'
let urlUsuarios = 'https://65497572e182221f8d519410.mockapi.io/users'

const btnBuscar = document.getElementById("btnGet1");
const resultsContainer = document.getElementById('results');
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
      });
  }

  