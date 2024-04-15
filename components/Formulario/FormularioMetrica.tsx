import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { generica } from '../../utils/api';

const Formulario = ({dados}) => {
    const router = useRouter();
    
    const [nome, setNome] = useState('');
    const [detalhes, setDetalhes] = useState('');
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let body = {
            metodo:'post',
            uri:'/metrica',
            params:{},
            data:{
                nome:nome,
                detalhes:detalhes
            }
        }
        const data = await generica(body);
        if(data.status == 200){
            //sucesso
            console.log("salvo com sucesso!")
            router.push('/metrica');
        }else if(data.status == 400){
            //erro
            console.log("DATA:",data.data.errors);
        }
    };
    const irParaPagina = (caminhoDaPagina) => {
        router.push(caminhoDaPagina);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div>
                <label htmlFor="nome" className="block text-gray-700">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="detalhes" className="block text-gray-700">Detalhes:</label>
                <textarea
                id="detalhes"
                value={detalhes}
                onChange={(event) => setDetalhes(event.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            {}
            {/* {dados != null && dados.acoes.map((item, index) => (
                <h6>{item.tipo}</h6>
                // <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enviar</button>

            )} */}

            {dados.acoes.map((item, index) => (
                <button key={index}
                        type={item.tipo}  
                        className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-2 mb-2 focus:outline-none"
                        onClick={() => irParaPagina(item.link)}>
                        {item.nome}
                </button>
            ))}
        </form>
      );
};

export default Formulario;
