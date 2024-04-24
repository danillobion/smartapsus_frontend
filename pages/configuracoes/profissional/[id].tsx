import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import Cadastro from '@/components/Cadastro/Estrutura';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const estrutura = {
  uri: "profissional", // caminho base

  cabecalho: { // cabecalho da pagina
    titulo: "Cadastro",
    migalha: [
      { nome: 'Início', link: '/' },
      { nome: 'Configurações', link: null },
      { nome: 'Profissionais', link: '/configuracoes/profissional' },
    ]
  },

  cadastro: {
    campos: [ // colunas da tabela
      [
        { nome: "nome", chave: "nome", tipo: "text", mensagem: "Digite o nome", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
        { nome: "cpf ou cnpj", chave: "cpfCnpj", tipo: "text", mensagem: "Digite o cpgf ou cnpj", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
      ],
      [
        { nome: "tipo", chave: "pessoaFisicaJuridica", tipo: "select", mensagem: "Selecione uma opção", obrigatorio: true, selectOptions:[{chave:true,valor:"Pessoa Física",principal:false},{chave:false,valor:"Pessoa Jurídica",principal:true}], bloqueado: false, oculto: false },
        { nome: "código do conselho de classe", chave: "codigoConselhoClasse", tipo: "number", mensagem: "Digite o código do conselho de classe", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
      ],
      [
        { nome: "registro do conselho de classe", chave: "registroConselhoClasse", tipo: "number", mensagem: "Digite o registro do conselho de classe", obrigatorio: true, selectOptions: null, bloqueado: false, oculto: false },
        {}, // pula um campo
      ]
    ],
    acoes: [
      { nome: 'Voltar', chave: 'voltar', tipo: 'botao'},  // botoes auxiliares usa o tipo 'botao'
      { nome: 'Salvar', chave: 'salvar', cor: 'azul', tipo: 'submit'}, // cadastro usa um botao do tipo 'submit'
    ]
  }
}

const Editar = () => {
  const router = useRouter();
  const [dadosPreenchidos, setDadosPreenchidos] = useState(null);

  const chamarFuncao = async (nomeFuncao = "", valor = null) => {
    switch (nomeFuncao) {
      case 'salvar':
        await salvarRegistro(valor); 
        break;
      case 'voltar':
        voltarRegistro(valor);
        break;
      case 'editar':
        editarRegistro(valor);
        break;
      default:
        break;
    }
  }

  // Função que redireciona para a tela profissional
  const voltarRegistro = (item) => {
    router.push('/configuracoes/'+estrutura.uri);
  };

  // Função que salvar um registro
  const salvarRegistro = async (item) => {
    const confirmacao = await Swal.fire({
      title: "Você deseja salvar o profissional?",
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
          uri: '/' + estrutura.uri,
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
            title: "Profissional salvo com sucesso",
            icon: "success"
          });
        }
      } catch (error) {
        console.error('Erro ao salvar registro:', error);
        toast("Erro ao salvar registro. Tente novamente!", { position: "bottom-left" });
      }
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
    const { id } = router.query; // Obtém o ID da URL
    if(typeof(id) !== 'undefined' && id != 'cadastro'){
      chamarFuncao('editar',id);
    }
  }, [router.query]);

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
