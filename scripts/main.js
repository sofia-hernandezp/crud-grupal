document.addEventListener("DOMContentLoaded",()=>{
    const inputPutId = document.getElementById('inputPutId')
    const btnPut = document.getElementById('btnPut')
    const inputPutNombre = document.getElementById('inputPutNombre')
    const inputPutApellido = document.getElementById('inputPutApellido')
    const btnSendChanges = document.getElementById('btnSendChanges')

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
       inputPutNombre.value = "Juan"
       inputPutApellido.value = "Carlos"
       btnSendChanges.disabled = inputPutNombre.value == "" && inputPutApellido.value == ""
    })
})