import React, { useState, useEffect } from 'react';
import Cabecalho from '../../components/Layout/Interno/Cabecalho';
import Tabela from '../../components/Tabela/Tabela';
import { generica } from '../../utils/api';

const dadosCabecalho = {
  titulo: "Métricas",
  migalha:[
    {nome:'Mapa', link:'/'},
    {nome:'Métricas', link:'/metricas'},
  ]
}

const dadosTabela = {
    cabecalho:[
      {nome:"Nome"},
      {nome:"Descrição"}
    ],
    registros: [
      // { nome: 'Produto 1', detalhes: 'Descrição do Produto 1' },
      // { nome: 'Produto 2', detalhes: 'Descrição do Produto 2' },
      // { nome: 'Produto 3', detalhes: 'Descrição do Produto 3' }
    ],
    acoes:[
      {tipo:"link", nome:"Editar",uri:"metrica/edit/",passarID:true, metodo:'get', title: "Editar métrica", posAcao:null},
      {tipo:"acao", metodo:'delete',uri:'/metrica/',passarID:true, params:{},data:{}, nome:"Deletar", title: "Deletar métrica",posAcao:"atualizar"}
    ],
    externo:[
      {tipo:"link", cor:"azul", nome:"Adicionar", uri:"metrica/edit/0", passarID:false, title: "Adicionar nova métrica"}
    ],
    pesquisar:{
      link:"metrica/search"
    },
    request:{
      listar:{
        metodo:'get', uri:'/metrica', params:{size: 25}, data:{}
      }
    },
    retorno:{}
};

export default function IndexPage() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      let body = {
        metodo:'get',
        uri:'/metrica',
        params:{size: 25},
        data:{}
     }
      const data = await generica(body);
      // dadosTabela.registros = data.content;
      dadosTabela.retorno = data.data;
      setRegistros(data);
    };
    fetchRegistros();
  }, []);

  return (
    <main className="p-8 flex flex-wrap mx-auto justify-center">
      <div className='w-full md:w-4/5 2xl:w-1/2'>
        <Cabecalho dados={dadosCabecalho}/>
        <Tabela dados={dadosTabela} />
      </div>
    </main>
  );
}
