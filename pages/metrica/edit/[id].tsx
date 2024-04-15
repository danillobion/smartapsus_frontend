import Cabecalho from '../../../components/Layout/Interno/Cabecalho';
import Tabela from '../../../components/Tabela/Tabela';
import Formulario from '../../../components/Formulario/FormularioMetrica';
import { useRouter } from 'next/router';
import { generica } from '../../../utils/api';

const dadosCabecalho = {
  titulo: "Métricas",
  migalha:[
    {nome:'Mapa', link:'/'},
    {nome:'Métricas', link:'/metrica'},
    {nome:'Adicionar', link:'/metrica/edit'},
  ]
}

const dadosFormulario = {
  campos:[],
  acoes:[
    {tipo:"button", cor:"cinza", nome:"Voltar", link:"/metrica", metodo:"get", title: "Voltar para métrica"},
    {tipo:"submit", cor:"verde", nome:"Salvar", link:"metrica", metodo:"post", title: "Salvar métrica"}
  ],
  retornoAposAcao:[
    {tipo:"sucesso", uri:"/metrica"},
    {tipo:"erro", uri:""},
  ]
}

export default function Edit(id,dados) {
  console.log("opa", id,dados);
  const router = useRouter();
  const parametro = router.query.parametro;

  console.log(parametro);

  return (
    <main className="p-8 flex flex-wrap mx-auto justify-center">
      <div className='w-full md:w-4/5 2xl:w-1/2'>
        <Cabecalho dados={dadosCabecalho}/>
        <Formulario dados={dadosFormulario} />
      </div>
    </main>
  );
}
