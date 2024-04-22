
import React, { useState, useEffect, useRef } from 'react';

const Tabela = ({ dados=null, carregarRegistros=null, IrParaTelaAdicionarRegistro=null, IrParaTelaEditarRegistro=null, deletarRegistro=null }) => {
  const [dropdownAberto, setDropdownAberto] = useState({});
  const dropdownRef = useRef(null); // Ref para o elemento do dropdown

  const [body_params, setBodyParams] = useState({
    size: 25,
  }); 

  const paramsColuna = (chave = null, valor = null) => {
    if(chave != null && valor != null){
      const updatedBodyParams = {
        ...body_params,
        [chave]: valor
      };
      setBodyParams(updatedBodyParams);
      carregarRegistros(updatedBodyParams);
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

  useEffect(() => {
    document.addEventListener('mousedown', dropdownCliqueiFora);
    return () => {
      document.removeEventListener('mousedown', dropdownCliqueiFora);
    };
  }, []);

  return (
    <div>
      {/* cabecalho */}
      <div className='mt-0 mb-2 p-0 flex justify-end'>
        <button className="shadow-sm bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-3 rounded-md"
                onClick={() => IrParaTelaAdicionarRegistro()}>
          Adicionar
        </button>
      </div>
      {/* x cabecalho x */}
      {/* tabela */}
      <div className='border border-gray-300 rounded-md pb-1 shadow-sm min-w-min'>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                <h6>
                  Nome 
                  <button onClick={(e) => paramsColuna('sort', body_params.sort != null && body_params.sort.split(',')[1] == 'asc' ? 'nome,desc' : 'nome,asc' )}>
                    {body_params.sort != null && body_params.sort.split(',')[0] == 'nome' && body_params.sort.split(',')[1] == 'asc' ? '▲' : '▼'}
                  </button>
                </h6>                  
                <input
                      type="text"
                      id="nome"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('nome', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>
                    CPF/CNPJ 
                    <button onClick={(e) => paramsColuna('sort', body_params.sort != null && body_params.sort.split(',')[1] == 'asc' ? 'cpfCnpj,desc' : 'cpfCnpj,asc' )}>
                      {body_params.sort != null && body_params.sort.split(',')[0] == 'cpfCnpj' && body_params.sort.split(',')[1] == 'asc' ? '▲' : '▼'}
                    </button>
                  </h6>  
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('cpfCnpj', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>
                    Código conselho de classe
                    <button onClick={(e) => paramsColuna('sort', body_params.sort != null && body_params.sort.split(',')[1] == 'asc' ? 'codigoConselhoClasse,desc' : 'codigoConselhoClasse,asc' )}>
                      {body_params.sort != null && body_params.sort.split(',')[0] == 'codigoConselhoClasse' && body_params.sort.split(',')[1] == 'asc' ? '▲' : '▼'}
                    </button>
                  </h6>  
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('codigoConselhoClasse', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>
                    Pessoa Física ou Jurídica
                    <button onClick={(e) => paramsColuna('sort', body_params.sort != null && body_params.sort.split(',')[1] == 'asc' ? 'pessoaFisicaJuridica,desc' : 'pessoaFisicaJuridica,asc' )}>
                      {body_params.sort != null && body_params.sort.split(',')[0] == 'pessoaFisicaJuridica' && body_params.sort.split(',')[1] == 'asc' ? '▲' : '▼'}
                    </button>
                  </h6> 
                  <select className='mt-1 p-2 w-full border rounded bg-white' onChange={(e) => paramsColuna('pessoaFisicaJuridica', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="0">Pessoa Física</option>
                    <option value="1">Pessoa Jurídica</option>
                  </select>
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>
                    Registro conselho de classe
                    <button onClick={(e) => paramsColuna('sort', body_params.sort != null && body_params.sort.split(',')[1] == 'asc' ? 'registroConselhoClasse,desc' : 'registroConselhoClasse,asc' )}>
                      {body_params.sort != null && body_params.sort.split(',')[0] == 'registroConselhoClasse' && body_params.sort.split(',')[1] == 'asc' ? '▲' : '▼'}
                    </button>
                  </h6>  
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('registroConselhoClasse', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>Ações</h6>
                  <input
                      type="text"
                      id="nome"
                      className="mt-1 p-2 w-full border rounded"
                      disabled
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dados.content.length > 0 ? (
              dados.content.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-3 py-2 whitespace-nowrap">{item.nome}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.cpfCnpj}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.codigoConselhoClasse}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.pessoaFisicaJuridica == 0 ? 'Pessoa Física' : 'Pessoa Jurídica'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.registroConselhoClasse}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium relative">
                    <button onClick={() => dropdownAbrirFechar(item.id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <p className="text-lg font-medium text-gray-900 dark:text-gray">...</p>
                    </button>
                    {dropdownAberto[item.id] && (
                      <div ref={dropdownRef} className="absolute z-10 mt-2 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" onClick={() => IrParaTelaEditarRegistro(item)}>Editar</button>
                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem" onClick={() => deletarRegistro(item)}>Deletar</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <h6 className='text-gray-600'>Nenhum registro encontrado.</h6>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='p-3 flex justify-end border border-white border-t-gray-100'>
          <div className='flex justify-between w-full'>
            <div>
              <h6 className='text-gray-400 mt-3 text-sm'>Nº total de registros: {dados.totalElements}</h6>
            </div>
            <div className='flex'>
              <select name="" id="" className='mr-2 bg-gray-50 rounded' onChange={(e)=> paramsColuna('size', e.target.value)}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
              </select>
              <button className="block px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 text-left rounded hover:shadow-sm mr-1" 
                      role="menuitem"
                      onClick={() => paramsColuna('page', dados.number-1)}
                      disabled={dados.first}>Voltar</button>
              <h6 className='text-sm text-gray-500 mt-2 ml-2 mr-2'> Página {dados.number+1} de {dados.totalPages}</h6>
              <button className="block px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 text-left rounded hover:shadow-sm ml-1" 
                      role="menuitem"
                      onClick={() => paramsColuna('page', dados.number+1)}
                      disabled={dados.last}>Próximo</button>
            </div>
          </div>

        </div>
      </div>
      {/* x tabela x */}
    </div>
  );
};

export default Tabela;

