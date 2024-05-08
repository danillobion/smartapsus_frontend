import React, { useState, useEffect, useRef } from 'react';

const Cadastro = ({ estrutura = null, dadosPreenchidos = null, setDadosPreenchidos = null, chamarFuncao = null }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => { 
      const campo = estrutura?.cadastro?.campos.flat().find(campo => campo.chave === key && campo.tipo === 'select');
      if(campo){
        data[key] = {id: value}; //se for um select o retorno deve ser desse jeito -> chave: {id:value}
      }else{
        data[key] = value; //qualquer outro campo -> chave: valor
      }
    });
    
    chamarFuncao('salvar', data);
  };

  const alterarInput = (event) => {
    const { name, value } = event.target;
    setDadosPreenchidos((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const alterarSelect = (event) => {
    const { name, value } = event.target;
    setDadosPreenchidos((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const alterarCheckbox = (event) => {
    const { name, checked } = event.target;
    setDadosPreenchidos((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const alterarDate = (event) => {
    const { name, checked } = event.target;
    setDadosPreenchidos((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  return (
    <div>
      <form className="w-full pt-2 pb-2" onSubmit={handleSubmit}>
        {/* campo id oculto */}
        <input type="hidden" name="id" value={dadosPreenchidos?.id || ''} />
        {/* campo id oculto */}
        {estrutura != null && estrutura.cadastro.campos.map((elemento, index) => (
          <div className="md:flex" key={index}>
            {elemento.map((e, idx) => (
              <div className="flex-grow mb-2 me-2 w-full" key={idx}>
                {e.tipo === "text" && (
                  <>
                    <label htmlFor={e.chave} className="block text-gray-700 uppercase">{e.nome}
                      <samp className='text-red-500 ml-1' hidden={!e.obrigatorio}>*</samp>
                    </label>
                    <input
                      type="text"
                      id={e.chave}
                      name={e.chave}
                      className="mt-1 p-2 w-full border rounded-md"
                      placeholder={e.mensagem}
                      value={dadosPreenchidos && dadosPreenchidos[e.chave] || ''}
                      onChange={alterarInput}
                      disabled={e.bloqueado ? 'disabled' : null}
                      required={e.obrigatorio ? 'required' : ''}
                    />
                  </>
                )}
                {e.tipo === "number" && (
                  <>
                    <label htmlFor={e.chave} className="block text-gray-700 uppercase">{e.nome}
                      <samp className='text-red-500 ml-1' hidden={!e.obrigatorio}>*</samp>
                    </label>
                    <input
                      type="number"
                      id={e.chave}
                      name={e.chave}
                      className="mt-1 p-2 w-full border rounded-md"
                      placeholder={e.mensagem}
                      value={dadosPreenchidos && dadosPreenchidos[e.chave] || ''}
                      onChange={alterarInput}
                      disabled={e.bloqueado ? 'disabled' : null}
                      required={e.obrigatorio ? 'required' : ''}
                    />
                  </>
                )}
                {e.tipo === "select" && (
                  <>
                    <label htmlFor={e.chave} className="block text-gray-700 uppercase">{e.nome}
                      <samp className='text-red-500 ml-1' hidden={!e.obrigatorio}>*</samp>
                    </label>
                    <select
                      id={e.chave}
                      name={e.chave}
                      className="mt-1 p-2 w-full border rounded-md bg-white"
                      
                      onChange={alterarSelect}
                      disabled={e.bloqueado ? 'disabled' : null}
                      required={e.obrigatorio ? 'required' : ''}
                    >
                      {e.selectOptions && e.selectOptions.map((option, optionIdx) => (
                        <option key={optionIdx} selected={dadosPreenchidos && dadosPreenchidos[e.chave]?.id == option.chave ? 'selected' : ''} value={option.chave}>{option.valor}</option>
                      ))}
                    </select>
                  </>
                )}
                {e.tipo === "boolean" && (
                  <>
                    <label htmlFor={e.chave} className="block text-gray-700 uppercase">{e.nome}
                      <samp className='text-red-500 ml-1' hidden={!e.obrigatorio}>*</samp>
                    </label>
                    <input
                      type="checkbox"
                      id={e.chave}
                      name={e.chave}
                      className="mt-1 p-2 w-full border rounded-md"
                      checked={dadosPreenchidos && dadosPreenchidos[e.chave] || false}
                      onChange={alterarDate}
                      disabled={e.bloqueado ? 'disabled' : null}
                      required={e.obrigatorio ? 'required' : ''}
                    />
                  </>
                )}
                {e.tipo === "date" && (
                  <>
                    <label htmlFor={e.chave} className="block text-gray-700 uppercase">{e.nome}
                      <samp className='text-red-500 ml-1' hidden={!e.obrigatorio}>*</samp>
                    </label>
                    <input
                      type="date"
                      id={e.chave}
                      name={e.chave}
                      className="mt-1 p-2 w-full border rounded-md"
                      checked={dadosPreenchidos && dadosPreenchidos[e.chave] || false}
                      onChange={alterarCheckbox}
                      disabled={e.bloqueado ? 'disabled' : null}
                      required={e.obrigatorio ? 'required' : ''}
                    />
                  </>
                )}
                {e.tipo !== "text" && e.tipo !== "select" && e.tipo !== "boolean" && (
                  <div className="mt-1 p-2 w-full"></div> // Renderiza uma div vazia se o tipo de campo não for reconhecido
                )}
              </div>
            ))}
          </div>
        ))}
        <div className='flex justify-end'>
          {estrutura != null && estrutura.cadastro.acoes.map((botao, index) => (
            <button 
              key={index}
              type={botao.tipo === 'submit' ? 'submit' : 'button'}
              className='bg-gray-100 me-2 border rounded px-2 py-1'
              onClick={botao.tipo !== 'submit' ? () => chamarFuncao(botao.chave, botao) : null} // Adiciona onClick apenas se o tipo não for submit
            >
              {botao.nome}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
