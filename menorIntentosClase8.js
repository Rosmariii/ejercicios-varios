
let numero = process.argv[2];
var array = Array.from(String(numero), Number);

let contador = 0;
let sumaVueltas = 0;
let numerosEncontrados = [];

for (let i = 0; i < 10000; i++) {
  contador++;
  
  for (let j = 0; j < array.length; j++) {
    if (i === array[j]) {
      sumaVueltas += contador;
      numerosEncontrados.push({ numero: i, posicion: j });
    }
  }
}

console.log(`La suma de las vueltas es: ${sumaVueltas}`);
numerosEncontrados.sort((a, b) => a.posicion - b.posicion);
let numerosEncontradosReverso = numerosEncontrados.map(obj => obj.numero).join('');
console.log(`El número es: ${numerosEncontradosReverso}`);