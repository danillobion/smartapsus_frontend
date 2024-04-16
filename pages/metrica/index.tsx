import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '../../components/Layout/Interno/Cabecalho';
import TabelaMetrica from '../../components/Tabela/TabelaMetrica';
import { generica } from '../../utils/api';
import { toast } from 'react-toastify';

const dadosCabecalho = {
  titulo: "Métricas",
  migalha:[
    {nome:'Mapa', link:'/'},
    {nome:'Métricas', link:null},
  ]
}

const Lista = () => {
  const router = useRouter();
  const [dados, setDados] = useState({ content: [] });

  useEffect(() => {
    carregarRegistros();
  }, []);

  // Função para carregar os dados
  const carregarRegistros = async () => {
    try {
      let body = {
        metodo: 'get',
        uri: '/metrica',
        params: { size: 25 },
        data: {}
      }
      const response = await generica(body);
      //tratamento dos erros
      if(response.data.errors != undefined){
        toast("Erro. Tente novamente!",{position: "bottom-left"});
      }else if(response.data.error != undefined){
        toast(response.data.error.message,{position: "bottom-left"});
      }else{
        setDados(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  // Função que redireciona para a tela adicionar registro
  const IrParaTelaAdicionarRegistro = () => {
    router.push('/metrica/edit/undefined');
  };
  // Função que redireciona para a tela editar registro
  const IrParaTelaEditarRegistro = (item) => {
    router.push('/metrica/edit/'+item.id);
  };

  // Função que deleta um registro
  const deletarRegistro = async (item) => {
    try {
      let body = {
        metodo: 'delete',
        uri: '/metrica/'+item.id,
        params: {},
        data: {}
      }
      const response = await generica(body);
      //tratamento dos erros
      if(response.data.errors != undefined){
        toast("Erro. Tente novamente!",{position: "bottom-left"});
      }else if(response.data.error != undefined){
        toast(response.data.error.message,{position: "bottom-left"});
      }else{
        toast("Registro deletado com sucesso!",{position: "bottom-left"});
        carregarRegistros();
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  return (
      <main className="p-8 flex flex-wrap mx-auto justify-center">
        <div className='w-full md:w-4/5 2xl:w-1/2'>
          <Cabecalho dados={dadosCabecalho}/>
          <TabelaMetrica dados={dados} 
                  IrParaTelaAdicionarRegistro={IrParaTelaAdicionarRegistro} 
                  IrParaTelaEditarRegistro={IrParaTelaEditarRegistro} 
                  deletarRegistro={deletarRegistro} />
        </div>
      </main>
  );
};

export default Lista;
