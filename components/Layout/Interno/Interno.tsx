import React, { ReactNode, useState } from 'react';
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setWindowWidth(1000);
  };

  return (
    <div className="flex h-screen">
      {/* menu lateral */}
      <div className={isMenuOpen ? '' : 'max-sm:hidden'}>
          <div className={`flex transition-all duration-200 ${isMenuOpen ? 'w-60' : 'w-12'} shadow-lg bg-white h-screen p-3 pt-16 absolute z-10`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
            <ul className="text-gray-500 mt-2">
              <li className="flex items-center mb-2">
                <Link href="/" className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                  <h6 className={`${isMenuOpen ? 'hover:text-gray-900' : 'hidden'} ml-3 `}>Mapa</h6>
                </Link>
              </li>
              <li className="flex items-center mb-2">
                <Link href="/regiao/listar" className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <h6 className={`${isMenuOpen ? 'hover:text-gray-900' : 'hidden'} ml-3 `}>Regiões</h6>
                </Link>
              </li>
              <li className="flex items-center mb-2">
                <Link href="/estatistica" className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  <h6 className={`${isMenuOpen ? 'hover:text-gray-900' : 'hidden'} ml-3 `}>Estatística</h6>
                </Link>
              </li>
              <li className="flex items-center mb-2">
                <Link href="/configuracoes" className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                  <h6 className={`${isMenuOpen ? 'hover:text-gray-900' : 'hidden'} ml-3 `}>Configurações</h6>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      {/* menu superior */}
      <div className="flex flex-col flex-grow">
        <div className='shadow-lg z-10 bg-white w-full p-3 pl-5 pr-5 flex items-center justify-between'>
          <div className='flex'>
            <div className='sm:hidden mr-3'>
              <button onClick={handleToggleMenu} className='top-3 left-3 focus:outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" className="p-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            <Link href="/" >
              <div className='flex'>
                <h6 style={{ color: '#1A4568' }}>smart</h6>
                <h6 style={{ color: '#5F84A1' }}>Ap</h6>
                <h6 style={{ color: '#90AFC4' }}>SUS</h6>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/sobre" className="mr-4">Sobre</Link>
            <Link href="/entrar">Entrar</Link>
          </div>
        </div>
        {/* conteudo */}
        <div className="flex-grow bg-white md:ml-15 sm:pl-0 md:pl-12" style={{ overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;