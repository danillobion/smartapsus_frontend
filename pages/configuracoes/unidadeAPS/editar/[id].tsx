import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import Cadastro from '@/components/Cadastro/Estrutura';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Editar = () => {
  const router = useRouter();
  const [dadosPreenchidos, setDadosPreenchidos] = useState(null);
  const [estados, setEstados] = useState(null);
  const [cidades, setCidades] = useState(null);
  const [bairros, setBairros] = useState(null);

  const chamarFuncao = async (nomeFuncao = "", valor = null) => {
    switch (nomeFuncao) {
      case 'salvar':
        await salvarRegistro(valor); 
        break;
      case 'voltar':
        voltarRegistro(valor);
        break;
      case 'estados':
        estadosRegistro(valor);
        break;
      case 'cidades':
        cidadesRegistro(valor);
        break;
      case 'bairros':
        bairrosRegistro(valor);
        break;
      case 'editar':
        editarRegistro(valor);
        break;
      default:
        break;
    }
  }

  // Função que redireciona para a tela estado
  const voltarRegistro = (item) => {
    router.push('/configuracoes/'+estrutura.uri);
  };

  // Função que salvar um registro
  const salvarRegistro = async (item) => {
    const confirmacao = await Swal.fire({
      title: "Você deseja salvar a unidade?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero salvar!",
      cancelButtonText: "Cancelar"
    });

    if (confirmacao.isConfirmed) {
      try {
        const body = {
          metodo: 'post',
          uri: '/'+estrutura.uri,
          params: {},
          data: item
        };

        const response = await generica(body);

        if (response.data.errors) {
          estrutura.cadastro.campos.map(linha =>{
            linha.map(campo => {
              if(response.data.errors[campo.chave]){
                toast("Erro: "+response.data.errors[campo.chave], { position: "bottom-left" });
              }
            });
          })

        } else if (response.data.error) {
          toast(response.data.error.message, { position: "bottom-left" });
        } else {
          Swal.fire({
            title: "Unidade salva com sucesso",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
                chamarFuncao("voltar",null);
            }
        });
        }
      } catch (error) {
        console.error('Erro ao salvar registro:', error);
        toast("Erro ao salvar registro. Tente novamente!", { position: "bottom-left" });
      }
    }   
  };

  // Função retorna os estados
  const estadosRegistro = async (item) => {
    try {
      const body = {
        metodo: 'get',
        uri: '/estado',
        params: {},
        data: item
      };

      const response = await generica(body);
      
      if (response.data.errors) {
        estrutura.cadastro.campos.map(linha =>{
          linha.map(campo => {
            if(response.data.errors[campo.chave]){
              toast("Erro: "+response.data.errors[campo.chave], { position: "bottom-left" });
            }
          });
        })

      } else if (response.data.error) {
        toast(response.data.error.message, { position: "bottom-left" });
      } else {
        setEstados(response.data.content);
      }
    } catch (error) {
      console.error('Erro ao localizar registro:', error);
      toast("Erro ao localizar registro. Tente novamente!", { position: "bottom-left" });
    }
  };

  // Função retorna os cidades
  const cidadesRegistro = async (item) => {
    try {
      const body = {
        metodo: 'get',
        uri: '/cidade',
        params: {},
        data: item
      };

      const response = await generica(body);
      
      if (response.data.errors) {
        estrutura.cadastro.campos.map(linha =>{
          linha.map(campo => {
            if(response.data.errors[campo.chave]){
              toast("Erro: "+response.data.errors[campo.chave], { position: "bottom-left" });
            }
          });
        })

      } else if (response.data.error) {
        toast(response.data.error.message, { position: "bottom-left" });
      } else {
        setCidades(response.data.content);
      }
    } catch (error) {
      console.error('Erro ao localizar registro:', error);
      toast("Erro ao localizar registro. Tente novamente!", { position: "bottom-left" });
    }
  };

  // Função retorna os bairros
  const bairrosRegistro = async (item) => {
    try {
      const body = {
        metodo: 'get',
        uri: '/bairro',
        params: {},
        data: item
      };

      const response = await generica(body);
      
      if (response.data.errors) {
        estrutura.cadastro.campos.map(linha =>{
          linha.map(campo => {
            if(response.data.errors[campo.chave]){
              toast("Erro: "+response.data.errors[campo.chave], { position: "bottom-left" });
            }
          });
        })

      } else if (response.data.error) {
        toast(response.data.error.message, { position: "bottom-left" });
      } else {
        setBairros(response.data.content);
      }
    } catch (error) {
      console.error('Erro ao localizar registro:', error);
      toast("Erro ao localizar registro. Tente novamente!", { position: "bottom-left" });
    }
  };

  // Função que editar um registro
  const editarRegistro = async (item) => {
      try {
        const body = {
          metodo: 'get',
          uri: '/' + estrutura.uri + '/' + item,
          params: {},
          data: item
        };

        const response = await generica(body);

        if (response.data.errors) {
          estrutura.cadastro.campos.map(linha =>{
            linha.map(campo => {
              if(response.data.errors[campo.chave]){
                toast("Erro: "+response.data.errors[campo.chave], { position: "bottom-left" });
              }
            });
          })

        } else if (response.data.error) {
          toast(response.data.error.message, { position: "bottom-left" });
        } else {
          setDadosPreenchidos(response.data);
        }
      } catch (error) {
        console.error('Erro ao localizar registro:', error);
        toast("Erro ao localizar registro. Tente novamente!", { position: "bottom-left" });
      }
  };

  useEffect(() => {
    chamarFuncao('estados',null);
    chamarFuncao('cidades',null);
    chamarFuncao('bairros',null);

    const { id } = router.query; // Obtém o ID da URL
    if(typeof(id) !== 'undefined' && id != 'cadastro'){
      chamarFuncao('editar',id);
    }
  }, [router.query]);

  const estrutura = {
    uri: "unidadeAPS", // caminho base
  
    cabecalho: { // cabecalho da pagina
      titulo: "Cadastro",
      migalha: [
        { nome: 'Início', link: '/' },
        { nome: 'Configurações', link: null },
        { nome: 'Unidades', link: '/configuracoes/unidadeAPS' },
      ]
    },
  
    cadastro: {
      campos: [ // colunas da tabela
        [
          { nome: "nome", chave: "nome", tipo: "text", mensagem: "Digite o nome", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "unidade", chave: "tipoUnidade", tipo: "text", mensagem: "Digite o tipo da unidade", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
        ],
        [
          { nome: "cnes", chave: "cnes", tipo: "text", mensagem: "Digite o cnes", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "grau dependência", chave: "grauDependencia", tipo: "text", mensagem: "Digite o grau dependência", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
        ],
        [
          { nome: "turno", chave: "turnoAtendimento", tipo: "text", mensagem: "Digite o turno de atendimento", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "gerencia", chave: "gerenciaAtencaoBasica", tipo: "text", mensagem: "Digite a gerência para atenção básica", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
        ],
        [
          { nome: "data de criação", chave: "dataCriacao", tipo: "date", mensagem: "Aponte a data de criação", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "Selecione o estado", chave: "estado", tipo: "select", mensagem: "Selecione um estado", obrigatorio: true, selectOptions: estados && estados?.map(({ id: chave, nome: valor, ...resto }) => ({ chave, valor, ...resto })), bloqueado: false, oculto: false },
        ],
        [
          { nome: "Selecione a cidade", chave: "cidade", tipo: "select", mensagem: "Selecione uma cidade", obrigatorio: true, selectOptions: cidades && cidades?.map(({ id: chave, nome: valor, ...resto }) => ({ chave, valor, ...resto })), bloqueado: false, oculto: false },
          { nome: "Selecione o bairro", chave: "bairro", tipo: "select", mensagem: "Selecione um bairro", obrigatorio: true, selectOptions: bairros && bairros?.map(({ id: chave, nome: valor, ...resto }) => ({ chave, valor, ...resto })), bloqueado: false, oculto: false },
        ],
        [
          { nome: "logradouro", chave: "logradouro", tipo: "text", mensagem: "Digite o logradouro", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "numero", chave: "numero", tipo: "text", mensagem: "Digite o número", obrigatorio: false, selectOptions: null, bloqueado: false, oculto: false },
        ],
        [
          { nome: "complemento", chave: "complemento", tipo: "text", mensagem: "Digite o complemento", obrigatorio: false, selectOptions: null, bloqueado: false, oculto: false },
          { nome: "referência", chave: "referencia", tipo: "text", mensagem: "Digite o número", obrigatorio: false, selectOptions: null, bloqueado: false, oculto: false },
        ],
        [
          { nome: "cep", chave: "cep", tipo: "text", mensagem: "Digite o cep", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
          {}
        ],
      ],
      acoes: [
        { nome: 'Voltar', chave: 'voltar', tipo: 'botao'},  // botoes auxiliares usa o tipo 'botao'
        { nome: 'Salvar', chave: 'salvar', cor: 'azul', tipo: 'submit'}, // cadastro usa um botao do tipo 'submit'
      ]
    }
  }

  return (
    <main className="flex flex-wrap mx-auto justify-center">
      <div className='w-full md:w-11/12 2xl:w-1/2 p-2 pt-7 md:pt-8 md:pb-8'>
        <Cabecalho dados={estrutura.cabecalho} />
        <Cadastro estrutura={estrutura} dadosPreenchidos={dadosPreenchidos} setDadosPreenchidos={setDadosPreenchidos} chamarFuncao={chamarFuncao}/>
      </div>
    </main>
  );
};

export default Editar;