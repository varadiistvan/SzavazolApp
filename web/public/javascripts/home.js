for(let str of ["valaszto", "orszagos", "compass", "kviz", "info"]){
    document.getElementById(str + "btn").addEventListener("click", () => {
        window.location.href = window.location.origin + "/" + str
    })
}
