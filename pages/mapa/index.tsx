import React, { useEffect, useState, useRef } from 'react';

import dynamic from 'next/dynamic';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';

const DynamicMap = dynamic(() => import('../../components/Mapa/Mapa'), {
  ssr: false 
});

const IndexPage: React.FC = () => {

  const mapRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [dadosAreas, setDadosAreas] = useState();
  const [dadosPontos, setDadosPontos] = useState();

  const [markers, setMarkers] = useState([
    { lat: -8.88202, lng: -36.50216, legenda: "Garanhuns"},
    { lat: -8.0700996, lng: -34.8824260, legenda: "São José" }
  ]);

  const chamarFuncao = (nomeFuncao="",valor=null) => {
    switch (nomeFuncao) {
        case 'abrirFecharModal':
        abrirFecharModal()
        break;
        case 'regioes':
        limparRegioesEEstados();
        exibirRegioes();
        break;
        case 'estados':
        limparRegioesEEstados();
        exibirEstados();
        break;
        case 'unidades':
          if(valor){
            limparPontos();
            exibirPontos();
          }else{
            limparPontos();
          }
        break;
        case 'limparAreas':
        limparRegioesEEstados();
        break;
        default:
        break;
    }
  }
  // Função responsavel por remover as áreas no mapa
  const limparRegioesEEstados = () => {
      const map = mapRef.current;
      if (dadosAreas) {
          dadosAreas.forEach(polygon => {
              map?.removeLayer(polygon);
          });
          setDadosAreas();
      }
  }
  // Função responsavel por remover os pontos no mapa
  const limparPontos = () => {
      const map = mapRef.current;
      if (dadosPontos) {
        dadosPontos.forEach(polygon => {
              map?.removeLayer(polygon);
          });
          setDadosPontos();
      }
  }

  // Função para carregar os dados da região
  const exibirRegioes = async () => {
      try {
      let body = {
          metodo: 'get',
          uri: '/regiao',
          params: {size: 50},
          data: {}
      }
      const response = await generica(body);
      
      //tratamento dos erros
      if(response.data.errors != undefined){
          toast("Erro. Tente novamente!",{position: "bottom-left"});
      }else if(response.data.error != undefined){
          toast(response.data.error.message,{position: "bottom-left"});
      }else{
          setDadosAreas(response.data.content);
      }
      } catch (error) {
      console.error('Erro ao carregar registros:', error);
      }
  };
  // Função para carregar os dados dos estados
  const exibirEstados = async () => {
      try {
      let body = {
          metodo: 'get',
          uri: '/estado',
          params: {size: 50},
          data: {}
      }
      const response = await generica(body);
      //tratamento dos erros
      if(response.data.errors != undefined){
          toast("Erro. Tente novamente!",{position: "bottom-left"});
      }else if(response.data.error != undefined){
          toast(response.data.error.message,{position: "bottom-left"});
      }else{
          setDadosAreas(response.data.content);
      }
      } catch (error) {
      console.error('Erro ao carregar registros:', error);
      }
  };
  // Função para carregar os pontos no mapa (Unidades de saúde)
  const exibirPontos = async () => {

    let exemplo = {
      "content": [
        {
          "id": 1,
          "cnes": "1111",
          "nome": "unidade 1",
          "grauDependencia": "1",
          "tipoUnidade": "tipo teste",
          "turnoAtendimento": "manhã",
          "dataCriacao": null,
          "gerenciaAtencaoBasica": "1",
          "endereco": {
            "id": 1,
            "logradouro": "rua x",
            "numero": "123",
            "bairro": "bairro x",
            "complemento": "apt x",
            "referencia": "referencia x",
            "cep": "54430010",
            "localizacao": [-8.8881, -36.4908],
            "municipio": "garanhuns",
            "uf": "PE"
          },
          "cidade": null
        },
        {
          "id": 1,
          "cnes": "2222",
          "nome": "unidade 2",
          "grauDependencia": "1",
          "tipoUnidade": "tipo teste",
          "turnoAtendimento": "manhã",
          "dataCriacao": null,
          "gerenciaAtencaoBasica": "1",
          "endereco": {
            "id": 1,
            "logradouro": "rua x",
            "numero": "123",
            "bairro": "bairro x",
            "complemento": "apt x",
            "referencia": "referencia x",
            "cep": "54430010",
            "localizacao": [-8.0700996, -34.8824260],
            "municipio": "garanhuns",
            "uf": "PE"
          },
          "cidade": null
        }
      ],
    }
    setDadosPontos(exemplo.content);
  };

  // funcao responsavel por abrir/fechar modal
  const abrirFecharModal = () => {
    if(showModal){
        setShowModal(false);
    }else{
        setShowModal(true);
    }
  };

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <DynamicMap markers={markers}
                  chamarFuncao={chamarFuncao}
                  showModal={showModal}
                  dadosAreas={dadosAreas}
                  dadosPontos={dadosPontos}

       />
    </div>
  );
}

export default IndexPage;
