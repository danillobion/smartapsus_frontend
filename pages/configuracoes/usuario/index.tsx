import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import Tabela from '@/components/Tabela/Estrutura';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const estrutura = {

  uri:"usuario", //caminho base

  cabecalho:{ //cabecalho da pagina
    titulo:"Usuários",
    migalha:[
      {nome:'Início', link:'/'},
      {nome:'Configurações', link:null},
      {nome:'Usuário', link:null},
    ]
  },

  tabela:{
    configuracoes:{
      pesquisar:true,//campo pesquisar nas colunas (booleano)
      cabecalho:true,//cabecalho da tabela (booleano)
      rodape:true,//rodape da tabela (booleano)
    },
    botoes:[ //links
      {nome: 'Adicionar', chave:'adicionar', bloqueado:false, oculto:false} //nome(string),chave(string),bloqueado(booleano)
    ],
    colunas:[ //colunas da tabela
      {nome:"nome",chave:"nome",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"email",chave:"email",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"cargo",chave:"cargo",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"função",chave:"funcao",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"área de estudo",chave:"areaEstudo",tipo:"texto",selectOptions:null,sort:true,pesquisar:true},
      {nome:"ativo",chave:"ativo",tipo:"booleano",selectOptions:[{chave:true, valor:"Ativo"},{chave:false, valor:"Inativo"}],sort:true,pesquisar:true},
      {nome:"ações",chave:"acoes",tipo:"button",selectOptions:null,sort:false,pesquisar:false},
    ],
    acoes_dropdown:[ //botão de acoes de cada registro
    {nome: 'Editar', chave:'editar'}, //nome(string),chave(string),bloqueado(booleano)
    {nome: 'Deletar', chave:'deletar'},
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
        alert('adicionar');
        break;
      case 'editar':
        editarRegistro(valor);
        break;
      case 'deletar':
        deletarRegistro(valor);
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
    // Função que redireciona para a tela editar
    const editarRegistro = (item) => {
      router.push('/edit/'+item.id);
    };
    // Função que deleta um registro
    const deletarRegistro = async (item: Item) => {
      const confirmacao = await Swal.fire({
        title: "Você deseja deletar o usuário " + item.nome + "?",
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
            uri: '/'+estrutura.uri+'/'+item.id,
            params: {},
            data: {}
          };
    
          const response = await generica(body);
    
          if (response.data.errors) {
            toast("Erro. Tente novamente!", { position: "bottom-left" });
          } else if (response.data.error) {
            toast(response.data.error.message, { position: "bottom-left" });
          } else {
            pesquisarRegistro();
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

