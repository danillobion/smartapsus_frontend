
import React, { useState, useEffect, useRef } from 'react';

const Tabela = ({ dados, carregarRegistros }) => {

  const [body_params, setBodyParams] = useState({
    size: 25,
    page: 0,
    acao: null,
    entidade: null,
    usuario: null,
    ip: null,
    dataHora: null,
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

  const alterarData = (dataAtual = null) => {

    if(dataAtual == null){
      return 0
    }
    const data = new Date(dataAtual);
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    
    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    return dataFormatada;
  }

  return (
    <div>
      {/* tabela */}
      <div className='border border-gray-300 rounded-md pb-1 shadow-sm min-w-min'>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>Ação</h6>
                  <input
                      type="text"
                      id="nome"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('acao', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>Entidade</h6>
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('entidade', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>Usuário</h6>
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('usuario.nome', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>IP</h6>
                  <input
                      type="text"
                      id="detalhes"
                      className="mt-1 p-2 w-full border rounded"
                      onChange={(e) => paramsColuna('ip', e.target.value)}
                  />
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='w-full'>
                  <h6>Data e hora</h6>
                  <input
                      type="text"
                      id="detalhes"
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
                  <td className="px-3 py-2 whitespace-nowrap">{item.acao}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.entidade}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.usuario.nome}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.ip}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{alterarData(item.dataHora)}</td>
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

