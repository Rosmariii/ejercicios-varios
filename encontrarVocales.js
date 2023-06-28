function contarVocales(frase) {

    let vocales = ['a','e','i','o','u']
    const array = frase.split('')
    let count = 0

    array.forEach(letra => {
        if(vocales.includes(letra.toLowerCase())){
            count = count +1
        }
    });

 if(count){
    console.log(`Posee ${count} vocales`)
 }else{
    console.log('No posee vocales')
 }

  }

  contarVocales('Aveces vuelvo');