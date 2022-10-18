export function getData(file) {
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