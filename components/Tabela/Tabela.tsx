import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { generica } from '../../utils/api';

const Tabela = ({ dados }) => {
  // if(dados.retorno.content != undefined){
  //   console.log("COMPONENTE: TABELA - ", dados.retorno);
  // }
  const router = useRouter();
  

  const irParaPagina = (caminhoDaPagina) => {
    router.push(caminhoDaPagina);
  };

  const botaoAcao = async (id,dados) => {
    if(dados.tipo == 'link'){
      let uri = dados.passarID ? dados.uri+id : dados.uri;
      router.push(uri);
    }else if(dados.tipo == 'acao'){
      let body = {
        metodo:dados.metodo,
        uri:dados.passarID ? dados.uri+id : dados.uri,
        params:dados.params,
        data:dados.data,
     }
     const data = await generica(body);
     console.log(data);
     router.reload();
    }
  }

  const registrosTabela = (dados) => {
    let body = [];
    Object.keys(dados).forEach(item => {
      if(item != "id"){
        body.push(dados[item]);
      }
    });
    return body;
  };

  return (
    <div className="overflow-x-auto">
      {/* cabecalho */}
      <div className='flex justify-between'>
        {/* pesquisar */}
        <form className='pb-3'>   
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisar" required />
          </div>
        </form>
        {/* botao externo*/}
        <div className='flex justify-end'>
          {dados.externo.map((item, index) => (
            <button key={index}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-2 mb-2 focus:outline-none"
                    onClick={() => irParaPagina(item.uri)}>
              {item.nome}
            </button>
          ))}
        </div>
        {/* x botao externo x */}
      </div>
      {/*X cabecalho X*/}
      {/* tabela */}
      <table className={dados.retorno.content != undefined && dados.retorno.empty == false ? "w-full text-sm text-left rtl:text-right text-gray-500" : "hidden"} >
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {dados.cabecalho.map((item, index) => (
              <th scope="col" 
                  className="px-6 py-3" 
                  key={index}>
                    {item.nome}
              </th>
            ))}
            <th scope="col" className={dados.acoes ? 'px-6 py-3' : 'hidden' }>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.retorno.content != undefined && dados.retorno.empty == false && dados.retorno.content.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {registrosTabela(item).map((itemColuna, indexColuna) => (
                  <td key={indexColuna} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{itemColuna}</td>
              ))}
              
              {/* acoes - botao */}
              <td  className={dados.acoes ? 'px-6 py-4' : 'hidden' }>
                <div className='flex'>
                  {dados.acoes.map((itemAcao,indexAcao) => (
                    <button className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none"
                            key={indexAcao}  
                            onClick={() => botaoAcao(item.id, itemAcao)}>
                            {itemAcao.nome}
                    </button>
                  ))}
                </div>
              </td>
              {/*X acoes - botao X*/}
            </tr>
          ))}
          <tr className={dados.retorno.content != undefined && dados.retorno.empty == true ? "" : "hidden"}>
            <td>Nenhum registro encontrado.</td>
          </tr>
        </tbody>
      </table>
      {/*X tabela X*/}
      {/* paginacao */}
      <div className='text-center'>
        <h6>paginação</h6>
      </div>
    </div>
  );
};

export default Tabela;
