
let texto = process.argv[2];
texto = texto.toLowerCase();

var sumatoria = ['suma', 'sumatoria', 'sumar', 'sumame', 'sume'];
var resta = ['resta', 'restame', 'restar', 'resta', 'reste'];
var multiplicar = ['multiplicame', 'multiplicar', 'multiplica', 'producto', 'multiplique'];
var dividir = ['divide', 'dividir','dividi', 'division', 'divideme'];

var regexSuma = new RegExp("\\b(" + sumatoria.join("|") + ")\\b", "gi");
var palabraBuscadaSuma = texto.match(regexSuma);

var regexResta = new RegExp("\\b(" + resta.join("|") + ")\\b", "gi");
var palabraBuscadaResta = texto.match(regexResta);

var regexMulti = new RegExp("\\b(" + multiplicar.join("|") + ")\\b", "gi");
var palabraBuscadaMulti = texto.match(regexMulti);

var regexDividir = new RegExp("\\b(" + dividir.join("|") + ")\\b", "gi");
var palabraBuscadaDividir = texto.match(regexDividir);

var cifra = /-?\b\d+(?:\.\d+)?\b/g;
var resultado = texto.match(cifra);

var cifraCalculada = 0;
var multiplicacionEncontrada = false;
var divisionEncontrada = false;
var indiceDivision = -1;

for (var i = 0; i < resultado.length; i++) {
  var numero = parseFloat(resultado[i]);

  if (palabraBuscadaSuma !== null && sumatoria.includes(palabraBuscadaSuma[0])) {
    cifraCalculada += numero;
  }
  if (palabraBuscadaResta !== null && resta.includes(palabraBuscadaResta[0])) {
    cifraCalculada = Math.abs(cifraCalculada - numero);
  }
  if (palabraBuscadaMulti !== null && multiplicar.includes(palabraBuscadaMulti[0]) && !multiplicacionEncontrada) {
    cifraCalculada = numero;
    multiplicacionEncontrada = true;
  } else if (multiplicacionEncontrada) {
    cifraCalculada *= numero;
  }
  if (palabraBuscadaDividir !== null && dividir.includes(palabraBuscadaDividir[0]) && !divisionEncontrada) {
    cifraCalculada = numero;
    divisionEncontrada = true;
    indiceDivision = i;
  } else if (divisionEncontrada && i > indiceDivision) {
    cifraCalculada /= numero;
  } 
}

console.log(`El resultado es: ${cifraCalculada}`);