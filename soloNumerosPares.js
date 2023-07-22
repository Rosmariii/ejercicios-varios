function soloNumerosPares(array) {

    const arrayNumeros = array.every((element) => {
        return typeof element ===  'number';
      });

    if( !arrayNumeros ) {
        return "El caracter ingresado no es correcto, se debe ingresar un array de numeros"
    }

    let nuevoArreglo = array.filter(element => {
        return element % 2 === 0;
    });

    return nuevoArreglo
    

} 
console.log(soloNumerosPares([1, 2, 3, 4, 5, 6]))