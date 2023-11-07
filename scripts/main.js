let URL = 'https://65497572e182221f8d519410.mockapi.io'
let urlUsuarios = 'https://65497572e182221f8d519410.mockapi.io/users'

const btnPost = document.getElementById('btnPost')
const btnPut = document.getElementById('btnPut')
const btnDelete = document.getElementById('btnDelete')

const inputPostNombre = document.getElementById('inputPostNombre')
const inputPostApellido = document.getElementById('inputPostApellido')
const inputPut = document.getElementById('inputPutId').value
const inputDelete = document.getElementById('inputDelete')

function habilitarBoton(espacioInput, botonSeleccionado) {
    // Obtén el valor del campo de entrada
    var valorInput = espacioInput.value;
    
  
    // Habilita el botón si hay información en el campo de entrada, de lo contrario, desactívalo
    if (valorInput.trim() !== '') {
      botonSeleccionado.removeAttribute('disabled');
    } else {
      botonSeleccionado.disabled = true;
    }
    console.log("hola")
  }
  
  // Llama a la función cuando se produzca un cambio en el campo de entrada
  document.addEventListener('DOMContentLoaded', ()=>{

    inputDelete.addEventListener('change', () =>{
        habilitarBoton(inputDelete, btnDelete);
    })
  });
