import Cabecalho from '@/components/Layout/Interno/Cabecalho';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { generica } from '@/utils/api';
import { toast } from 'react-toastify';

const dadosCabecalho = {
  titulo: "Métricas",
  migalha:[
    {nome:'Mapa', link:'/'},
    {nome:'Métricas', link:'/metrica'},
    {nome:'Cadastro', link:null},
  ]
}

const Editar = () => {
    const router = useRouter();
    
    const { id } = router.query;

    //varivais de estado
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [ativo, setAtivo] = useState('');
    const [cargo, setCargo] = useState('');
    const [funcao, setFuncao] = useState('');
    const [areaEstudo, setAreaEstudo] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    
    const [mensagemErro, setMensagemErro] = useState({nome,email});

    useEffect(() => {
        if (id && id != 'undefined') {
            carregarRegistro(id);
        }
    }, [id]);

    const carregarRegistro = async (id: string | string[] | 'undefined') => {
        try {
            const response = await generica({ metodo: 'get', uri: `/usuario/${id}` });
            const data = response.data;
            setNome(data.nome);
            setEmail(data.email);
            setDataCadastro(data.email);
            setAtivo(data.ativo);
            setCargo(data.cargo);
            setFuncao(data.funcao);
            setAreaEstudo(data.areaEstudo);
            setTipoUsuario(data.tipoUsuario);
        } catch (error) {
            console.error('Erro ao carregar dados do registro:', error);
        }
    };

    const salvarRegistro = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const metodo = id != 'undefined' ? 'patch' : 'post';
            const uri = id != 'undefined' ? `/usaurio/${id}` : '/metrica';
            //corpo da requisicao
            const body = {
                metodo,
                uri,
                // data: { nome, detalhes }
            };
            //requisicao
            const response = await generica(body);
            //tratamento dos erros
            if(response.data.errors != undefined){
              toast("Verifique os campos e tente novamente!",{position: "bottom-left"});
              setMensagemErro(response.data.errors);
            }else if(response.data.error != undefined){
              toast(response.data.error.message,{position: "bottom-left"});
            }else{
              toast(id != 'undefined' ? "Atualizado com sucesso!" : "Cadastrado com sucesso!",{position: "bottom-left"});
              router.push('/usuario');
            }
        } catch (error) {
          toast('Erro ao salvar dados: '+error,{position: "bottom-left"});
          console.error('Erro ao salvar dados:', error);
        }
    };

    const handleNomeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNome(event.target.value);
    };
    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };
    const handleDataCadastroChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDataCadastro(event.target.value);
    };
    const handleAtivoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setAtivo(event.target.value);
    };
    const handleCargo = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCargo(event.target.value);
    };
    const handleFuncao = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFuncao(event.target.value);
    };
    const handleAreaEstudo = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setAreaEstudo(event.target.value);
    };
    const handleTipoUsuario = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTipoUsuario(event.target.value);
    };

    return (
        <main className="p-8 flex flex-wrap mx-auto justify-center">
            <div className='w-full md:w-4/5 2xl:w-1/2'>
                <Cabecalho dados={dadosCabecalho}/>
                <form onSubmit={salvarRegistro} className="w-full p-1">
                    <div className="flex">
                        <div className="flex-grow mb-2 mr-1">
                            <label htmlFor="nome" className="block text-gray-700">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome} 
                                onChange={handleNomeChange} required
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                            {mensagemErro.nome && (
                                <span className="error-message text-red-400">{mensagemErro.nome}</span>
                            )}
                        </div>
                        <div className="flex-grow mb-2 ml-1  mb-2">
                            <label htmlFor="email" className="block text-gray-700">Status:</label>
                            <input
                                id="email"
                                value={ativo} 
                                onChange={handleAtivoChange} required
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                            {mensagemErro.ativo && (
                                <span className="error-message text-red-400">{mensagemErro.email}</span>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-end'>


                    <button type="button" 
                            className="shadow-sm mr-2 bg-gray-300 hover:bg-gray-400 text-black font-normal py-2 px-4 rounded-md mt-4"
                            onClick={() => router.back()}
                            >Voltar</button>
                    <button type="submit" 
                            className="shadow-sm bg-green-600 hover:bg-green-700 text-white font-normal py-2 px-4 rounded-md mt-4"
                            >Salvar</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Editar;
