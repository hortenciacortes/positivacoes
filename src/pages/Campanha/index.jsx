import { useEffect, useState } from "react";
import { getData } from "../../server";

import './styles.scss';

export function Campanha() {
  const [vendedor, setVendedor] = useState('VEN64');
  const [duns, setDuns] = useState('');
  const [data, setData] = useState(null);
  const [positivacoes, setPositivacoes] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    file && setData(getData(file));
  }, [file])

  function handleFile(e) {
    var file = new FileReader();

    file.onload = (e) => {
      setFile(e.target.result)
    }

    file.readAsText(e.target.files[0]);
  }

  function handleDuns() {
    const arrayDuns = duns.split(';');

    arrayDuns.forEach(item => {
      if(item.replace(/[^0-9]/g,'').length === 14) {
        setPositivacoes([]);
        handlePositivacoes(arrayDuns);
      } else {
        alert('Dun inválido')
      }
    })
  }
  
  function handlePositivacoes(arrayDuns) {
    data.forEach(item => {
      if(item.codvendedor === vendedor){
        const filterDuns = arrayDuns.map(searchDun => item.duns.some(dun => dun === searchDun)).filter(el => el === true);

        if(filterDuns.length === arrayDuns.length) {
          setPositivacoes(prev => [...prev, item])
        }
      }
    })
  }

  return (
    <div className="grid-pattern">
      <section className="container">
        <input type="file" name="" id="inputFile" onChange={handleFile} />
        <div className="form">
          <label htmlFor="inputVend">Vendedor</label>
          <input type="text" name="" id="inputVend" value={vendedor} onChange={e => setVendedor(e.target.value)} />
          <label htmlFor="inputDuns">Duns</label>
          <input type="text" name="" id="inputDuns" value={duns} onChange={e => setDuns(e.target.value)} />
          <button onClick={handleDuns}>Enviar</button>
        </div>
        {positivacoes.length > 0 && 
          <div className="clientesPositivados">
            <h2>Vendedor: {positivacoes[0].codvendedor}</h2>
            <p>Positivações: {positivacoes.length}</p>
            <p>Clientes:</p>
            <pre id="positivacoes">{positivacoes.map(client => (
              <p key={client.razaoSocial}>{client.razaoSocial}</p>
            ))}</pre>
          </div>
        }
      </section>
    </div>
  )
}