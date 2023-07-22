function palindromo(str) {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reversoStr = lowRegStr.split('').reverse().join(''); 
    return reversoStr === lowRegStr;
  }
  console.log(palindromo("anita lava la tina"));