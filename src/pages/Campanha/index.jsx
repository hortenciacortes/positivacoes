import { useEffect, useState } from "react";
import { getData } from "../../server";
import { dbCategory } from "../../server/dbCategory";
import { dbProducts } from "../../server/dbProducts";

import './styles.scss';

export function Campanha() {
  const [vendedor, setVendedor] = useState('64');
  const [eansSelects, setEansSelects] = useState([]);
  const [arrayVendaEPP, setArrayVendaEPP] = useState(null);
  const [positivacoes, setPositivacoes] = useState([]);
  const [file, setFile] = useState(null);
  const [categorysSelects, setCategorysSelects] = useState([]);

  const dataCategory = dbCategory();
  
  useEffect(() => {
    file && setArrayVendaEPP(getData(file));
  }, [file]);
  
  useEffect(() => {
    categorysSelects.length > 0 && getEans()
    
    function getEans() {
      const dbProdcuts = dbProducts();
      const eansCategorys = categorysSelects.map(category => dbProdcuts.filter(el => el.categoria === category).map(el => el.ean));
      setEansSelects(prev => [...prev, ...eansCategorys]);
    }
  }, [categorysSelects]);


  function handleFile(e) {
    var file = new FileReader();

    file.onload = (e) => {
      setFile(e.target.result)
    }

    file.readAsText(e.target.files[0]);
  }

  function handleEans() {
    eansSelects.forEach(item => {
      item.forEach(ean => {
        if(ean.length !== 13) {
          alert('Ean inválido')
          return false
        }
      });
    });

    setPositivacoes([]);
    handlePositivacoes();
  }
  
  function handlePositivacoes() {
    if(eansSelects.length !== 0) {      
      arrayVendaEPP.forEach(venda => {
        if(venda.codvendedor === vendedor){
          const filterEans = eansSelects.map(groupEan => groupEan).map(searchEan => searchEan.some(se => venda.eans.some(ean => ean === se))).filter(el => el === true);
  
          if(filterEans.length === eansSelects.length) {
            setPositivacoes(prev => [...prev, venda]);
          }
        }
      });
    } else {
      arrayVendaEPP.forEach(venda => {
        if(venda.codvendedor === vendedor){
          setPositivacoes(prev => [...prev, venda]);
        }
      });
    }
  }

  return (
    <div className="grid-pattern">
      <section className="container">
        <input type="file" name="" id="inputFile" onChange={handleFile} />
        <div className="form">
          <label htmlFor="inputVend">Vendedor</label>
          <input type="text" name="" id="inputVend" value={vendedor} onChange={e => setVendedor(e.target.value)} />
          <label htmlFor="inputEans">Eans</label>
          <input type="text" name="" id="inputEans" value={eansSelects} onChange={e => setEansSelects([e.target.value.split(',')])} />
          
          <select name="categorys" id="categorys" onChange={e => setCategorysSelects(prev => [...prev, e.target.value])}>
            {dataCategory.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="showCategorys">
            {categorysSelects.length > 0 && categorysSelects.map(category => (
              <span key={category}>{category}</span>
            ))}
            <button onClick={e => {
              setCategorysSelects([]);
              setEansSelects([])
            }}>
              Limpar
            </button>
          </div>
          <button onClick={handleEans}>Enviar</button>
        </div>
        {positivacoes.length > 0 && 
          <div className="clientesPositivados">
            <h2>Vendedor: {positivacoes[0].codvendedor}</h2>
            <p>Positivações: {positivacoes.length}</p>
            <p>Clientes:</p>
            <pre id="positivacoes">{positivacoes.map(client => (
              <p key={client.cnpjcliente}>{client.cnpjcliente}</p>
            ))}</pre>
          </div>
        }
      </section>
    </div>
  )
}