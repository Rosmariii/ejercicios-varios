function cantidadDeVecesEncontrada(texto) {

    if( typeof texto !== 'string' ) {
        return "El caracter ingresado no es un string. Se debe ingresar un string"
    }

    const palabraSeparada = texto.split(" ");
   
    let objeto = {}
    for (let i = 0; i < palabraSeparada.length; i++) {
        objeto[palabraSeparada[i]] = ++objeto[palabraSeparada[i]] || 1;
    }
         
 
    return objeto
    

} 
console.log(cantidadDeVecesEncontrada("hola que tal que haces"))