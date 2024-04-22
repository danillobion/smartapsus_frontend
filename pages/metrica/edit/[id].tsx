import Cabecalho from '../../../components/Layout/Interno/Cabecalho';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { generica } from '../../../utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
    const [detalhes, setDetalhes] = useState('');
    
    const [mensagemErro, setMensagemErro] = useState({nome,detalhes});

    /*  
        useEffect :
        funcao utilizada quando voce quiser fazer uma chamada assim que a tela for carregada
    */
    useEffect(() => {
        if (id && id != 'undefined') {
            carregarRegistro(id);
        }
    }, [id]);

    /*  
        carregarRegistro :
        funcao responsavel por preencher os campos se voce tiver tentando editar um registro
    */
    const carregarRegistro = async (id: string | string[] | 'undefined') => {
        try {
            const response = await generica({ metodo: 'get', uri: `/metrica/${id}` });
            const data = response.data;
            setNome(data.nome);
            setDetalhes(data.detalhes);
        } catch (error) {
            console.error('Erro ao carregar dados do registro:', error);
        }
    };

    /*  
        salvarRegistro :
        funcao responsavel por salvar/atualizar o registro
    */
    const salvarRegistro = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        // Exibir o SweetAlert2 para confirmação
        const confirmacao = await Swal.fire({
            title: "Você deseja salvar essa métrica?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, quero salvar!",
            cancelButtonText: "Cancelar"
        });
    
        // Verificar se o usuário confirmou
        if (confirmacao.isConfirmed) {
            try {
                const metodo = id !== 'undefined' ? 'patch' : 'post';
                const uri = id !== 'undefined' ? `/metrica/${id}` : '/metrica';
                // Corpo da requisição
                const body = {
                    metodo,
                    uri,
                    data: { nome, detalhes }
                };
                // Requisição
                const response = await generica(body);
                // Tratamento dos erros
                if (response.data.errors !== undefined) {
                    toast("Verifique os campos e tente novamente!", { position: "bottom-left" });
                    setMensagemErro(response.data.errors);
                } else if (response.data.error !== undefined) {

                  toast(response.data.error.message,{position: "bottom-left"});
                } else {
                    Swal.fire({
                        title: "Métrica salva com sucesso",
                        icon: "success"
                    });
                    router.push('/metrica');
                }
            } catch (error) {
                toast('Erro ao salvar dados: ' + error, { position: "bottom-left" });
                console.error('Erro ao salvar dados:', error);
            }
        }
    };
        

    /*  
      handleNomeChange :
      funcao responsavel atualizar o estado do campo nome toda vez que digitar um valor no input
    */
    const handleNomeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNome(event.target.value);
    };
    /*  
      handleDetalhesChange :
      funcao responsavel atualizar o estado do campo descricao toda vez que digitar um valor no input
    */
    const handleDetalhesChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDetalhes(event.target.value);
    };

    /*  
      TELA :
      Aqui fica o conteudo da tela com as respectivas informacoes
      - Cabecalho
      -form (com os campos e botoes)
    */
    return (
        <main className="p-8 flex flex-wrap mx-auto justify-center">
            <div className='w-full md:w-4/5 2xl:w-1/2'>
                <Cabecalho dados={dadosCabecalho}/>
                <form onSubmit={salvarRegistro} className="w-full p-1">
                    <div className='mb-2'>
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
                    <div>
                        <label htmlFor="detalhes" className="block text-gray-700">Detalhes:</label>
                        <textarea
                            id="detalhes"
                            value={detalhes} 
                            onChange={handleDetalhesChange} required
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    {mensagemErro.detalhes && (
                        <span className="error-message text-red-400">{mensagemErro.detalhes}</span>
                    )}

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
