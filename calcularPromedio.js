
function calcularPromedio(array) {

    let sumatoria= 0

    array.forEach(numero => {
        sumatoria = sumatoria +numero
    });

    var promedio = sumatoria / array.length

    return promedio
  }

  console.log(calcularPromedio([2,4]))
  
  
  
  
  
  
  