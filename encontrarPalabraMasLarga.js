function encontrarPalabraMasLarga(texto) {
    if (typeof texto !== 'string') {
      return "El valor ingresado no es una cadena de texto. Por favor, ingrese una cadena de texto.";
    }
  
    const palabras = texto.split(" ");
    let palabraMasLarga = "";
  
    palabras.forEach((palabra) => {
      if (palabra.length > palabraMasLarga.length) {
        palabraMasLarga = palabra;
      }
    });
  
    return palabraMasLarga;
  }
  
  console.log(encontrarPalabraMasLarga("La casa es muy grande"));