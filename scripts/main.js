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