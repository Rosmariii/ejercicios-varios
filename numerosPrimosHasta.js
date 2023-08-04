function esPrimo(numero) {
    if (numero <= 1) {
      return false;
    }
  
    for (let i = 2; i * i <= numero; i++) {
      if (numero % i === 0) {
        return false;
      }
    }
  
    return true;
  }
  
  function numerosPrimosHasta(num) {
    if (typeof num !== "number") {
      return "El caracter ingresado es incorrecto. Ingrese un numero";
    }
  
    let numerosPrimos = [];
  
    for (let i = 2; i <= num; i++) {
      if (esPrimo(i)) {
        numerosPrimos.push(i);
      }
    }
  
    return numerosPrimos;
  }
  
  console.log(numerosPrimosHasta(10));