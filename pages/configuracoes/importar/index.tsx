import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import Tabela from '@/components/Tabela/Estrutura';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const estrutura = {

  uri:"tarefaImportacao", //caminho base

  cabecalho:{ //cabecalho da pagina
    titulo:"Importar Arquivo",
    migalha:[
      {nome:'Início', link:'/'},
      {nome:'Configurações', link:null},
      {nome:'Importar', link:null},
    ]
  },

  tabela:{
    configuracoes:{
      pesquisar:true,//campo pesquisar nas colunas (booleano)
      cabecalho:true,//cabecalho da tabela (booleano)
      rodape:true,//rodape da tabela (booleano)
    },
    botoes:[ //links
    {nome: 'Adicionar', chave:'adicionar', bloqueado:false}
    ],
    colunas:[ //colunas da tabela
      {nome:"formato",chave:"formatoArquivo",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"arquivo",chave:"parametros|pathArquivo",tipo:"json",selectOptions:null,sort:false,pesquisar:true},
      {nome:"entidade",chave:"parametros|entidade",tipo:"json",selectOptions:null,sort:false,pesquisar:true},
      {nome:"data agendada",chave:"dataHoraAgendamento",tipo:"texto",selectOptions:null,sort:true,pesquisar:false},
      {nome:"data conclusao",chave:"dataHoraConclusao",tipo:"texto",selectOptions:null,sort:true,pesquisar:false},
      {nome:"status",chave:"codigoRetorno",tipo:"texto",selectOptions:[{chave:0,valor:"Pendente"},{chave:1,valor:"Finalizado"},{chave:-1,valor:"Erro"}],sort:true,pesquisar:true},
    ],
    acoes_dropdown:[ //botão de acoes de cada registro
    ]
  }

}

const Lista = () => {
  const router = useRouter();
  const [dados, setDados] = useState({ content: [] });

  const chamarFuncao = (nomeFuncao="",valor=null) => {
    switch (nomeFuncao) {
      case 'pesquisar':
        pesquisarRegistro(valor);
        break;
      case 'adicionar':
        adicionarRegistro();
        break;
      default:
        break;
    }
  }
  // Função para carregar os dados
  const pesquisarRegistro = async (params=null) => {
    try {
      let body = {
        metodo: 'get',
        uri: '/'+estrutura.uri,
        params: params != null ? params : { size: 25, page:0},
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

  const adicionarRegistro = () => {
    router.push('/configuracoes/importar/cadastro');
  };

  useEffect(() => {
    chamarFuncao('pesquisar',null);
  }, []);

  return (
      <main className="flex flex-wrap mx-auto justify-center">
        <div className='w-full md:w-11/12 2xl:w-1/2 p-2 pt-7 md:pt-8 md:pb-8'>
          <Cabecalho dados={estrutura.cabecalho}/>
          <Tabela 
              dados={dados}
              estrutura={estrutura}
              chamarFuncao={chamarFuncao}
          />
        </div>
      </main>
  );
};

export default Lista;

