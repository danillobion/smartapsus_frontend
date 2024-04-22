// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Cabecalho from '@/components/Layout/Interno/Cabecalho'
// import TabelaLog from '@/components/Tabela/Log';
// import { generica } from '@/utils/api';
// import { toast } from 'react-toastify';

// const dadosCabecalho = {
//   titulo: "Log",
//   migalha:[
//     {nome:'Mapa', link:'/'},
//     {nome:'Configurações', link:null},
//     {nome:'Logs', link:null},
//   ]
// }

// const Log = () => {
//   const [dados, setDados] = useState({ content: [] });

//   // Função para carregar os dados
//   const carregarRegistros = async (params = null) => {
//     try {
//       let body = {
//         metodo: 'get',
//         uri: '/log',
//         params: params != null ? params : { size: 25, page:0, nome:null, detalhes:null },
//         data: {}
//       }
//       const response = await generica(body);
//       //tratamento dos erros
//       if(response.data.errors != undefined){
//         toast("Erro. Tente novamente!",{position: "bottom-left"});
//       }else if(response.data.error != undefined){
//         toast(response.data.error.message,{position: "bottom-left"});
//       }else{
//         setDados(response.data);
//       }
//     } catch (error) {
//       console.error('Erro ao carregar registros:', error);
//     }
//   };

//   useEffect(() => {
//     carregarRegistros();
//   }, []);

//   return (
//     <main className="flex flex-wrap mx-auto justify-center">
//         <div className='w-full md:w-11/12 2xl:w-1/2 p-2 pt-7 md:pt-8 md:pb-8'>
//         <Cabecalho dados={dadosCabecalho}/>
//         <TabelaLog dados={dados} carregarRegistros={carregarRegistros} />
//       </div>
//     </main>
//   );
// };

// export default Log;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import Tabela from '@/components/Tabela/Estrutura';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const estrutura = {

  uri:"log", //caminho base

  cabecalho:{ //cabecalho da pagina
    titulo:"Logs",
    migalha:[
      {nome:'Início', link:'/'},
      {nome:'Configurações', link:null},
      {nome:'Logs', link:null},
    ]
  },

  tabela:{
    configuracoes:{
      pesquisar:true,//campo pesquisar nas colunas (booleano)
      cabecalho:true,//cabecalho da tabela (booleano)
      rodape:true,//rodape da tabela (booleano)
    },
    botoes:[ //links
    ],
    colunas:[ //colunas da tabela
      {nome:"usuário",chave:"usuario.nome",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"acao",chave:"acao",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"entidade",chave:"entidade",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"ip",chave:"ip",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"data e hora",chave:"dataHora",tipo:"data",selectOptions:null,sort:true,pesquisar:false},
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

