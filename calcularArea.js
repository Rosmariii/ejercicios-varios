const calcularAreaCuadrado = (lado) => lado * lado
const calcularAreaRectangulo = (base, altura) => base * altura
const calcularAreaTriangulo = (base, altura) => (base * altura) / 2

function calcularArea(nombreFigura, lado, base, altura) {

  if(nombreFigura === 'cuadrado') {
    return calcularAreaCuadrado(lado)
  }

  if(nombreFigura === 'rectangulo') {
return calcularAreaRectangulo(base, altura)
  }

  if(nombreFigura === 'triangulo') {
    return calcularAreaTriangulo(base, altura)
  }

}

const areaCuadrado = calcularArea('cuadrado', 10);
const areaRectangulo = calcularArea('rectangulo', 0, 10, 20)
const areaTriangulo = calcularArea('triangulo', 0, 10, 20)

console.log(areaCuadrado + 'm2')
console.log(areaRectangulo + 'm2')
console.log(areaTriangulo + 'm2')