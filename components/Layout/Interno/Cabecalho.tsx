import React from 'react';
import Link from 'next/link';

const Cabecalho = ({ dados }) => {
  return (
    <div className="pb-3">
      <h1 className='text-4xl' style={{ color: '#5F84A1' }}>{dados.titulo}</h1>
      <div className='flex' style={{ color: '#909090' }}>
        {dados.migalha.map((item, index) => (
          <React.Fragment key={index}>
            {item.link != null && (
              <Link href={item.link} className="flex items-center mb-4">
                <h6 >{item.nome}</h6>
              </Link>
            )}
            {item.link == null && (
              <h6 className="flex items-center mb-4">
                {item.nome}
              </h6>
            )}
            {index < dados.migalha.length - 1 && <span className='ml-1 mr-1'>/</span>}
          </React.Fragment>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Cabecalho;
