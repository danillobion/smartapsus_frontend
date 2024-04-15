// import React from 'react';
// import Link from 'next/link'
// import { useRouter } from 'next/router';

// const Tabela = ({ dados }) => {

//   const irParaPagina = (caminhoDaPagina) => {
//     router.push(caminhoDaPagina);
//   };

//   console.log("opaaa", dados);
//   return (
//     <div className="overflow-x-auto">
//       {/* cabecalho */}
//       <div className='flex justify-between'>
//         {/* pesquisar */}
//         <form className='pb-3'>   
//           <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                   <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                   </svg>
//               </div>
//               <input type="search" id="search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisar" required />
//           </div>
//         </form>
//         {/* botao externo*/}
//         <div className='flex justify-end'>
//           {dados.externo.map((item, index) => (
//             <button onClick={() => irParaPagina(item.link)}>
//               {item.nome}
//             </button>
//           ))}
//         </div>
//         {/* x botao externo x */}
//       </div>
//       {/*X cabecalho X*/}
//       {/* tabela */}
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//           <tr>
//           {dados.cabecalho.map((item, index) => (
//             <th scope="col" className="px-6 py-3" key={index}>
//               {item.nome}
//             </th>
//           ))}
//           </tr>
//         </thead>
//         <tbody>
//           {dados.registros.map((item, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//               <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nome}</td>
//               <td className="px-6 py-4 text-gray-700">{item.descricao}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* paginacao */}
//       <div className='text-center'>
//         <h6>paginação</h6>
//       </div>
//     </div>
//   );
// };

// export default Tabela;
