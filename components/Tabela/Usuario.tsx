import React, { useState, useEffect, useRef } from 'react';

const Tabela = ({ dados, IrParaTelaAdicionarRegistro, IrParaTelaEditarRegistro, deletarRegistro }) => {
  const [dropdownAberto, setDropdownAberto] = useState({});
  const dropdownRef = useRef(null); // Ref para o elemento do dropdown

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
      <div className='mt-0 mb-2 flex justify-between'>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <button className="shadow-sm mr-2 bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-md"
                onClick={() => IrParaTelaAdicionarRegistro()}>
          Adicionar
        </button>
      </div>
      {/* x cabecalho x */}
      {/* tabela */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área de estudo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de cadastro</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dados.content.length > 0 ? (
            dados.content.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-nowrap">{item.nome}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.cargo}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.ativo}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.funcao}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.areaEstudo}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.tipoUsuario}</td>
                <td className="px-6 py-2 whitespace-nowrap">{item.dataCadastro}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium relative">
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
      {/* x tabela x */}
    </div>
  );
};

export default Tabela;
