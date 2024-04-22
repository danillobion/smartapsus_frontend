import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '../../components/Layout/Interno/Cabecalho';
import TabelaMetrica from '../../components/Tabela/Metrica';
import { generica } from '../../utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface Item {
  id: string;
}

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
  const carregarRegistros = async (params = null) => {
    try {
      let body = {
        metodo: 'get',
        uri:'/metrica',
        params: params != null ? params : { size: 25, page:0, nome:null, detalhes:null },
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
  const IrParaTelaEditarRegistro = (item: Item) => {
    router.push('/metrica/edit/'+item.id);
  };

  // Função que deleta um registro
  const deletarRegistro = async (item: Item) => {
    const confirmacao = await Swal.fire({
      title: "Você deseja deletar essa métrica?",
      text: "Essa ação não poderá ser desfeita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero deletar!",
      cancelButtonText: "Cancelar"
    });
  
    if (confirmacao.isConfirmed) {
      try {
        const body = {
          metodo: 'delete',
          uri: '/metrica/'+item.id,
          params: {},
          data: {}
        };
  
        const response = await generica(body);
  
        if (response.data.errors) {
          toast("Erro. Tente novamente!", { position: "bottom-left" });
        } else if (response.data.error) {
          toast(response.data.error.message, { position: "bottom-left" });
        } else {
          carregarRegistros();
          Swal.fire({
            title: "Métrica deletada com sucesso",
            icon: "success"
          });
        }
      } catch (error) {
        console.error('Erro ao deletar registro:', error);
        toast("Erro ao deletar registro. Tente novamente!", { position: "bottom-left" });
      }
    }
  };
  

  return (
      <main className="flex flex-wrap mx-auto justify-center">
        <div className='w-full md:w-11/12 2xl:w-1/2 p-2 pt-7 md:pt-8 md:pb-8'>
          <Cabecalho dados={dadosCabecalho}/>
          <TabelaMetrica dados={dados} 
                  carregarRegistros={carregarRegistros} 
                  IrParaTelaAdicionarRegistro={IrParaTelaAdicionarRegistro} 
                  IrParaTelaEditarRegistro={IrParaTelaEditarRegistro} 
                  deletarRegistro={deletarRegistro} />
        </div>
      </main>
  );
};

export default Lista;
