export function getData(file) {
  const separando = (file.split(/\n/).map(el => el.split(/\s/g)).map(el => el.filter(item => item !== '')));
  const arrayPosit = [];
  separando.shift();
  separando.pop();

  separando.forEach(item => {
    const cnpjcliente = item[0].substr(15);
    const ean = item[2];
    const codvendedor = item[3].substr(item[3].length - 2);
    
    if (cnpjcliente === 'HVENDA1102957518000810') {
      return
    } else {
      if(arrayPosit.length === 0) {
        arrayPosit.push({
          cnpjcliente: cnpjcliente,
          codvendedor: codvendedor,
          eans: [ean]
        })
      } else if(arrayPosit.find(el => el.cnpjcliente === cnpjcliente)){
        arrayPosit.forEach(el => {
          if(el.cnpjcliente === cnpjcliente){
            el.eans.push(ean)
          }
        })
      } else {
        arrayPosit.push({
          cnpjcliente: cnpjcliente,
          codvendedor: codvendedor,
          eans: [ean]
        })
      }
    }
  })

  return arrayPosit;
}
export function getData1(file) {
  const separando = file.split(/\n/);
  const arrayPosit = [];

  separando.forEach(item => {
    const dun = item.split(';')[0].replace(/[^0-9]/g,'');
    const cnpjcliente = item.split(';')[1];
    const razaoSocial = item.split(';')[2];
    const codsegmentopepsico = item.split(';')[3];
    const codvendedor = item.split(';')[5];
    
    if (cnpjcliente === 'cnpjcliente') {
      return
    } else {
      if(arrayPosit.length === 0) {
        arrayPosit.push({
          cnpjcliente: cnpjcliente,
          razaoSocial: razaoSocial,
          codsegmentopepsico: codsegmentopepsico,
          codvendedor: codvendedor,
          duns: [dun]
        })
      } else if(arrayPosit.find(el => el.cnpjcliente === cnpjcliente)){
        arrayPosit.forEach(el => {
          if(el.cnpjcliente === cnpjcliente){
            el.duns.push(dun)
          }
        })
      } else {
        arrayPosit.push({
          cnpjcliente: cnpjcliente,
          razaoSocial: razaoSocial,
          codsegmentopepsico: codsegmentopepsico,
          codvendedor: codvendedor,
          duns: [dun]
        })
      }
    }
  })

  return arrayPosit;
}
export function getProducts(file) {
  const separando = file.split(/\n/);
  const arrayProdutos = [];

  separando.forEach(item => {
    const cod = item.split(';')[0];
    const product = item.split(';')[1];
    const grama = item.split(';')[2];
    const unidades = item.split(';')[3];
    const valor = item.split(';')[4];
    const categoria = item.split(';')[5];
    const ean = item.split(';')[6];
    const dun = item.split(';')[7].trim();

    if (cod === 'COD') {
      return
    } else {
      arrayProdutos.push({
        cod,
        product,
        grama,
        unidades,
        valor,
        categoria,
        ean,
        dun
      });    
    }
  })

  return arrayProdutos;
}