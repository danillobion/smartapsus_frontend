import React, { useState, useEffect, useRef } from 'react';
import Pagination from './Itens/Paginacao';

const Tabela = ({ dados = null, estrutura = null,chamarFuncao = null }) => {
  const [dropdownAberto, setDropdownAberto] = useState({});
  const dropdownRef = useRef(null); // Ref para o elemento do dropdown

  const [bodyParams, setBodyParams] = useState({
    size: 25,
  }); 

  const paramsColuna = (chave = null, valor = null) => {
    if(chave != null && valor != null){
      const updatedBodyParams = {
        ...bodyParams,
        [chave]: valor
      };
      setBodyParams(updatedBodyParams);
      chamarFuncao('pesquisar',updatedBodyParams);
    }
  }

  // Função para alternar o estado do dropdown
  const dropdownAbrirFechar = (id) => {
    setDropdownAberto((prevState) => ({
      ...prevState,
      [id]: !prevState[id] 
    }));
  };

  const dropdownCliqueiFora = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownAberto({});
    }
  };

  const verificaTexto = (texto) => {
    const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})[+-]\d{2}:\d{2}$/;
    if(texto != null && iso8601Regex.test(texto)){

      let dataString = texto;
      let data = dataString.split("T")[0];
      let hora = dataString.split("T")[1].split(".")[0];

      let dia = data.split('-')[2];
      let mes = data.split('-')[1];
      let ano = data.split('-')[0];
      return dia+"/"+mes+"/"+ano+" "+hora;
    }else{
      return texto;
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', dropdownCliqueiFora);
    return () => {
      document.removeEventListener('mousedown', dropdownCliqueiFora);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className='flex justify-end overflow-x-auto mt-2.5'>
          {estrutura != null ? (estrutura.tabela.botoes.map((botao,index) =>(
            <button key={index} className='ml-2 mb-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 border rounded' disabled={botao.bloqueado} hidden={botao.oculto}
                    onClick={() => chamarFuncao(botao.chave, botao)}>{botao.nome}</button>
          ))):('')}
        </div>
        <div className="overflow-x-auto">
          <div className="p-1 min-w-full inline-block align-middle">
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* titulo das colunas */}
                <thead className="bg-gray-50" hidden={estrutura.tabela.configuracoes != undefined && (!estrutura.tabela.configuracoes.cabecalho )}>
                  <tr>
                    {estrutura != null ? (estrutura.tabela.colunas.map((item,index) => (
                      <td key={"menu_"+index} className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-8000 uppercase text-gray-600">
                        {item.nome}
                        <button
                          key={index}
                          className="ml-2"
                          onClick={() => paramsColuna('sort', bodyParams.sort != null && bodyParams.sort.split(',')[1] === 'asc' ? `${item.chave},desc` : `${item.chave},asc` )}
                          hidden={!item.sort}
                        >{bodyParams.sort != null && bodyParams.sort.split(',')[0] === item.chave && bodyParams.sort.split(',')[1] === 'asc' ? '▲' : '▼'}
                        </button>
                      </td>
                    ))) : ('')}
                  </tr>
                </thead>
                {/* pesquisar nas colunas */}
                <thead className="bg-gray-50" hidden={estrutura.tabela.configuracoes != undefined && (!estrutura.tabela.configuracoes.pesquisar )}>
                  <tr>
                    {estrutura != null ? (
                      estrutura.tabela.colunas.map((item, index) => (
                        <td key={"pesquisa_" + index} className='px-6 py-1'>
                          {item.tipo === 'texto' && (
                            <input
                              type="text"
                              id={'pesquisar_coluna_' + index}
                              className='pl-1 w-full border rounded text-sm'
                              placeholder='Pesquisar'
                              hidden={!item.pesquisar || item.pesquisar == undefined}
                              onChange={(e) => paramsColuna(item.chave, e.target.value)}
                            />
                          )}
                          {item.tipo === 'booleano' && (
                            <select
                              id={'pesquisar_coluna_' + index}
                              className='pl-1 w-full border rounded text-sm bg-white'
                              hidden={!item.pesquisar || item.pesquisar == undefined}
                              onChange={(e) => paramsColuna(item.chave, e.target.value)}
                            >
                              <option value="">Selecionar</option>
                              {item.selectOptions.map(option => (
                                <option key={option.chave} value={option.chave}>{option.valor}</option>
                              ))}
                            </select>
                          )}
                        </td>
                      ))
                    ) : ('')}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dados.content.length > 0 ? (
                    dados.content.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100">
                        {estrutura.tabela.colunas.map(({ chave,tipo,selectOptions }) => {
                          if (chave === 'acoes') {
                            return (
                              <td key="acoes" className="px-6 py-2 whitespace-nowrap relative">
                                <button onClick={() => dropdownAbrirFechar(item.id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                  <p className="text-lg font-medium text-gray-900 dark:text-gray">...</p>
                                </button>
                                {dropdownAberto[item.id] && (
                                  <div ref={dropdownRef} className="absolute z-10 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-0" style={{ marginLeft: '-70px', marginTop: '-90px' }} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {estrutura != null && estrutura.tabela.acoes_dropdown.map((acao, index_acao) => (
                                      <button key={index_acao} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" onClick={() => chamarFuncao(acao.chave, item)}>{acao.nome}</button>
                                    ))}
                                  </div>
                                )}
                              </td>
                            );
                          } else if (item[chave] !== undefined && tipo == "booleano") {
                            const selectOption = selectOptions.find(option => option.chave === item[chave]);
                            if (selectOption) {
                              return (
                                <td key={chave} className="px-6 py-2 whitespace-nowrap">{selectOption.valor}</td>
                              );
                            } else {
                              return null;
                            }
                          } else if (item[chave] !== undefined) {
                            return <td key={chave} className="px-6 py-2 whitespace-nowrap">{verificaTexto(item[chave])}</td>;
                          } else if (item[chave] === undefined){
                            const keys = chave.split('.');
                            let nestedValue = item;
                            for (let key of keys) {
                              if(nestedValue){
                                nestedValue = nestedValue[key];
                                if (nestedValue === undefined) break;
                              }
                            }
                            return <td key={chave} className="px-6 py-2 whitespace-nowrap">{verificaTexto(nestedValue)}</td>;
                          }
                          return null;
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={estrutura.tabela.colunas.length} className="text-center py-4">
                        <h6 className='text-gray-600'>Nenhum registro encontrado.</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      { estrutura.tabela.configuracoes.rodape ? (
        <Pagination dados={dados} paramsColuna={paramsColuna}/>
      ) : ('')}
    </div>
  );
};

export default Tabela;
